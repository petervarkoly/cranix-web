import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SystemAddonsComponent } from './system-addons.component';

describe('SystemAddonsComponent', () => {
  let component: SystemAddonsComponent;
  let fixture: ComponentFixture<SystemAddonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SystemAddonsComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SystemAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
