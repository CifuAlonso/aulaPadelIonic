import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificacionesUsuarioPage } from './notificaciones-usuario.page';

describe('NotificacionesUsuarioPage', () => {
  let component: NotificacionesUsuarioPage;
  let fixture: ComponentFixture<NotificacionesUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
