from datetime import datetime

from dotenv import load_dotenv
load_dotenv()

import mysql.connector
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create a connection to the database
conn = mysql.connector.connect(
    database=os.getenv("MYSQL_DATABASE"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_ROOT_PASSWORD"),
    port=3306,
    host=os.getenv("MYSQL_HOST"))

class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    birthDate: str
    zip: str
    city: str

@app.get("/users")
async def get_users():
    cursor = conn.cursor()
    sql_select_Query = "select * from users"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table: ", cursor.rowcount)
    # renvoyer nos données et 200 code OK
    return {'utilisateurs': records}

@app.post("/users")
async def create_user(user: User):
    cursor = conn.cursor()

    # Normalisation de l'email
    email_normalized = user.email.strip().lower()
    cursor.execute("SELECT id FROM users WHERE LOWER(email) = %s", (email_normalized,))
    row = cursor.fetchone()
    if row:
        cursor.close()
        raise HTTPException(status_code=400, detail="EMAIL_ALREADY_EXISTS")

    # Vérification de la date
    try:
        birth_date_obj = datetime.fromisoformat(user.birthDate.replace("Z", ""))
        birth_date_str = birth_date_obj.strftime("%Y-%m-%d")
    except Exception as e:
        cursor.close()
        raise HTTPException(status_code=400, detail="INVALID_DATE_FORMAT")

    sql_insert_query = """
                       INSERT INTO users (firstName, lastName, email, birthDate, zip, city)
                       VALUES (%s, %s, %s, %s, %s, %s) \
                       """
    values = (user.firstName, user.lastName, email_normalized, birth_date_str, user.zip, user.city)

    try:
        cursor.execute(sql_insert_query, values)
        conn.commit()
        new_id = cursor.lastrowid
        return {"id": new_id}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail="SERVER_ERROR: " + str(e))
    finally:
        cursor.close()

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    if cursor.rowcount == 0:
        cursor.close()
        raise HTTPException(status_code=404, detail="User not found")
    cursor.close()
    return {"message": "User successfully deleted"}