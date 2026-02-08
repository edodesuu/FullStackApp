
import random
import time
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Subscriber

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
        # 1. Генерация seed на основе времени (меняется каждые 12 часов)
        # 43200 секунд = 12 часов
        current_seed = int(time.time() / 43200) 
        random.seed(current_seed)

        # 2. Генерация данных для "Monthly plan" (Donut chart)
        # Пусть total всегда 100%, а used плавает
        used_percent = random.randint(40, 85)
        
        # 3. Генерация данных для "Spending frequency" (Line chart)
        # Генерируем 7 точек (дни недели)
        days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        spending_data = [
            {"name": day, "value": random.randint(20, 90)} 
            for day in days
        ]

        # 4. Генерация данных для "Weekly plan" (Area chart)
        # Более плавная кривая
        weekly_data = []
        prev_val = 30
        for i in range(10):
            # Небольшое случайное отклонение, чтобы график был плавным
            val = prev_val + random.randint(-15, 25)
            val = max(10, min(100, val)) # держим в рамках 10-100
            weekly_data.append({"name": f"Aug {21+i}", "value": val})
            prev_val = val

        data = {
            "monthly_plan": {
                "used": used_percent,
                "limit": 100,
                "data": [
                    {"name": "Used", "value": used_percent},
                    {"name": "Left", "value": 100 - used_percent}
                ]
            },
            "spending_frequency": spending_data,
            "weekly_plan": weekly_data,
            "balance": {
                "total": f"{random.randint(110, 150)},00€",
                "income": f"+{random.randint(50, 80)},00€",
                "expense": f"-{random.randint(20, 40)},00€"
            }
        }
        
        return Response(data, status=status.HTTP_200_OK)