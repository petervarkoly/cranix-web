import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { UnboundComponent } from './unbound.component';

describe('UnboundComponent', () => {
  let component: UnboundComponent;
  let fixture: ComponentFixture<UnboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), UnboundComponent]
}).compileComponents();

    fixture = TestBed.createComponent(UnboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
