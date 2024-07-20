import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { AddOutgoingRuleComponent } from './add-outgoing-rule.component';

describe('AddOutgoingRuleComponent', () => {
  let component: AddOutgoingRuleComponent;
  let fixture: ComponentFixture<AddOutgoingRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), AddOutgoingRuleComponent]
}).compileComponents();

    fixture = TestBed.createComponent(AddOutgoingRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
