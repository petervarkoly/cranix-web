import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { GroupDetailsPage } from './group-details.page';

describe('GroupDetailsPage', () => {
  let component: GroupDetailsPage;
  let fixture: ComponentFixture<GroupDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), GroupDetailsPage]
}).compileComponents();

    fixture = TestBed.createComponent(GroupDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
