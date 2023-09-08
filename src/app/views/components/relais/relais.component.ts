import { Component, OnInit } from '@angular/core';
import { relai} from 'src/app/models/relai'
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-relais',
  templateUrl: './relais.component.html',
  styleUrls: ['./relais.component.css']
})
export class RelaisComponent implements OnInit{
  data$!: Observable<relai[]>;
  displayedColumns : string[] =['id','name'];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){
    this.data$ = this.databaseService.getAllItems('relais');
  }
}

