import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmodalcomponentComponent } from './otpmodalcomponent.component';

describe('OtpmodalcomponentComponent', () => {
  let component: OtpmodalcomponentComponent;
  let fixture: ComponentFixture<OtpmodalcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpmodalcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpmodalcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
