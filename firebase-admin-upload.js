const admin = require("firebase-admin");
// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin.json"); // Replace with the path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fred-gaetan-location.firebaseio.com" // Replace with your Firebase project URL
});

// Reference to Firestore
const db = admin.firestore();

// gestion de relais : ne pas oublier le transpiler relai.ts en relai.js
const { relais } = require("./src/assets/files/relai"); // Chemin vers votre fichier relais.ts

// d'abord on efface 
async function deleteAllDocuments() {
  const collectionRef = db.collection("relais"); // Replace with the name of your collection

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

// puis on ajoute
async function addDataToCollection() {
  const collectionRef = db.collection("relais"); // Replace with the name of your collection

  try {
    for (const relaiItem of relais) {
      await collectionRef.add({
        id: relaiItem.id,
        name: relaiItem.name,
        latitude: relaiItem.latitude,
        longitude: relaiItem.longitude,
        photos: relaiItem.photos,
      }
      );
      console.log(`Document with ID ${relaiItem.id} added successfully.`);
    }

    console.log("Documents added successfully.");
  
    
  } catch (error) {
    console.error("Error adding documents:", error);
  }
}


// Call the function to add data to the collection
deleteAllDocuments();
addDataToCollection();
