import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { HwconfEditPage } from './hwconf-edit.page';

describe('HwconfEditPage', () => {
  let component: HwconfEditPage;
  let fixture: ComponentFixture<HwconfEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), HwconfEditPage]
}).compileComponents();

    fixture = TestBed.createComponent(HwconfEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
