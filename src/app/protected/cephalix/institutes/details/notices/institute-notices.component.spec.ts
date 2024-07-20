import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { InstituteNoticesComponent } from './institute-notices.component';

describe('InstituteNoticesComponent', () => {
  let component: InstituteNoticesComponent;
  let fixture: ComponentFixture<InstituteNoticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), InstituteNoticesComponent]
}).compileComponents();

    fixture = TestBed.createComponent(InstituteNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
