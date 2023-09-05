import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service'; // Assurez-vous d'importer votre service
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tablecollection',
  templateUrl: './tablecollection.component.html',
  styleUrls: ['./tablecollection.component.css']
})
export class TablecollectionComponent implements OnInit {
  @Input() collectionName: string | null = null; // Le nom de la collection

  data: any[] | null = null; // Les données récupérées

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    if (this.collectionName !== null) {
      this.databaseService.getAllItems(this.collectionName).subscribe(data => {
        this.data = data; // Récupération des données de la collection
        // Vous pouvez également récupérer les libellés des champs ici si nécessaire
      });
    }
  }
}

