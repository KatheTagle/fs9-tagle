from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

from .models import (
    Product,
    Cart,
    Payment,
    OrderItem,
    ShippingAddress,
)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.product_name",
        read_only=True
    )

    product_price = serializers.DecimalField(
        source="product.product_price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    product_image = serializers.ImageField(
        source="product.image",
        read_only=True
    )

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "product",
            "product_name",
            "product_price",
            "product_image",
            "quantity",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all()
            )
        ]
    )

    password = serializers.CharField(
        write_only=True
    )

    name = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "name",
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["name"],
        )

        return user


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = [
            "id",
            "payment",
            "user",
            "fullname",
            "address",
            "city",
            "postal_code",
            "country",
        ]
        read_only_fields = [
            "id",
            "payment",
            "user",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "quantity",
            "total_price",
        ]


class PaymentSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    shipping_address = ShippingAddressSerializer(
        read_only=True
    )

    class Meta:
        model = Payment
        fields = [
            "id",
            "total_price",
            "is_paid",
            "paid_at",
            "xendit_invoice_id",
            "xendit_external_id",
            "xendit_status",
            "created_at",
            "items",
            "shipping_address",
        ]


class CheckoutSerializer(serializers.Serializer):
    fullname = serializers.CharField(
        max_length=255
    )

    address = serializers.CharField(
        max_length=255
    )

    city = serializers.CharField(
        max_length=100
    )

    postal_code = serializers.CharField(
        max_length=20
    )

    country = serializers.CharField(
        max_length=100
    )