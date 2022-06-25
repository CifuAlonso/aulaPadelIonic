import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverDetalleTecnicoComponent } from './popover-detalle-tecnico.component';

describe('PopoverDetalleTecnicoComponent', () => {
  let component: PopoverDetalleTecnicoComponent;
  let fixture: ComponentFixture<PopoverDetalleTecnicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverDetalleTecnicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverDetalleTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
