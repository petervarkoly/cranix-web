import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';

import { MailserverComponent } from './mailserver.component';

describe('MailserverComponent', () => {
  let component: MailserverComponent;
  let fixture: ComponentFixture<MailserverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), MailserverComponent]
}).compileComponents();

    fixture = TestBed.createComponent(MailserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
