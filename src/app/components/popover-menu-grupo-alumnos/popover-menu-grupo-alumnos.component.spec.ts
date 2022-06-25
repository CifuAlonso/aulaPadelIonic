import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverMenuGrupoAlumnosComponent } from './popover-menu-grupo-alumnos.component';

describe('PopoverMenuGrupoAlumnosComponent', () => {
  let component: PopoverMenuGrupoAlumnosComponent;
  let fixture: ComponentFixture<PopoverMenuGrupoAlumnosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverMenuGrupoAlumnosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverMenuGrupoAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
