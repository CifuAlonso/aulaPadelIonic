import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriasPlanificacionExploraPage } from './categorias-planificacion-explora.page';

describe('CategoriasPlanificacionExploraPage', () => {
  let component: CategoriasPlanificacionExploraPage;
  let fixture: ComponentFixture<CategoriasPlanificacionExploraPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasPlanificacionExploraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasPlanificacionExploraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
