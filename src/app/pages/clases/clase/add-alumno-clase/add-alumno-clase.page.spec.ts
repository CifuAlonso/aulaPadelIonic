import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAlumnoClasePage } from './add-alumno-clase.page';

describe('AddAlumnoClasePage', () => {
  let component: AddAlumnoClasePage;
  let fixture: ComponentFixture<AddAlumnoClasePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlumnoClasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAlumnoClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
