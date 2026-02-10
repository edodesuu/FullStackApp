from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomAccountAdapter(DefaultAccountAdapter):
    def clean_email(self, email):
        if email:
            email = email.lower()
            user = User.objects.filter(email=email).first()
            if user:
                email_address = EmailAddress.objects.filter(user=user, email=email).first()
                if not email_address or not email_address.verified:
                    print(f"Adapter: Cleaning up unverified user {email}")
                    user.delete()
        return super().clean_email(email)