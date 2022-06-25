import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LicenciaUsuarioPage } from './licencia-usuario.page';

describe('LicenciaUsuarioPage', () => {
  let component: LicenciaUsuarioPage;
  let fixture: ComponentFixture<LicenciaUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciaUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LicenciaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
