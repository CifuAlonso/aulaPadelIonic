import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverMenuSemanaPlanificacionComponent } from './popover-menu-semana-planificacion.component';

describe('PopoverMenuSemanaPlanificacionComponent', () => {
  let component: PopoverMenuSemanaPlanificacionComponent;
  let fixture: ComponentFixture<PopoverMenuSemanaPlanificacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverMenuSemanaPlanificacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverMenuSemanaPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
