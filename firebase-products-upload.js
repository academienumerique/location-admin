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
const { products } = require("./src/assets/files/product"); // Chemin vers votre fichier relais.ts

// d'abord on efface 
async function deleteAllDocuments() {
  const collectionRef = db.collection("products"); // Replace with the name of your collection

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
  const collectionRef = db.collection("products"); // Replace with the name of your collection

  try {
    for (const productItem of products) {
      await collectionRef.add({
        id: productItem.id,
        id_category: productItem.id_category,
        name: productItem.name,
        nameRoute: productItem.nameRoute,
        description_short: productItem.description_short,
        description_long: productItem.description_long,
        thumbnail: productItem.thumbnail,
        images: productItem.images,
        weight: productItem.weight,
        avisweb: productItem.avisweb,
        caution: productItem.caution,
        video: {
          title: productItem.video.title,
          src: productItem.video.src
        },
      });
      console.log(`Document with ID ${productItem.id} added successfully.`);
    }
  
  } catch (error) {
    console.error("Error adding documents:", error);
  }
}


// Call the function to add data to the collection
deleteAllDocuments();
addDataToCollection();
