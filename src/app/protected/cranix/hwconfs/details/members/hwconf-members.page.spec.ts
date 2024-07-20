import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { HwconfMembersPage } from './hwconf-members.page';

describe('HwconfMembersPage', () => {
  let component: HwconfMembersPage;
  let fixture: ComponentFixture<HwconfMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), HwconfMembersPage]
}).compileComponents();

    fixture = TestBed.createComponent(HwconfMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
