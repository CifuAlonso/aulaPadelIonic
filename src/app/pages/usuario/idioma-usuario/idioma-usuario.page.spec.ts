import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdiomaUsuarioPage } from './idioma-usuario.page';

describe('IdiomaUsuarioPage', () => {
  let component: IdiomaUsuarioPage;
  let fixture: ComponentFixture<IdiomaUsuarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomaUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdiomaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
