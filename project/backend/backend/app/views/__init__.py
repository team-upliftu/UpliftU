from .receiver import ReceiverViewSet
# from .hobbies import HobbiesViewSet
from .giftHistory import GiftHistoryViewSet
from .message import MessageViewSet
from .project import ProjectViewSet
from .user import CustomUserViewSet

__all__ = [
    "ReceiverViewSet",
    # "HobbiesViewSet",
    "GiftHistoryViewSet",
    "MessageViewSet",
    "ProjectViewSet",
    "CustomUserViewSet",
]