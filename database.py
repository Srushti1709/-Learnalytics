import sqlite3

import os


def init_db():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(BASE_DIR, "database.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            full_name TEXT,
            email TEXT,
            age INTEGER,
            course TEXT,
            image TEXT
        )
    """
    )
    # cursor.execute(
    #     """
    #     CREATE TABLE IF NOT EXISTS student_data (
    #         id INTEGER PRIMARY KEY AUTOINCREMENT,
    #         user_id INTEGER,
    #         study_hours REAL,
    #         attendance REAL,
    #         sleep_hours REAL,
    #         internet_usage REAL,
    #         predicted_marks REAL,
    #         performance_category TEXT,
    #         FOREIGN KEY (user_id) REFERENCES users(id)
    #     )
    # """
    # )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS student_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            study_hours REAL,
            attendance REAL,
            sleep_hours REAL,
            internet_usage REAL,
            predicted_marks REAL,
            performance_category TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            study REAL,
            attendance REAL,
            sleep REAL,
            stress REAL,
            score REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )   
    """
    )
    conn.commit()
    conn.close()
