import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class  HomeComponent {}
// implements OnInit {
  // title = 'dessert';
  // constructor(private http:HttpClient){}

  // getList(){
  //     let body={
  //         "student_id":"1"
  //     };
  //     let url="http://localhost:8080/applySelect";
  //     this.http.post<any>(url,body).subscribe(res=>{
  //         console.log(res);
  //     });
  // };
  // ngOnInit(): void {
  //   this.getList();
//   // }
// }
