def get_phone_number_with_country_code(phone_number):
    return "+" + phone_number if phone_number[0] != "+" else phone_number
