import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;
  constructor(
    private toastr: ToastrService,
    public router: Router,
    public appService: AppService
  ) {}

  ngOnInit() {}
  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  };

  public signupFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning('enter first name');
    } else if (!this.lastName) {
      this.toastr.warning('enter last name');
    } else if (!this.mobile) {
      this.toastr.warning('enter mobile');
    } else if (!this.email) {
      this.toastr.warning('enter email');
    } else if (!this.password) {
      this.toastr.warning('enter password');
    } else if (!this.apiKey) {
      this.toastr.warning('Enter your API key');
    } else {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      };

      console.log(data);

      this.appService.signUp(data).subscribe(
        apiResponse => {
          console.log(apiResponse);

          if (apiResponse.status === 200) {
            this.toastr.success('Signup successful');

            setTimeout(() => {
              this.goToSignIn();
            }, 2000);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        err => {
          this.toastr.error('some error occured', err);
        }
      );
    } // end condition
  };
}
