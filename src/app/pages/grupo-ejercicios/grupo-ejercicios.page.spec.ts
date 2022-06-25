import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoEjerciciosPage } from './grupo-ejercicios.page';

describe('GrupoEjerciciosPage', () => {
  let component: GrupoEjerciciosPage;
  let fixture: ComponentFixture<GrupoEjerciciosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoEjerciciosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoEjerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
