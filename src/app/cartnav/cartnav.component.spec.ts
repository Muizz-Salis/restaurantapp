import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartnavComponent } from './cartnav.component';

describe('CartnavComponent', () => {
  let component: CartnavComponent;
  let fixture: ComponentFixture<CartnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
