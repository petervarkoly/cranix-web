import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { ShowScreenshotComponent } from './show-screenshot.component';

describe('ShowScreenshotComponent', () => {
  let component: ShowScreenshotComponent;
  let fixture: ComponentFixture<ShowScreenshotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ShowScreenshotComponent]
}).compileComponents();

    fixture = TestBed.createComponent(ShowScreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
