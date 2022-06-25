import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverVerPerfilComponent } from './popover-ver-perfil.component';

describe('PopoverVerPerfilComponent', () => {
  let component: PopoverVerPerfilComponent;
  let fixture: ComponentFixture<PopoverVerPerfilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverVerPerfilComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverVerPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
