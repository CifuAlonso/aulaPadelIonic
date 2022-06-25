import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEjercicioSemanaPage } from './add-ejercicio-semana.page';

describe('AddEjercicioSemanaPage', () => {
  let component: AddEjercicioSemanaPage;
  let fixture: ComponentFixture<AddEjercicioSemanaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEjercicioSemanaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEjercicioSemanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
