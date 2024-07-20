import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { RoomControlComponent } from './room-control.component';

describe('RoomControlComponent', () => {
  let component: RoomControlComponent;
  let fixture: ComponentFixture<RoomControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), RoomControlComponent]
}).compileComponents();

    fixture = TestBed.createComponent(RoomControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
