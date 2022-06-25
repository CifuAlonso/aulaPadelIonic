import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverMenuAlumnoComponent } from './popover-menu-alumno.component';

describe('PopoverMenuAlumnoComponent', () => {
  let component: PopoverMenuAlumnoComponent;
  let fixture: ComponentFixture<PopoverMenuAlumnoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverMenuAlumnoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverMenuAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
