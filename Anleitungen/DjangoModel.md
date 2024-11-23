
# Model in Django

## 0. Erstellen eines Models in Django

### Hinzufuegen des Models

Objekteigenschaften mit angabe der Datentypen in /api/models.py hinzufuegen

```python
from django.db import models

# Create your models here.
class IhrModell(models.Model):
    id = models.IntegerField(primary_key=True)
    feld1 = models.CharField(max_length=20)
    feld2 = models.BooleanField(default=false)

    def __str__(self) :# Standard Methode um im Admin Interface den Namen Anzeigen zu lassen
        return str(self.id) + ' ' + self.name
```

### Anmelden des Models am Admininterface

Wird zum Verwalten der Models ueber das Admin-Interface benoetigt.
Dafuer zur /api/admin.py hinzufuegen

```python
from django.contrib import admin
from .models import IhrModell

admin.site.register(IhrModell)
```

## 1. Verwendung von `JsonResponse` fuer die Zurueckgabe

Django bietet die Klasse `JsonResponse`, die speziell für das Zurückgeben von JSON-Daten entwickelt wurde.

### Einzelnes Objekt

Wenn Sie ein einzelnes Modellobjekt als JSON zurückgeben möchten, können Sie es in ein Wörterbuch konvertieren und dann mit `JsonResponse` zurückgeben:

```python
from django.http import JsonResponse
from .models import IhrModell

def einzelnes_objekt_als_json(request, id):
    obj = IhrModell.objects.get(pk=id)
    data = {
        'feld1': obj.feld1,
        'feld2': obj.feld2,
        # weitere Felder hier
    }
    return JsonResponse(data)
```

### Mehrere Objekte

Um eine Liste von Objekten zurückzugeben, können Sie eine Liste von Wörterbüchern erstellen und `JsonResponse` mit `safe=False` verwenden:

```python
from django.http import JsonResponse
from .models import IhrModell

def mehrere_objekte_als_json(request):
    objekte = IhrModell.objects.all()
    data = list(objekte.values())
    return JsonResponse(data, safe=False)
```

Hierbei konvertiert `objekte.values()` die QuerySet-Ergebnisse in eine Liste von Wörterbüchern, die direkt als JSON zurückgegeben werden können.





# Weiteres nicht gestestet








## 2. Verwendung von `serializers.serialize`

Django bietet das Modul `serializers`, mit dem Sie QuerySets in JSON konvertieren können.

### Mehrere Objekte

Um mehrere Objekte zu serialisieren:

```python
from django.core import serializers
from django.http import HttpResponse
from .models import IhrModell

def mehrere_objekte_als_json(request):
    objekte = IhrModell.objects.all()
    data = serializers.serialize('json', objekte)
    return HttpResponse(data, content_type='application/json')
```

Beachten Sie, dass `serializers.serialize` eine JSON-Zeichenkette zurückgibt, die mit `HttpResponse` und dem entsprechenden `content_type` zurückgegeben wird.

## 3. Verwendung von Django REST Framework

Für komplexere APIs empfiehlt es sich, das Django REST Framework (DRF) zu verwenden.

### Installation

Installieren Sie DRF mit:

```bash
pip install djangorestframework
```

### Serializer erstellen

Erstellen Sie einen Serializer für Ihr Modell:

```python
from rest_framework import serializers
from .models import IhrModell

class IhrModellSerializer(serializers.ModelSerializer):
    class Meta:
        model = IhrModell
        fields = '__all__'
```

### View erstellen

Erstellen Sie eine View, die den Serializer verwendet:

```python
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import IhrModell
from .serializers import IhrModellSerializer

@api_view(['GET'])
def mehrere_objekte_als_json(request):
    objekte = IhrModell.objects.all()
    serializer = IhrModellSerializer(objekte, many=True)
    return Response(serializer.data)
```

DRF bietet viele Funktionen für die Erstellung von APIs, einschließlich Authentifizierung, Berechtigungen und mehr.

## Zusammenfassung

- **`JsonResponse`** ist ideal für einfache JSON-Antworten.
- **`serializers.serialize`** eignet sich für die Serialisierung von QuerySets.
- **Django REST Framework** ist die beste Wahl für komplexe APIs.

Wählen Sie die Methode, die am besten zu den Anforderungen Ihres Projekts passt.
