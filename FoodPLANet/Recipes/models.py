from django.db import models


# Create your models here.
class Ingredient(models.Model):
    name = models.CharField()
   
    def __str__(self):
        return self.name

class Meal(models.Model):
    title = models.CharField(max_length=100, help_text="What meal do you want to prepare?")
    ingredients = models.ManyToManyField(Ingredient)
    calories = models.IntegerField()
    time_required = models.IntegerField(help_text="Time in minutes")

    def __str__(self):
        return self.title   