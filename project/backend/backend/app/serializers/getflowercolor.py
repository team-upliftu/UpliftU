from rest_framework import serializers
from users.models import CustomUser
from ..models import Ownership

# 花の贈呈者の情報を取得するためのシリアライザ
class UserColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "user_name", "color"]

# Ownership情報から贈呈者を割り出すためのシリアライザ
class PresentersSerializer(serializers.ModelSerializer):
    presenter = UserColorSerializer()
    
    class Meta:
        model = Ownership
        fields = ["id", "presenter", "count"]

# 花の色を取得するためのシリアライザ
class GetFlowerColorSerializer(serializers.ModelSerializer):
    presenters = PresentersSerializer(many=True)
    
    class Meta:
        model = CustomUser
        fields = ["id", "presenters"]

# 以下、v2

# Ownership情報から贈呈者を割り出すためのシリアライザ
class PresentersSerializer_v2(serializers.ModelSerializer):
    color = serializers.SlugRelatedField(
        read_only=True,
        slug_field='color',
        source='presenter'
    )
    
    class Meta:
        model = Ownership
        fields = [ "color" , "count"]

# 花の色を取得するためのシリアライザ
class GetFlowerColorSerializer_v2(serializers.ModelSerializer):
    colors = PresentersSerializer_v2(many=True, source="presenters")
    
    class Meta:
        model = CustomUser
        fields = ["id", "colors"]