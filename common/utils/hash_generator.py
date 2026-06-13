import os

import hashids


def getHasId():
    return hashids.Hashids(salt=str(os.environ.get("DJANGO_SECRET_KEY")), min_length=16)


class HashIdConverter:
    regex = "[a-zA-Z0-9]{16}"

    def to_python(self, value):
        HASH_ID = getHasId()
        return HASH_ID.decode(value)[0]

    def to_url(self, value):
        HASH_ID = getHasId()
        return HASH_ID.encode(value)

    @classmethod
    def encode(cls, value):
        HASH_ID = getHasId()
        return HASH_ID.encode(int(value))

    @classmethod
    def decode(cls, value):
        HASH_ID = getHasId()
        return HASH_ID.decode(value)[0]
