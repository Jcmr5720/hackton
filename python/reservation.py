"""Restaurant reservation management module.

This module provides functions to create and manage restaurant reservations
for both public and registered users. It uses SQLite as the storage backend
and is designed to be integrated into web controllers or HTTP routes.
"""

import sqlite3
from datetime import datetime
from typing import Optional, Dict, Any, List

DB_NAME = "reservations.db"


def get_connection(db_name: str = DB_NAME) -> sqlite3.Connection:
    """Return a connection to the SQLite database."""
    return sqlite3.connect(db_name)


def initialize_schema(conn: sqlite3.Connection) -> None:
    """Create the required tables if they do not exist."""
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS logger (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            name TEXT,
            phone TEXT,
            mobile TEXT,
            email TEXT
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            logger_id INTEGER,
            customer_username TEXT,
            customer_name TEXT,
            customer_phone TEXT,
            customer_mobile TEXT NOT NULL,
            customer_email TEXT,
            reservation_date TEXT NOT NULL,
            number_of_people INTEGER NOT NULL,
            table_number INTEGER,
            special_requests TEXT,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            user_id INTEGER,
            FOREIGN KEY(logger_id) REFERENCES logger(id)
        )
        """
    )
    conn.commit()


def _find_registered_user(
    conn: sqlite3.Connection, *, username: Optional[str], phone: Optional[str]
) -> Optional[Dict[str, Any]]:
    """Return registered user data if username or phone matches."""
    cur = conn.cursor()
    if username:
        cur.execute("SELECT * FROM logger WHERE username = ?", (username,))
        row = cur.fetchone()
        if row:
            columns = [col[0] for col in cur.description]
            return dict(zip(columns, row))
    if phone:
        cur.execute("SELECT * FROM logger WHERE phone = ? OR mobile = ?", (phone, phone))
        row = cur.fetchone()
        if row:
            columns = [col[0] for col in cur.description]
            return dict(zip(columns, row))
    return None


def _validate_reservation(date_str: str, num_people: int) -> None:
    """Validate reservation date and number of people."""
    reservation_dt = datetime.fromisoformat(date_str)
    if reservation_dt <= datetime.now():
        raise ValueError("Reservation date must be in the future")
    if num_people <= 0:
        raise ValueError("Number of people must be greater than zero")


def create_public_reservation(
    conn: sqlite3.Connection,
    *,
    customer_mobile: str,
    customer_username: Optional[str] = None,
    customer_name: Optional[str] = None,
    customer_phone: Optional[str] = None,
    customer_email: Optional[str] = None,
    reservation_date: str,
    number_of_people: int,
    special_requests: Optional[str] = None,
) -> int:
    """Create reservation for a public or registered user.

    If the provided username or phone matches a registered user, their
    information is automatically linked via logger_id and used to
    complete the reservation.
    """
    _validate_reservation(reservation_date, number_of_people)
    user = _find_registered_user(
        conn, username=customer_username, phone=customer_mobile
    )
    logger_id = user["id"] if user else None
    if user:
        customer_username = user.get("username")
        customer_name = user.get("name")
        customer_phone = user.get("phone")
        customer_mobile = user.get("mobile")
        customer_email = user.get("email")
    cur = conn.cursor()
    now = datetime.utcnow().isoformat()
    cur.execute(
        """
        INSERT INTO reservations (
            logger_id, customer_username, customer_name, customer_phone,
            customer_mobile, customer_email, reservation_date, number_of_people,
            table_number, special_requests, status, created_at, updated_at, user_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, 'pending', ?, ?, NULL)
        """,
        (
            logger_id,
            customer_username,
            customer_name,
            customer_phone,
            customer_mobile,
            customer_email,
            reservation_date,
            number_of_people,
            special_requests,
            now,
            now,
        ),
    )
    conn.commit()
    return cur.lastrowid


def get_all_reservations(conn: sqlite3.Connection) -> List[Dict[str, Any]]:
    """Return all reservations with their status."""
    cur = conn.cursor()
    cur.execute("SELECT * FROM reservations")
    rows = cur.fetchall()
    columns = [col[0] for col in cur.description]
    return [dict(zip(columns, row)) for row in rows]


def update_reservation_status(
    conn: sqlite3.Connection, reservation_id: int, status: str
) -> None:
    """Update status of a reservation."""
    cur = conn.cursor()
    now = datetime.utcnow().isoformat()
    cur.execute(
        "UPDATE reservations SET status = ?, updated_at = ? WHERE id = ?",
        (status, now, reservation_id),
    )
    conn.commit()


def assign_table(
    conn: sqlite3.Connection, reservation_id: int, table_number: int
) -> None:
    """Assign a table to a reservation."""
    cur = conn.cursor()
    now = datetime.utcnow().isoformat()
    cur.execute(
        "UPDATE reservations SET table_number = ?, updated_at = ? WHERE id = ?",
        (table_number, now, reservation_id),
    )
    conn.commit()


def edit_reservation(
    conn: sqlite3.Connection,
    reservation_id: int,
    *,
    reservation_date: Optional[str] = None,
    number_of_people: Optional[int] = None,
    special_requests: Optional[str] = None,
    customer_name: Optional[str] = None,
    customer_phone: Optional[str] = None,
    customer_mobile: Optional[str] = None,
    customer_email: Optional[str] = None,
) -> None:
    """Edit reservation information."""
    fields = []
    params: List[Any] = []
    if reservation_date is not None:
        _validate_reservation(
            reservation_date, number_of_people if number_of_people else 1
        )
        fields.append("reservation_date = ?")
        params.append(reservation_date)
    if number_of_people is not None:
        if number_of_people <= 0:
            raise ValueError("Number of people must be greater than zero")
        fields.append("number_of_people = ?")
        params.append(number_of_people)
    if special_requests is not None:
        fields.append("special_requests = ?")
        params.append(special_requests)
    if customer_name is not None:
        fields.append("customer_name = ?")
        params.append(customer_name)
    if customer_phone is not None:
        fields.append("customer_phone = ?")
        params.append(customer_phone)
    if customer_mobile is not None:
        fields.append("customer_mobile = ?")
        params.append(customer_mobile)
    if customer_email is not None:
        fields.append("customer_email = ?")
        params.append(customer_email)
    if not fields:
        return
    now = datetime.utcnow().isoformat()
    fields.append("updated_at = ?")
    params.append(now)
    params.append(reservation_id)
    cur = conn.cursor()
    cur.execute(
        f"UPDATE reservations SET {', '.join(fields)} WHERE id = ?",
        params,
    )
    conn.commit()
