from django.urls import path
from . import views

urlpatterns = [
    # =========================
    # AUTH
    # =========================
    path("register/", views.register_user, name="register"),

    # =========================
    # PROFILE
    # =========================
    path("profile/", views.profile, name="profile"),

    # =========================
    # PRODUCTS
    # =========================
    path("products/", views.product_list, name="product-list"),
    path(
        "products/<int:pk>/",
        views.get_product_detail,
        name="product-detail",
    ),

    # =========================
    # CART
    # =========================
    path("cart/", views.get_cart, name="get-cart"),
    path("cart/add/", views.add_to_cart, name="add-to-cart"),
    path(
        "cart/<int:pk>/",
        views.update_cart,
        name="update-cart",
    ),
    path(
        "cart/<int:pk>/delete/",
        views.delete_cart,
        name="delete-cart",
    ),

    # =========================
    # CHECKOUT
    # =========================
    path(
        "checkout/",
        views.checkout,
        name="checkout",
    ),

    # =========================
    # PURCHASE HISTORY
    # =========================
    path(
        "purchase-history/",
        views.purchase_history,
        name="purchase-history",
    ),
]
