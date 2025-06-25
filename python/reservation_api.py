#!/usr/bin/env python3
import sys, json
from reservation import get_connection, initialize_schema, create_public_reservation


def main():
    data = json.load(sys.stdin)
    conn = get_connection()
    initialize_schema(conn)
    try:
        reservation_id = create_public_reservation(conn, **data)
        print(json.dumps({"id": reservation_id}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
