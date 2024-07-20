import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { AddRemoteRuleComponent } from './add-remote-rule.component';

describe('AddRemoteRuleComponent', () => {
  let component: AddRemoteRuleComponent;
  let fixture: ComponentFixture<AddRemoteRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), AddRemoteRuleComponent]
}).compileComponents();

    fixture = TestBed.createComponent(AddRemoteRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
