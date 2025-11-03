import requests
import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def get_recipes(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ingredients = data.get('ingredients', [])
            if not ingredients:
                return JsonResponse({'error': 'No ingredients provided'})

        #    api
            response = requests.post(api_url, json={'ingredients': ingredients})

            if response.status_code == 200:
                recipes = response.json()
                return JsonResponse(recipes, safe=False)
            else:
                return JsonResponse({'error': 'Failed to fetch recipes from external API'}, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)



