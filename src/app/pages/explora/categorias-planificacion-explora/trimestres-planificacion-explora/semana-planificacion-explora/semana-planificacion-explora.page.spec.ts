import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemanaPlanificacionExploraPage } from './semana-planificacion-explora.page';

describe('SemanaPlanificacionExploraPage', () => {
  let component: SemanaPlanificacionExploraPage;
  let fixture: ComponentFixture<SemanaPlanificacionExploraPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanaPlanificacionExploraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemanaPlanificacionExploraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
