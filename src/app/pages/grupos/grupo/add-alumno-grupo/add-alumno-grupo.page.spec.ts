import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAlumnoGrupoPage } from './add-alumno-grupo.page';

describe('AddAlumnoGrupoPage', () => {
  let component: AddAlumnoGrupoPage;
  let fixture: ComponentFixture<AddAlumnoGrupoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlumnoGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAlumnoGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
