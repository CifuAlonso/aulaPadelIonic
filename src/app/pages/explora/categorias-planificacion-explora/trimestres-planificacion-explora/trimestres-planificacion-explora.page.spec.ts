import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrimestresPlanificacionExploraPage } from './trimestres-planificacion-explora.page';

describe('TrimestresPlanificacionExploraPage', () => {
  let component: TrimestresPlanificacionExploraPage;
  let fixture: ComponentFixture<TrimestresPlanificacionExploraPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimestresPlanificacionExploraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrimestresPlanificacionExploraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
