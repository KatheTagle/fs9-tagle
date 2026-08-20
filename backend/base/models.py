from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    product_name = models.CharField(max_length=100)
    description = models.TextField()
    product_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    brand = models.CharField(max_length=255)
    countInStock = models.IntegerField()
    image = models.ImageField(upload_to="product_images/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name


class cartUser(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.product.product_name} - "
            f"{self.quantity}"
        )


class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.product.product_name}"
        )


class Payment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    is_paid = models.BooleanField(
        default=False
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True
    )

    xendit_invoice_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    xendit_external_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    xendit_status = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.total_price}"
        )


class OrderItem(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    payment = models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        related_name="items"
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.product.product_name} - "
            f"{self.quantity}"
        )


class ShippingAddress(models.Model):
    payment = models.OneToOneField(
        Payment,
        on_delete=models.CASCADE,
        related_name="shipping_address"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    fullname = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return (
            f"{self.user.username} - "
            f"{self.address}, {self.city}, "
            f"{self.postal_code}, {self.country}"
        )