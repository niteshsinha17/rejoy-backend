import os
from pathlib import Path
from types import SimpleNamespace

from corsheaders.defaults import default_headers

BASE_DIR = Path(__file__).resolve().parent.parent

ENV_DEVELOPMENT = "development"
ENV_PRODUCTION = "production"

ENVIRONMENTS = SimpleNamespace(
    NAME=os.environ.get("ENVIRONMENT", ENV_DEVELOPMENT),
    DB_NAME=os.environ.get("DB_NAME"),
    DB_USER=os.environ.get("DB_USER"),
    DB_PASSWORD=os.environ.get("DB_PASSWORD"),
    DB_HOST=os.environ.get("DB_HOST"),
    DB_PORT=os.environ.get("DB_PORT"),
    REDIS_HOST=os.environ.get("REDIS_HOST", "redis"),
    REDIS_PORT=os.environ.get("REDIS_PORT", "6379"),
    DJANGO_SECRET_KEY=os.environ.get("DJANGO_SECRET_KEY"),
    EMAIL_HOST_USER=os.environ.get("EMAIL_HOST_USER"),
    EMAIL_HOST_PASSWORD=os.environ.get("EMAIL_HOST_PASSWORD"),
)

ENV = ENVIRONMENTS.NAME

SECRET_KEY = ENVIRONMENTS.DJANGO_SECRET_KEY

DEBUG = ENV != ENV_PRODUCTION

ALLOWED_HOSTS = ["*"]

if ENV == ENV_PRODUCTION:
    ALLOWED_HOSTS = [
        "www.google.com",
        "google.com",
        "rejoyhealth.com",
        "www.rejoyhealth.com",
        "44.245.172.17",
        "rejoy-copy.netlify.app",
        "www.rejoy-copy.netlify.app",
        "api.rejoyhealth.com",
        "www.api.rejoyhealth.com",
    ]

    CSRF_TRUSTED_ORIGINS = [
        "https://google.com",
        "https://www.google.com",
        "https://rejoyhealth.com",
        "https://www.rejoyhealth.com",
        "https://rejoy-copy.netlify.app",
        "https://www.rejoy-copy.netlify.app",
        "https://api.rejoyhealth.com",
        "https://www.api.rejoyhealth.com",
    ]

INSTALLED_APPS = [
    # Django contrib
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "phonenumber_field",
    # First-party — infra first, then product apps
    "core",
    "common",
    "authentication",
    "rejoy_ai",
    "practice",
    "contest",
    "catalog",
    "community",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

AUTH_USER_MODEL = "core.User"

if ENV == ENV_DEVELOPMENT:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": ENVIRONMENTS.DB_NAME,
            "USER": ENVIRONMENTS.DB_USER,
            "PASSWORD": ENVIRONMENTS.DB_PASSWORD,
            "HOST": ENVIRONMENTS.DB_HOST,
            "PORT": ENVIRONMENTS.DB_PORT,
        }
    }

REDIS_HOST = ENVIRONMENTS.REDIS_HOST
REDIS_PORT = int(ENVIRONMENTS.REDIS_PORT)

# Enforced in API serializers (min 4 chars). Django's built-in validators default to 8+ chars
# and reject numeric-only passwords, which conflicts with the product rules.
AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "django-static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.CursorPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_RENDERER_CLASSES": (
        "config.response_renderer.JSONResponseRenderer",
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "EXCEPTION_HANDLER": "config.exception_handler.custom_exception_handler",
}

if ENV == ENV_DEVELOPMENT:
    CORS_ORIGIN_ALLOW_ALL = True
else:
    CORS_ALLOWED_ORIGINS = [
        "https://rejoyhealth.com",
        "https://www.rejoyhealth.com",
        "https://rejoy-copy.netlify.app",
        "https://www.rejoy-copy.netlify.app",
    ]

CORS_ALLOW_HEADERS = [*default_headers, "Timezone"]

EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = ENVIRONMENTS.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = ENVIRONMENTS.EMAIL_HOST_PASSWORD
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
