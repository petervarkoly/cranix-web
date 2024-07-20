import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SoftwareStatusComponent } from './software-status.component';

describe('SoftwareStatusComponent', () => {
  let component: SoftwareStatusComponent;
  let fixture: ComponentFixture<SoftwareStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SoftwareStatusComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SoftwareStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
