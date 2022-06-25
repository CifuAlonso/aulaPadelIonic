import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrupoVideoLibrosPage } from './grupo-video-libros.page';

describe('GrupoVideoLibrosPage', () => {
  let component: GrupoVideoLibrosPage;
  let fixture: ComponentFixture<GrupoVideoLibrosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoVideoLibrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoVideoLibrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
