import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DatabaseService } from '../../../services/database.service'; // Assurez-vous d'importer correctement le service
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data$: Observable<any[]> = new Observable<any[]>(); // Initialisation dans le constructeur
  //collectionNames$: Observable<any[]> = new Observable<any[]>();
  /* gestion du tableau de bord */
  selectedCollection: string = ''; // Initialisez la collection sélectionnée à vide
  selectedMenu: string = ''; // Initialisez la collection sélectionnée à vide
  isReduced: boolean = false;
  itemMenu$: Observable<any[]> = new Observable<any[]>();
  collectionName: any[] =[]; // Les données récupérées

  constructor(private databaseService: DatabaseService ,
             private auth : AuthService,
             private router: Router) {
      } // Injection du service

  ngOnInit() {
    /* nom de toute les collections */
       this.databaseService.getAllItems('collections').subscribe(data => {
       this.collectionName = data; // Récupération des données de la collection en data 
        // Met l'observable en tableau et rajoute un champ selected pour ngclass
        this.collectionName.forEach((item, index) => {
          item.selected = index === 0; // Mettez le premier élément à true, sinon false
        });
      });
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
  selectMenu( item : string){
    this.selectedMenu = item;
    this.selectedCollection = '';
  }
  selectCollection(indexmenu: number , collection: string) {
    this.selectedMenu = ''; /* on annule les autres choix du menu -*/
    this.collectionName.forEach((item) => {
      item.selected = false; // Mettez le premier élément à true, sinon false
    });
    this.collectionName[indexmenu].selected = true
    this.selectedCollection = collection;
    // Chargez les données de la collection sélectionnée à partir de Firebase
    this.data$ = this.databaseService.getAllItems(this.selectedCollection);
  }
// logout 
logout() {
  this.auth.logout();
  this.router.navigate(['/login-register']);
}

}

