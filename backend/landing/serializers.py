from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    # 1. Основной пароль (обязателен)
    password = serializers.CharField(write_only=True)
    
    # 2. ЗАГЛУШКИ: Объявляем оба варианта "второго пароля" как НЕ обязательные.
    # Это переписывает требования родительского класса, который вызывает ошибку "This field is required".
    password1 = serializers.CharField(required=False, write_only=True)
    password2 = serializers.CharField(required=False, write_only=True) 

    def validate(self, data):
        # 3. Если пришел пароль, дублируем его во все возможные поля подтверждения,
        # чтобы любая версия библиотеки (старая или новая) нашла то, что ищет.
        if 'password' in data:
            pwd = data['password']
            data['password1'] = pwd
            data['password2'] = pwd
        
        return super().validate(data)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password', ''),
        }