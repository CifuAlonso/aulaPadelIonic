import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEjerciciosAGrupoPage } from './add-ejercicios-a-grupo.page';

describe('AddEjerciciosAGrupoPage', () => {
  let component: AddEjerciciosAGrupoPage;
  let fixture: ComponentFixture<AddEjerciciosAGrupoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEjerciciosAGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEjerciciosAGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
