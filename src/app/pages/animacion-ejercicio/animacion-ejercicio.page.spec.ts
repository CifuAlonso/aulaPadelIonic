import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnimacionEjercicioPage } from './animacion-ejercicio.page';

describe('AnimacionEjercicioPage', () => {
  let component: AnimacionEjercicioPage;
  let fixture: ComponentFixture<AnimacionEjercicioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimacionEjercicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnimacionEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
