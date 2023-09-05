import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DatabaseService } from '../../../services/database.service'; // Assurez-vous d'importer correctement le service

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data$: Observable<any[]> = new Observable<any[]>(); // Initialisation dans le constructeur
  collectionNames$: Observable<any[]> = new Observable<any[]>();
  /* gestion du tableau de bord */
  isReduced: boolean = false;
  itemMenu: { display: string; collection: string }[] = [];
  selectedCollection: string = ''; // Initialisez la collection sélectionnée à vide
  
  

  constructor(private databaseService: DatabaseService) {
      } // Injection du service

  ngOnInit() {
    /* nom de toute les colelctions */
      this.collectionNames$ = this.databaseService.getAllItems('collections');
      this.databaseService.getAllItems('collections').subscribe((collections: any[]) => {
        // Transformez les données Firebase en un tableau itemMenu
        this.itemMenu = collections.map(collection => {
          return { display: collection.namemenu, collection: collection.name };
        });
      });
    // Utilisez le service pour obtenir les données de la collection
       this.data$ = this.databaseService.getAllItems('relais'); // Remplacez 'relais' par le nom de la collection souhaitée
         
}

  addTodo() {
    const relayData = { id: 6, name: 'fred' };
    
    // Utilisez le service pour ajouter un élément
    this.databaseService.addItem('relais', relayData).then(() => {
      console.log('Tâche ajoutée !');
    });
  }

  deleteCollection() {
    // Supprimer toute la collection
    // Vous pouvez implémenter cette fonction dans le service si nécessaire
    // En utilisant le service, il est préférable de centraliser la gestion des données.
    this.databaseService.deleteCollection('relais')
  }

  deleteItem(itemId: string) {
    // Utilisez le service pour supprimer un élément individuel en utilisant son ID
    this.databaseService.deleteItemByField('relais', 'id', 6).then(() => {
      console.log('Tâche supprimée !');
    });
  }

 /* gestion du tableau de bord */
   toggleLeftSection() {
    this.isReduced = !this.isReduced;
  }
  selectCollection(collection: string) {
    this.selectedCollection = collection;
    // Chargez les données de la collection sélectionnée à partir de Firebase
  }
}

