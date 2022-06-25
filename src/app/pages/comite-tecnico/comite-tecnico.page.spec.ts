import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComiteTecnicoPage } from './comite-tecnico.page';

describe('ComiteTecnicoPage', () => {
  let component: ComiteTecnicoPage;
  let fixture: ComponentFixture<ComiteTecnicoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteTecnicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComiteTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
