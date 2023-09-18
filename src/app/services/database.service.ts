import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  /* obtient un collection */
  getCollection(collectionName: string, queryFn?: QueryFn): AngularFirestoreCollection<any> {
    if (queryFn) {
      return this.firestore.collection(collectionName, queryFn);
    } else {
      return this.firestore.collection(collectionName);
    }
  }
  // Exemple d'utilisation de getCollection avec des query
  fetchCollectionWithQuery() {
    // Définissez votre requête ici, par exemple, pour obtenir des documents dont le champ 'name' est égal à 'John'
    const queryFn: QueryFn = ref => ref.where('name', '==', 'John');

    // Appelez la fonction pour récupérer la collection avec la requête
    const collectionName = 'users'; // Nom de la collection
    const collectionWithQuery = this.getCollection(collectionName, queryFn);

    // Vous pouvez maintenant utiliser la collection avec la requête
    // Par exemple, pour obtenir les données
    return collectionWithQuery.valueChanges().subscribe(data => {
      console.log('Données avec la requête :', data);
    });
  }
  /*Pour l'appeler */
  /* ngOnInit() {
    const productId = 'ID_DU_PRODUIT'; // Remplacez par l'ID du produit que vous souhaitez récupérer
    this.reservations = this.votreService.getReservationsForProduct(productId);
  }

  /* Recuprer une collection reservations qui fait partie d'un document produit*/
  getReservationsForProduct(productId: string): Observable<any[]> {
    // Accédez au document "produit" en utilisant l'ID
    const productDocRef = this.firestore.collection('produits').doc(productId);

    // Accédez à la collection "reservations" du document "produit"
    return productDocRef.collection('reservations').valueChanges();
  }
  
  /* recupere les items en tant qu'observable donc avec mise a jour*/
  getAllItems(collectionName: string): Observable<any[]> {
    const collection = this.getCollection(collectionName);
    return collection.valueChanges();
  }

  /* ajoute un item*/
  addItem(collectionName: string, itemData: any): Promise<any> {
    const collection = this.getCollection(collectionName);
    return collection.add(itemData);
  }

  /* Efface tous les champs qui ont par exemple name ='fred' */
  deleteItemByField(collectionName: string, fieldName: string, fieldValue: any): Promise<void>
   {
    const collection = this.getCollection(collectionName);

    // Recherchez les documents correspondant au champ spécifié
    return new Promise<void>((resolve, reject) => {
      collection.ref.where(fieldName, '==', fieldValue).get().then(querySnapshot => {
        const deletePromises: Promise<void>[] = [];
        querySnapshot.forEach(doc => {
          deletePromises.push(doc.ref.delete());
        });
        Promise.all(deletePromises)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }


/* supprime par id du document generer automatiquement par firebase : pas trop utile*/
  deleteItem(collectionName: string, itemId: string): Promise<void> {
    const collection = this.getCollection(collectionName);
    return collection.doc(itemId).delete();
  }

/* supprime la collection */
   deleteCollection(collectionName: string): Promise<void> {
    const collection = this.getCollection(collectionName);

    // Supprimez tous les documents de la collection un par un
    return new Promise<void>((resolve, reject) => {
      collection.ref.get().then(querySnapshot => {
        const deletePromises: Promise<void>[] = [];
        querySnapshot.forEach(doc => {
          deletePromises.push(doc.ref.delete());
        });
        Promise.all(deletePromises)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
/*  connaitre toutes collections existantes dans une base de données */
getCollections() {
  return this.getAllItems('collections');
  
}
}
