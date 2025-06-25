import json
import os
import sys
from reservation import get_connection, initialize_schema, create_public_reservation


def main():
    data = json.load(sys.stdin)
    db_path = os.path.join(os.path.dirname(__file__), 'reservations.db')
    conn = get_connection(db_path)
    initialize_schema(conn)
    try:
        res_id = create_public_reservation(
            conn,
            customer_mobile=data["customer_mobile"],
            customer_username=data.get("customer_username"),
            customer_name=data.get("customer_name"),
            customer_phone=data.get("customer_phone"),
            customer_email=data.get("customer_email"),
            reservation_date=data["reservation_date"],
            number_of_people=int(data["number_of_people"]),
            special_requests=data.get("special_requests"),
        )
        print(json.dumps({"reservation_id": res_id}))
    except Exception as exc:
        print(json.dumps({"error": str(exc)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
