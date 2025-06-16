import csv
import json
import firebase_admin
from firebase_admin import credentials, firestore

def csv_to_json(csvPath, jsonPath):
    try:
        with open(csvPath, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.DictReader(csv_file)

            json_list = []

            for row in csv_reader:
                json_object = {
                    "name": row["Name"],
                    "address": {
                        "neighborhood": row["Neighborhood"],
                        "street": row["Street"],
                        "geo": row["Geo"]
                    },
                    "attributes": {
                        "internet": row["Internet"].strip().lower() in ["true", "yes", "1"],
                        "outlets": int(row["Outlets"]) if row["Outlets"].strip().isdigit() else -1,
                        "price": row["Price"],
                    },
                    "tags": {
                        "rules": row["Rules"].split(", "),
                        "cuisine": row["Cuisine"].split(", "),
                        "vibes": row["Vibes"].split(", ")
                    },
                    "website": row["Website"]
                }
                json_list.append(json_object)

        with open(jsonPath, mode='w', encoding='utf-8') as json_file:
            json.dump(json_list, json_file, indent=4, ensure_ascii=False)

        print(f"JSON file saved successfully to {jsonPath}")

        upload_json_to_firestore(jsonPath)
    except FileNotFoundError:
        print(f"Error: File not found at {jsonPath}")
    except KeyError as e:
        print(f"Error: Missing column {e} in CSV file")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def upload_json_to_firestore(jsonPath, collection_name = "cafes"):
    try:
        # Initialize Firebase Admin SDK
        cred = credentials.Certificate('./scripts/credentials.json')
        firebase_admin.initialize_app(cred)
        db = firestore.client()

        # Load JSON file
        with open(jsonPath, mode='r', encoding='utf-8') as json_file:
            data = json.load(json_file)

            for document in data:
                # Add document to Firestore
                doc_ref = db.collection(collection_name).document()
                doc_ref.set(document)

        print(f"Data uploaded successfully to Firestore collection '{collection_name}'")
    except FileNotFoundError:
        print(f"Error: File not found at {jsonPath}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# edit these with the path to the file
csvPath = "./scripts/cafeDataInput.csv"
jsonPath = "./scripts/cafeDataAsJSON.json"

csv_to_json(csvPath, jsonPath)