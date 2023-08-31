const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin.json"); // Replace with the path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fred-gaetan-location.firebaseio.com" // Replace with your Firebase project URL
});

// Reference to Firestore
const db = admin.firestore();

const data = [
  {
    "id": "1",
    "name": "Dtentes",
    "address": "123 Rue de la Détente",
    "openingHours": [
      {
        "day": "lundi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "mardi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "mercredi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "jeudi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "vendredi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "samedi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "dimanche",
        "openingTime": "00:00",
        "closingTime": "00:00"
      }
    ]
  },
  {
    "id": "2",
    "name": "LocVelo",
    "address": "456 Avenue des Vélos",
    "openingHours": [
      {
        "day": "lundi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "mardi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "mercredi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "jeudi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "vendredi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "samedi",
        "openingTime": "08:00",
        "closingTime": "19:00"
      },
      {
        "day": "dimanche",
        "openingTime": "00:00",
        "closingTime": "00:00"
      }
    ]
  }
];

// Delete all documents in the collection
async function deleteAllDocuments() {
  const collectionRef = db.collection("companies"); // Replace with the name of your collection

  try {
    const snapshot = await collectionRef.get();
    snapshot.forEach(async (doc) => {
      await doc.ref.delete();
      console.log(`Document with ID ${doc.id} deleted.`);
    });
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}

// Add data to the collection
async function addDataToCollection() {
  const collectionRef = db.collection("companies"); // Replace with the name of your collection

  try {
    for (const item of data) {
      await collectionRef.add({
        id: item.id,
        name: item.name,
        address: item.address,
        openingHours: item.openingHours
      });
      console.log(`Document with ID ${item.id} added successfully.`);
    }

    console.log("Documents added successfully.");
  } catch (error) {
    console.error("Error adding documents:", error);
  }
}

// Call the functions to delete and then add data to the collection
deleteAllDocuments()
  .then(() => addDataToCollection())
  .catch((error) => console.error("Error:", error));

