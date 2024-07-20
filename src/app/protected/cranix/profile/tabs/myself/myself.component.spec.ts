import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { MyselfComponent } from './myself.component';

describe('MyselfComponent', () => {
  let component: MyselfComponent;
  let fixture: ComponentFixture<MyselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), MyselfComponent]
}).compileComponents();

    fixture = TestBed.createComponent(MyselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
