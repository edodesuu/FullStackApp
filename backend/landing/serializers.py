from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth import get_user_model
from allauth.account.models import EmailAddress

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    # 1. Объявляем поля явно, чтобы DRF их видел
    password = serializers.CharField(write_only=True)
    # Эти два поля нужны, чтобы успокоить старые версии библиотек
    password1 = serializers.CharField(required=False, write_only=True)
    password2 = serializers.CharField(required=False, write_only=True)

    def validate_email(self, email):
        # Логика удаления "зомби-юзеров"
        user = User.objects.filter(email=email).first()
        if user:
            email_address = EmailAddress.objects.filter(user=user, email=email).first()
            if not email_address or not email_address.verified:
                print(f"Serializer: Deleting unverified user: {email}")
                user.delete()
                return email
            raise serializers.ValidationError("A user is already registered with this e-mail address.")
        return email

    def validate(self, data):
        # 2. ХАК: Копируем пароль во все возможные поля подтверждения
        if 'password' in data:
            pwd = data['password']
            data['password1'] = pwd
            data['password2'] = pwd
        return super().validate(data)

    def get_cleaned_data(self):
        # Собираем чистые данные для адаптера
        return {
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password', ''),
        }

    def save(self, request):
        # 3. ГЛАВНЫЙ ФИКС: Явное сохранение
        # Сначала даем родителю создать юзера
        user = super().save(request)
        
        # А теперь принудительно ставим ему пароль (если вдруг родитель не справился)
        raw_password = self.validated_data.get('password')
        if raw_password:
            user.set_password(raw_password)
            user.save()
            
        return user
    

class CustomUserSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('email',)

    def validate_username(self, username):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=username).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return username