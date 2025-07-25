import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ParentsService } from 'src/app/services/parents.service';
import { ParentTeacherMeeting, User } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
    selector: 'app-register-ptm',
  templateUrl: './register-ptm.component.html',
  styleUrl: './register-ptm.component.css'
})
export class RegisterPTMComponent implements OnInit {
  id: number
  selectedPTM: ParentTeacherMeeting
  student: User
  instituteName: string = ""

  constructor(
    private route: ActivatedRoute,
    private parentService: ParentsService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.instituteName = this.authService.session.instituteName;
    this.student = this.authService.session.user;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.parentService.getPTMById(this.id).subscribe(
      (val) => {
        this.selectedPTM = val
      }
    )
  }
}
