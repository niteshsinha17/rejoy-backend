from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


class LenientTokenAuthentication(TokenAuthentication):
    """
    Like TokenAuthentication, but invalid or unknown tokens do not return 401.
    Use on public endpoints that still want request.user when the token is valid.
    """

    def authenticate(self, request):
        try:
            return super().authenticate(request)
        except AuthenticationFailed:
            return None
