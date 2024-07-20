import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { InstituteDetailsPage } from './institute-details.page';

describe('InstituteDetailsPage', () => {
  let component: InstituteDetailsPage;
  let fixture: ComponentFixture<InstituteDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), InstituteDetailsPage]
}).compileComponents();

    fixture = TestBed.createComponent(InstituteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
