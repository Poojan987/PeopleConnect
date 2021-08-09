
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import posts_particularUser;

urlpatterns = [
   path('profile_post',posts_particularUser.as_view()),
   
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)