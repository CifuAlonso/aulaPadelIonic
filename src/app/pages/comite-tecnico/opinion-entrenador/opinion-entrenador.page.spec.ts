import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpinionEntrenadorPage } from './opinion-entrenador.page';

describe('OpinionEntrenadorPage', () => {
  let component: OpinionEntrenadorPage;
  let fixture: ComponentFixture<OpinionEntrenadorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionEntrenadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpinionEntrenadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
