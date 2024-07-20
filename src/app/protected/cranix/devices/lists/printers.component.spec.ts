import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { PrintersComponent } from './printers.component';

describe('PrintersComponent', () => {
  let component: PrintersComponent;
  let fixture: ComponentFixture<PrintersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), PrintersComponent]
}).compileComponents();

    fixture = TestBed.createComponent(PrintersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
