import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverFotoAlumnoComponent } from './popover-foto-alumno.component';

describe('PopoverFotoAlumnoComponent', () => {
  let component: PopoverFotoAlumnoComponent;
  let fixture: ComponentFixture<PopoverFotoAlumnoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverFotoAlumnoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverFotoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
