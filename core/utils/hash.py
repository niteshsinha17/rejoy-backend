import os

import hashids


def get_hash_id():
    return hashids.Hashids(salt=str(os.environ.get("DJANGO_SECRET_KEY")), min_length=16)


class HashIdConverter:
    regex = "[a-zA-Z0-9]{16}"

    def to_python(self, value):
        hash_id = get_hash_id()
        return hash_id.decode(value)[0]

    def to_url(self, value):
        hash_id = get_hash_id()
        return hash_id.encode(value)

    @classmethod
    def encode(cls, value):
        hash_id = get_hash_id()
        return hash_id.encode(int(value))

    @classmethod
    def decode(cls, value):
        hash_id = get_hash_id()
        return hash_id.decode(value)[0]
