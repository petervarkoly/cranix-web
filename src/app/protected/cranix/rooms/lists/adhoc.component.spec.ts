import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { AdhocComponent } from './adhoc.component';

describe('AdhocComponent', () => {
  let component: AdhocComponent;
  let fixture: ComponentFixture<AdhocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), AdhocComponent]
}).compileComponents();

    fixture = TestBed.createComponent(AdhocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
