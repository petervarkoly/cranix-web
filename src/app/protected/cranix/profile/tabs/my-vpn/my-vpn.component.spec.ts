import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { MyVPNComponent } from './my-vpn.component';

describe('MyVPNComponent', () => {
  let component: MyVPNComponent;
  let fixture: ComponentFixture<MyVPNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), MyVPNComponent]
}).compileComponents();

    fixture = TestBed.createComponent(MyVPNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
