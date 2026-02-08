import random
import time
from datetime import datetime, timedelta # Добавили для дат
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Subscriber

# SubscribeView оставляем без изменений...
class SubscribeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        obj, created = Subscriber.objects.get_or_create(email=email)
        if created:
            return Response({"message": "Subscribed successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already subscribed"}, status=status.HTTP_200_OK)

class DashboardStatsView(APIView):
    def get(self, request):
        # 1. Seed (зерно рандома) меняется раз в 12 часов
        current_seed = int(time.time() / 43200) 
        random.seed(current_seed)

        # --- 1. Customer Rate (Pie Chart) ---
        # 4 категории: 5 звезд (Green), 4 (Blue), 3 (Yellow), 2 (Red)
        # Генерируем "тысячи"
        pie_data = [
            {"name": "5 Stars", "value": random.randint(4000, 5500)}, # Зеленый
            {"name": "4 Stars", "value": random.randint(2500, 3900)}, # Синий
            {"name": "3 Stars", "value": random.randint(1000, 2000)}, # Желтый
            {"name": "2 Stars", "value": random.randint(200, 800)},   # Красный
        ]

        # --- 2. Usage Statistics (Line Chart) ---
        # Дни недели оставим, но значения сделаем большими (с нулями)
        days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        usage_data = [
            {"name": day, "value": random.randint(20, 90) * 100} # 2000 - 9000
            for day in days
        ]

        # --- 3. Weekly Plan (Area Chart) ---
        # Реальные даты (последние 10 дней)
        today = datetime.now()
        weekly_data = []
        prev_val = 3000 # Стартовая сумма ($)
        
        for i in range(10):
            # Дата: берем сегодня и отступаем назад, или идем вперед. 
            # Давай сделаем прогноз на будущее (как в макете "Aug 24"), начиная с сегодня.
            date_label = (today + timedelta(days=i)).strftime("%b %d") # Например "Feb 08"
            
            # Логика роста средств
            change = random.randint(-500, 1500) 
            val = prev_val + change
            val = max(1000, val) # Не меньше 1000$
            
            weekly_data.append({"name": date_label, "value": val})
            prev_val = val

        data = {
            "customer_rate": pie_data,
            "usage_statistics": usage_data,
            "weekly_plan": weekly_data,
        }
        
        return Response(data, status=status.HTTP_200_OK)