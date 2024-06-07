from django.http import JsonResponse
from app.models import Gathering, Participation, Message, Ownership
from users.models import CustomUser
import uuid
import itertools

def ownership_from_participants(participants):
    user_dict = {user.id: user for user in CustomUser.objects.filter(id__in=participants)}
    ownerships = itertools.product(participants, repeat=2)
    ownership_objects = [Ownership(owner=user_dict[ownership[0]], presenter=user_dict[ownership[1]]) for ownership in ownerships if ownership[0] != ownership[1]]

    return ownership_objects

def close_gathering(request, gathering_id):
    try:
        # gathering_idはUUIDオブジェクトとして渡されます
        gathering_uuid = uuid.UUID(gathering_id)
    except ValueError:
        return JsonResponse({'error': 'Invalid UUID format'}, status=400)
    if request.method == 'GET':
        try:
            gathering = Gathering.objects.get(id=gathering_uuid)
        except Gathering.DoesNotExist:
            return JsonResponse({'status': 'no operation', 'message': 'Gathering not found'})

        if gathering is None:
            return JsonResponse({'status': 'no operation', 'message': 'Gathering not found'})
        
        participations = Participation.objects.filter(gathering=gathering)
        messages = Message.objects.filter(gathering=gathering)

        participants = [participation.participant.id for participation in participations]
        ownerships_to_add = ownership_from_participants(participants)
        Ownership.objects.bulk_create(ownerships_to_add)

        deleted_participations = []
        deleted_messages = []
        # Delete all participations
        for participation in participations:
            deleted_participations.append({"participation_id" : participation.id, "gathering_id" : participation.gathering.id, "participant_id" : participation.participant.id})
        participations.delete()
        # Delete all messages
        for message in messages:
            deleted_messages.append({"message_id" : message.id, "gathering_id" : message.gathering.id, "sender_id" : message.sender.id})
        messages.delete()
        # Delete the gathering
        deleted_gathering = {"gathering_id" : gathering.id, "host_id" : gathering.host.id}
        gathering.delete()
        return JsonResponse({'status': 'success', 'deleted_gathering': deleted_gathering, 'deleted_participations': deleted_participations, 'deleted_messages': deleted_messages})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Invalid request method (GET only)'})