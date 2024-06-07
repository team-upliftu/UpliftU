from django.http import JsonResponse
import json
from app.models import Participation

def delete_my_participation(request, user_id):
    if request.method == 'GET':
        participations = Participation.objects.filter(participant=user_id)
        deleted_objects = []
        if participations.exists():
            for participation in participations:
                deleted_objects.append({"participation_id" : participation.id, "gathering_id" : participation.gathering.id, "participant_id" : participation.participant.id})
            participations.delete()
            return JsonResponse({'status': 'success', 'deleted_objects': deleted_objects })
        else:
            return JsonResponse({'status': 'no operation', 'message': 'No participations found to delete'})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Invalid request method (GET only)'})
