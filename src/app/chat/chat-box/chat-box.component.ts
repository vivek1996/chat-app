import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  constructor(
    public Appservice: AppService,
    public Socketservice: SocketService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.receiverId = Cookie.get('receiverId');

    this.receiverName = Cookie.get('receiverName');
  }

  ngOnInit() {
    this.authToken = Cookie.get('authtoken');

    this.userInfo = this.Appservice.getUserInfoFromLocalstorage();

    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList();
  }
  public checkStatus: any = () => {
    if (
      Cookie.get('authtoken') === undefined ||
      Cookie.get('authtoken') === '' ||
      Cookie.get('authtoken') === null
    ) {
      this.router.navigate(['/']);

      return false;
    } else {
      return true;
    }
  }; // end checkStatus

  public verifyUserConfirmation: any = () => {
    this.Socketservice.verifyUser().subscribe(data => {
      this.disconnectedSocket = false;

      this.Socketservice.setUser(this.authToken);
      this.getOnlineUserList();
    });
  };

  public getOnlineUserList: any = () => {
    this.Socketservice.onlineUserList().subscribe(userList => {
      this.userList = [];

      // tslint:disable-next-line:forin
      for (const x in userList) {
        const temp = {
          userId: x,
          name: userList[x],
          unread: 0,
          chatting: false
        };
        this.userList.push(temp);
      }

      console.log(this.userList);
    });
  };
}
