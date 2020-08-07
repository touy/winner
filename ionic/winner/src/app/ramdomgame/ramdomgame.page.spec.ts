import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RamdomgamePage } from './ramdomgame.page';

describe('RamdomgamePage', () => {
  let component: RamdomgamePage;
  let fixture: ComponentFixture<RamdomgamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamdomgamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RamdomgamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
