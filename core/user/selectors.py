import random

from django.db.models import Count, Exists, OuterRef, Q

from core.models import Follower, User


def get_user_details(username: str):
    return (
        User.objects.annotate(
            total_products=Count("products", distinct=True),
            total_posts=Count("post", distinct=True),
            follower_count=Count("following", distinct=True),
            following_count=Count("follower", distinct=True),
        )
        .filter(username=username)
        .prefetch_related("user_profile")
        .first()
    )


def get_searched_user_list(query, user):
    queryset = (
        User.objects.filter(
            Q(username__iexact=query)
            | Q(username__istartswith=query)
            | Q(username__icontains=query)
            | Q(first_name__iexact=query)
            | Q(first_name__istartswith=query)
            | Q(first_name__icontains=query)
            | Q(last_name__iexact=query)
            | Q(last_name__istartswith=query)
            | Q(last_name__icontains=query)
        )
        .annotate(
            follower_count=Count("following", distinct=True),
            followed_by_user=Exists(
                Follower.objects.filter(follower=user, following=OuterRef("id"))
            ),
        )
        .exclude(
            Q(username=user.username) | Q(is_email_verified=False) | Q(is_active=False),
            Q(is_staff=True),
        )
        .distinct()
        .prefetch_related("user_profile")
    )

    # Order the results as specified (exact match, starts with, contains, followers, followed by user)
    def custom_sorting_key(user):
        exact_username_match = user.username.lower() == query.lower()
        exact_full_name_match = user.full_name.lower() == query.lower()
        # exact_first_name_match = user.first_name.lower() == query.lower()

        if exact_username_match or exact_full_name_match:
            return (1, exact_username_match, exact_full_name_match)

        starts_match = user.username.lower().startswith(
            query.lower()
        ) or user.full_name.lower().startswith(query.lower())
        contains_match = (
            query.lower() in user.username.lower()
            or query.lower() in user.full_name.lower()
        )
        following = user.followed_by_user
        follower_count = -user.follower_count

        return (
            2,
            starts_match and following,
            contains_match and following,
            starts_match and follower_count,
            contains_match and follower_count,
            user.id,
        )

    # Sort the results based on the custom sorting key
    queryset = sorted(queryset, key=custom_sorting_key)
    return queryset


def get_followers(user: User, page: int = 0):
    followers = Follower.objects.filter(following=user)
    followers_users = [
        get_user_details(follower.follower.username) for follower in followers
    ]
    return followers_users


def get_followings(user: User, page: int = 0):
    followings = Follower.objects.filter(follower=user)
    followings_users = [
        get_user_details(following.following.username) for following in followings
    ]
    return followings_users


def get_user_suggestion_list(requestingUser: User):
    # exclude users who are staff, inactive, or requestingUser
    # also exclude users who are being followed by requestingUser
    users = (
        User.objects.filter(
            is_active=True,
            is_email_verified=True,
            is_staff=False,
        )
        .exclude(
            Q(username=requestingUser.username) | Q(following__follower=requestingUser)
        )
        .annotate(
            follower_count=Count("following", distinct=True),
        )
        .exclude(follower_count=0)
        .order_by("-follower_count")
    )

    count = users.count()

    if count > 10:
        offset = random.randint(0, count - 10)
        users = users[offset : offset + 10]  # noqa: E203
    else:
        users = users[:10]

    return users
