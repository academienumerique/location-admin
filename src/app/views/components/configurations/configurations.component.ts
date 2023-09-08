import { Component, OnInit } from '@angular/core';
import { configuration} from 'src/app/models/configuration'
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  data$!: Observable<configuration[]>;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){
    this.data$ = this.databaseService.getAllItems('configurations');
  }
}
