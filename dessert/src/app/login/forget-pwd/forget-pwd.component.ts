import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {

  formGroup:FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    this.formGroup=this.formBuilder.group({email:['',[Validators.required,Validators.email]]});
  }
  getErrorMessage(controlName:string):string{
    let formcontrol=this.formGroup.get(controlName);
    if(!formcontrol||!formcontrol.errors||formcontrol.pristine){
      return '';
    }
    else if(formcontrol.errors.required){
      return '此欄位必填';
    }
    else if(formcontrol.errors.email){
      return '請輸入有效的電子郵件地址';
    }
    return '';
  }

  forgetPwd(){
    let body={"email":this.formGroup.value.email};
    this.http.post("http://localhost:8080/forgetPwd",body,{responseType: 'text'}).subscribe(
      response => {
        console.log("Success", response);
        alert('請至電子信箱收信');
      },
      error => {
        console.error("Error:", error);
        alert('找不到此電子信箱');
      }
  )};
}
