import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecollectionComponent } from './tablecollection.component';

describe('TablecollectionComponent', () => {
  let component: TablecollectionComponent;
  let fixture: ComponentFixture<TablecollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablecollectionComponent]
    });
    fixture = TestBed.createComponent(TablecollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
