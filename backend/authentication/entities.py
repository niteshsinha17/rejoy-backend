from dataclasses import dataclass


@dataclass
class Permissions:
    can_access_dashboard: bool


@dataclass
class AuthLoginResponseData:
    token: str
    permissions: Permissions
