import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyUserModel, MyResp } from '../MyUserModel';
@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.page.html',
  styleUrls: ['./my-user.page.scss'],
})

export class MyUserPage implements OnInit {
  url = 'http://localhost:8888/';
  userArr: MyUserModel[] = new Array<MyUserModel>();
  user: MyUserModel = new MyUserModel();
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadList();
  }
  showUser(u: MyUserModel) {
    this.user = u;
  }
  loadList() {
    this.http.get<MyResp>(this.url).subscribe(r => {
      console.log('r', r);

      let status = r.status;

      if (status === 1) {
        this.userArr = r.data;
      } else {
        console.log('error', r);

      }
    }, e => {
      console.log(e);

    })
  }
  update() {
    const path = '?id=' + this.user.id;
    if (this.user.id) {
      this.http.patch<MyResp>(this.url + path, this.user).subscribe(r => {
        console.log('r', r);
        const status = r.status;
        if (status === 1) {
          this.user = r.data;
        } else {
          console.log('error', r);

        }
      }, e => {
        console.log(e);

      });
    }

  }
  delete() {
    const path = '?id=' + this.user.id;
    this.http.delete<MyResp>(this.url + path).subscribe(r => {
      console.log('r', r);
      let status = r.status;
      if (status === 1) {
        this.user = r.data;
      } else {
        console.log('error', r);

      }
    }, e => {
      console.log(e);

    })
  }
  insert() {
    delete this.user.id;
    this.http.put<MyResp>(this.url, this.user).subscribe(r => {
      console.log('r', r);
      let status = r.status;
      if (status === 1) {
        this.user = r.data;
      } else {
        console.log('error', r);

      }
    }, e => {
      console.log(e);

    })
  }

}
