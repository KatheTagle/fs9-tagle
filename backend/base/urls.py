from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path("register/", views.register_user, name="register"),

    # Products
    path("products/", views.product_list, name="product-list"),
    path("products/<int:pk>/", views.get_product_detail, name="product-detail"),

    # Profile
    path("profile/", views.profile, name="profile"),

    # Cart
    path("cart/", views.get_cart, name="get-cart"),
    path("cart/add/", views.add_to_cart, name="add-to-cart"),
    path("cart/<int:pk>/", views.update_cart, name="update-cart"),
    path("cart/<int:pk>/delete/", views.delete_cart, name="delete-cart"),

    # Checkout
    path("checkout/", views.checkout, name="checkout"),

    # Purchase history
    path(
        "purchase-history/",
        views.purchase_history,
        name="purchase-history"
    ),
]