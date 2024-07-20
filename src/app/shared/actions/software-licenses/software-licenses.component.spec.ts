import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { SoftwareLicensesComponent } from './software-licenses.component';

describe('SoftwareLicensesComponent', () => {
  let component: SoftwareLicensesComponent;
  let fixture: ComponentFixture<SoftwareLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), SoftwareLicensesComponent]
}).compileComponents();

    fixture = TestBed.createComponent(SoftwareLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
