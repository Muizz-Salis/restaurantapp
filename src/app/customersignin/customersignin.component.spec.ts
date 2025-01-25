import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersigninComponent } from './customersignin.component';

describe('CustomersigninComponent', () => {
  let component: CustomersigninComponent;
  let fixture: ComponentFixture<CustomersigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
