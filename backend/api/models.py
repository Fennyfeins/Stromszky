from django.db import models

# Create your models here.
class Customer(models.Model):
        id = models.IntegerField(primary_key=True)
        firstname = models.CharField(max_length=20)
        surname = models.CharField(max_length=20)
        dateOfBirth = models.DateField()
        phone = models.CharField(max_length=20)
        street = models.CharField(max_length=20)
        number = models.CharField(max_length=4)
        postalCode = models.CharField(max_length=5)
        city = models.CharField(max_length=20)
        iban = models.CharField(max_length=20)

        def __str__(self) :         # Standard Methode um im Admin Interface den Namen Anzeigen zu lassen
            return str(self.id) + ' ' + self.surname