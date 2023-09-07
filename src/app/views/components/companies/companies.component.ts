import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { companie} from 'src/app/models/companie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  data$!: Observable<companie[]>;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(){
    this.data$ = this.databaseService.getAllItems('companies');
  }
}
