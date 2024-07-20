import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { HwconfsPage } from './hwconfs.page';

describe('HwconfsPage', () => {
  let component: HwconfsPage;
  let fixture: ComponentFixture<HwconfsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), HwconfsPage]
}).compileComponents();

    fixture = TestBed.createComponent(HwconfsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
