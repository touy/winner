import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiserviceService} from './apiservice.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private apiservice: ApiserviceService){

  }
  title = 'winner';
  description =' winner app';
  employees:any[] = [];
  changeDescription(){
    this.description = ' description has been changed';
  }
  getPageFromWinner(){
    this.apiservice.getPageFromWinner('http://dummy.restapiexample.com/api/v1/employees').subscribe(res => {
      console.log(res);
      this.employees = res['data'];
      console.log('employees',this.employees);
      
  });
  }
}
