import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddComiteTecnicoPage } from './add-comite-tecnico.page';

describe('AddComiteTecnicoPage', () => {
  let component: AddComiteTecnicoPage;
  let fixture: ComponentFixture<AddComiteTecnicoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComiteTecnicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddComiteTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
