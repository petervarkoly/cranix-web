import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { RoomDevComponent } from './roomdev.component';

describe('RoomDevComponent', () => {
  let component: RoomDevComponent;
  let fixture: ComponentFixture<RoomDevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), RoomDevComponent]
}).compileComponents();

    fixture = TestBed.createComponent(RoomDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
