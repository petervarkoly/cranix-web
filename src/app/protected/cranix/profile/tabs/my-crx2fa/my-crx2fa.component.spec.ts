import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { MyCrx2faComponent } from './my-crx2fa.component';

describe('MyCrx2faComponent', () => {
  let component: MyCrx2faComponent;
  let fixture: ComponentFixture<MyCrx2faComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), MyCrx2faComponent]
}).compileComponents();

    fixture = TestBed.createComponent(MyCrx2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
