import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaisComponent } from './relais.component';

describe('RelaisComponent', () => {
  let component: RelaisComponent;
  let fixture: ComponentFixture<RelaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelaisComponent]
    });
    fixture = TestBed.createComponent(RelaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
