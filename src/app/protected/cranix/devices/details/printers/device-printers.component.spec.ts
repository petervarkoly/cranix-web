import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { DevicePrintersComponent } from './device-printers.component';

describe('DevicePrintersComponent', () => {
  let component: DevicePrintersComponent;
  let fixture: ComponentFixture<DevicePrintersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), DevicePrintersComponent]
}).compileComponents();

    fixture = TestBed.createComponent(DevicePrintersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
