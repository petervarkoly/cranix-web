import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SystemAclsComponent } from './system-acls.component';

describe('SystemAclsComponent', () => {
  let component: SystemAclsComponent;
  let fixture: ComponentFixture<SystemAclsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SystemAclsComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SystemAclsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
