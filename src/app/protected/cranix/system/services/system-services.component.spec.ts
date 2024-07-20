import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SystemServicesComponent } from './system-services.component';

describe('SystemServicesComponent', () => {
  let component: SystemServicesComponent;
  let fixture: ComponentFixture<SystemServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SystemServicesComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SystemServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
