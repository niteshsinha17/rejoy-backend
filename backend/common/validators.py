import phonenumbers


def is_valid_phone_number(phone_number, region=""):
    try:
        parsed_number = phonenumbers.parse(phone_number, region)
        return phonenumbers.is_valid_number(parsed_number)
    except:
        return False
