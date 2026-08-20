
from decimal import Decimal
import uuid
import requests

from django.conf import settings
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (
    Product,
    Cart,
    Payment,
    OrderItem,
    ShippingAddress,
)

from .serializers import (
    ProductSerializer,
    CartSerializer,
    RegisterSerializer,
    CheckoutSerializer,
    PaymentSerializer,
)


# ==========================
# REGISTER
# ==========================

@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "User registered successfully."
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==========================
# PROFILE
# ==========================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):

    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })


# ==========================
# PRODUCTS
# ==========================

@api_view(["GET"])
def product_list(request):

    products = Product.objects.all()

    serializer = ProductSerializer(
        products,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(["GET"])
def get_product_detail(request, pk):

    product = get_object_or_404(
        Product,
        pk=pk
    )

    serializer = ProductSerializer(
        product
    )

    return Response(
        serializer.data
    )


# ==========================
# CART
# ==========================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):

    cart_items = Cart.objects.filter(
        user=request.user
    ).select_related("product")

    serializer = CartSerializer(
        cart_items,
        many=True
    )

    return Response(
        serializer.data
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get(
        "product"
    )

    try:
        quantity = int(
            request.data.get(
                "quantity",
                1
            )
        )
    except (TypeError, ValueError):

        return Response(
            {
                "error": "Quantity must be a number."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(
        Product,
        id=product_id
    )

    if quantity < 1:

        return Response(
            {
                "error": "Quantity must be at least 1."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity > product.countInStock:

        return Response(
            {
                "error": "Not enough stock available."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    cart_item = Cart.objects.filter(
        user=request.user,
        product=product
    ).first()

    if cart_item:

        new_quantity = (
            cart_item.quantity +
            quantity
        )

        if new_quantity > product.countInStock:

            return Response(
                {
                    "error": "Not enough stock available."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item.quantity = new_quantity
        cart_item.save()

    else:

        cart_item = Cart.objects.create(
            user=request.user,
            product=product,
            quantity=quantity
        )

    serializer = CartSerializer(
        cart_item
    )

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_cart(request, pk):

    cart = get_object_or_404(
        Cart,
        pk=pk,
        user=request.user
    )

    quantity = request.data.get(
        "quantity"
    )

    try:
        quantity = int(quantity)

    except (TypeError, ValueError):

        return Response(
            {
                "error": "Quantity must be a number."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity < 1:

        return Response(
            {
                "error": "Quantity must be at least 1."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity > cart.product.countInStock:

        return Response(
            {
                "error": "Not enough stock available."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    cart.quantity = quantity
    cart.save()

    return Response({
        "id": cart.id,
        "quantity": cart.quantity,
    })


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_cart(request, pk):

    cart = get_object_or_404(
        Cart,
        pk=pk,
        user=request.user
    )

    cart.delete()

    return Response(
        {
            "message": "Item removed successfully."
        },
        status=status.HTTP_204_NO_CONTENT
    )


# ==========================
# CHECKOUT
# ==========================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def checkout(request):

    user = request.user

    # ==========================
    # VALIDATE SHIPPING FORM
    # ==========================

    serializer = CheckoutSerializer(
        data=request.data
    )

    if not serializer.is_valid():

        return Response(
            {
                "error": "Please complete all shipping information.",
                "details": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    shipping_data = serializer.validated_data

    # ==========================
    # GET CART
    # ==========================

    cart_items = Cart.objects.filter(
        user=user
    ).select_related("product")

    if not cart_items.exists():

        return Response(
            {
                "error": "Your cart is empty."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # ==========================
    # CALCULATE TOTAL
    # ==========================

    total = Decimal("0.00")

    for item in cart_items:

        line_total = (
            item.product.product_price *
            item.quantity
        )

        total += line_total

    # ==========================
    # CREATE PAYMENT
    # ==========================

    payment = Payment.objects.create(
        user=user,
        total_price=total,
        is_paid=False,
        xendit_status="PENDING"
    )

    # ==========================
    # CREATE ORDER ITEMS
    # ==========================

    for item in cart_items:

        line_total = (
            item.product.product_price *
            item.quantity
        )

        OrderItem.objects.create(
            user=user,
            product=item.product,
            payment=payment,
            quantity=item.quantity,
            total_price=line_total
        )

    # ==========================
    # CREATE SHIPPING ADDRESS
    # ==========================

    ShippingAddress.objects.create(
        payment=payment,
        user=user,
        fullname=shipping_data["fullname"],
        address=shipping_data["address"],
        city=shipping_data["city"],
        postal_code=shipping_data["postal_code"],
        country=shipping_data["country"],
    )

    # ==========================
    # XENDIT EXTERNAL ID
    # ==========================

    external_id = (
        f"payment-{payment.id}-"
        f"{uuid.uuid4().hex[:8]}"
    )

    # ==========================
    # XENDIT ITEMS
    # ==========================

    xendit_items = []

    for item in cart_items:

        xendit_items.append({
            "name": item.product.product_name,
            "price": float(
                item.product.product_price
            ),
            "quantity": item.quantity,
        })

    # ==========================
    # XENDIT PAYLOAD
    # ==========================

    payload = {
        "external_id": external_id,

        "amount": float(total),

        "description": (
            f"Order #{payment.id}"
        ),

        "invoice_duration": 86400,

        # Redirect after successful payment
        "success_redirect_url": (
            "http://localhost:5173/checkout-success"
        ),

        # Customer information
        "customer": {
            "given_names": (
                shipping_data["fullname"]
            ),

            "email": user.email,

            "address": {
                "street_line1": (
                    shipping_data["address"]
                ),

                "city": (
                    shipping_data["city"]
                ),

                "postal_code": (
                    shipping_data["postal_code"]
                ),

                "country": (
                    shipping_data["country"]
                ),
            },
        },

        "currency": "PHP",

        "items": xendit_items,
    }

    # ==========================
    # SEND TO XENDIT
    # ==========================

    try:

        response = requests.post(
            "https://api.xendit.co/v2/invoices",

            auth=(
                settings.XENDIT_SECRET_KEY,
                ""
            ),

            json=payload,

            timeout=30
        )

        try:

            response_data = response.json()

        except ValueError:

            response_data = {
                "message": response.text
            }

    except requests.RequestException as error:

        payment.delete()

        return Response(
            {
                "error": "Unable to connect to Xendit.",
                "details": str(error),
            },
            status=status.HTTP_502_BAD_GATEWAY
        )

    # ==========================
    # XENDIT ERROR
    # ==========================

    if response.status_code not in [200, 201]:

        print(
            "XENDIT ERROR:",
            response_data
        )

        payment.delete()

        return Response(
            {
                "error": "Unable to create Xendit invoice.",
                "details": response_data,
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # ==========================
    # SAVE XENDIT INFORMATION
    # ==========================

    payment.xendit_invoice_id = (
        response_data.get("id")
    )

    payment.xendit_external_id = (
        response_data.get("external_id")
    )

    payment.xendit_status = (
        response_data.get(
            "status",
            "PENDING"
        )
    )

    payment.save()

    # ==========================
    # CLEAR CART
    # ==========================

    cart_items.delete()

    # ==========================
    # RETURN CHECKOUT DATA
    # ==========================

    return Response(
        {
            "payment_id": payment.id,

            "invoice_id": (
                response_data.get("id")
            ),

            "invoice_url": (
                response_data.get("invoice_url")
            ),

            "status": (
                response_data.get("status")
            ),

            "total": str(total),
        },

        status=status.HTTP_201_CREATED
    )


# ==========================
# PURCHASE HISTORY
# ==========================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def purchase_history(request):

    payments = Payment.objects.filter(
        user=request.user
    ).prefetch_related(
        "items__product"
    ).order_by(
        "-created_at"
    )

    serializer = PaymentSerializer(
        payments,
        many=True
    )

    return Response(
        serializer.data
    )
