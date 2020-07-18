import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  user: UserModel = new UserModel();
  userArray: Array<UserModel> = new Array<UserModel>();
  url = 'http://localhost:3434/';
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.listUser();
  }
  // list users
  listUser() {
    const path = 'users';
    this.http.get<UserModel[]>(this.url + path).subscribe(r => {
      console.log('r list user', r);

      this.userArray = r;
    },
      e => {
        alert(e);
      });
  }
  // user info
  userInfo(id: string) {
    const path = 'user/' + id;
    this.http.post<UserModel>(this.url + path, {}).subscribe(r => {
      console.log('r user info', r);

      this.user = r;
    },
      e => {
        alert(e);
      });
  }
  // create user 
  createUser() {
    const path = 'user';
    delete this.user.id;
    this.http.put<UserModel>(this.url + path, this.user).subscribe(r => {
      console.log('r user info', r);
      this.user = r;
      this.listUser();
    },
      e => {
        alert(e);
      });
  }
  // update user 
  updateUser() {
    const path = 'user';
    if (this.user.id) {
      this.http.patch<UserModel>(this.url + path, this.user).subscribe(r => {
        console.log('r user info', r);

        this.user = r;
        this.listUser();
      },
        e => {
          alert(e);
        });
    
    }
    else {
      alert('please select on the list')
    }
  }
  // delete user
  deleteUser() {

  }

}
