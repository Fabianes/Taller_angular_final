"""todolisto_backend URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from backend.models import Tarea, Estado
from rest_framework import routers, serializers, viewsets

class EstadoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Estado
        fields = ('id', 'nombre')

class EstadoViewSet(viewsets.ModelViewSet):
    queryset = Estado.objects.all()
    serializer_class = EstadoSerializer

class TareaSerializer(serializers.HyperlinkedModelSerializer):
    nombre_estado = serializers.ReadOnlyField()
    estado = serializers.PrimaryKeyRelatedField(queryset=Estado.objects.all(), required=True)
                    
    class Meta:
        model = Tarea
        fields = ('id', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_termino', 'estado', 'nombre_estado')        

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

router = routers.DefaultRouter()
router.register(r'tareas', TareaViewSet)
router.register(r'estados', EstadoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),    
]
