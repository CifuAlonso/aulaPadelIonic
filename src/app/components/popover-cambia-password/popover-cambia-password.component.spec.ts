import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverCambiaPasswordComponent } from './popover-cambia-password.component';

describe('PopoverCambiaPasswordComponent', () => {
  let component: PopoverCambiaPasswordComponent;
  let fixture: ComponentFixture<PopoverCambiaPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverCambiaPasswordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverCambiaPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
