import { Component, OnInit, Inject } from '@angular/core';
import { relai } from 'src/app/models/relai'
import { DatabaseService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NgIf} from '@angular/common';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-relais',
  templateUrl: './relais.component.html',
  styleUrls: ['./relais.component.css'],
})
export class RelaisComponent implements OnInit {
  data$!: Observable<relai[]>;
  displayedColumns: string[] = ['id', 'name'];
  name: string = 'fred';

  constructor(private databaseService: DatabaseService, private dialog: MatDialog) {}

  ngOnInit() {
    this.data$ = this.databaseService.getAllItems('relais');
    this.name = 'delphine';
  }

  AddItem() {
    this.databaseService.addItem('relais', { id: '4', name: 'Saint Gilles' });
  }

  editItem(index: string) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

  effaceItem(id: number) {
    this.databaseService.deleteItemByField('relais', 'id', id);
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [NgIf],
  
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
