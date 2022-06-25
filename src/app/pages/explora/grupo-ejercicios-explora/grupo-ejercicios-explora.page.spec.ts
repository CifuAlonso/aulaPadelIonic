import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoEjerciciosExploraPage } from './grupo-ejercicios-explora.page';

describe('GrupoEjerciciosExploraPage', () => {
  let component: GrupoEjerciciosExploraPage;
  let fixture: ComponentFixture<GrupoEjerciciosExploraPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoEjerciciosExploraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoEjerciciosExploraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
