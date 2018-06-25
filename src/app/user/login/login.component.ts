import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  constructor(
    private toastr: ToastrService,
    public router: Router,
    public appService: AppService
  ) {}

  ngOnInit() {}
  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  };

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning('enter email');
    } else if (!this.password) {
      this.toastr.warning('enter password');
    } else {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.appService.signIn(data).subscribe(
        apiResponse => {
          if (apiResponse.status === 200) {
            console.log(apiResponse);

            Cookie.set('authtoken', apiResponse.data.authToken);

            Cookie.set('receiverId', apiResponse.data.userDetails.userId);

            Cookie.set(
              'receiverName',
              apiResponse.data.userDetails.firstName +
                ' ' +
                apiResponse.data.userDetails.lastName
            );

            this.appService.setUserInfoInLocalStorage(
              apiResponse.data.userDetails
            );

            this.router.navigate(['/chat']);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        err => {
          this.toastr.error('some error occured');
        }
      );
    } // end condition
  };
}
