import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SoftwarePackagesComponent } from './software-packages.component';

describe('SoftwarePackagesComponent', () => {
  let component: SoftwarePackagesComponent;
  let fixture: ComponentFixture<SoftwarePackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SoftwarePackagesComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SoftwarePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
