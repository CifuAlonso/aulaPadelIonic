import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGrupoEjerciciosPage } from './add-grupo-ejercicios.page';

describe('AddGrupoEjerciciosPage', () => {
  let component: AddGrupoEjerciciosPage;
  let fixture: ComponentFixture<AddGrupoEjerciciosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrupoEjerciciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGrupoEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
