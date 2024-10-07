import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { SharedDataService, UserObj } from '../shared-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[SharedDataService]
})
export class  LoginComponent implements OnInit{
  formGroup:FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router:Router) {}
  componentDestroyed: Subject<boolean> = new Subject();
  public a: UserObj ;
  user:any={}

  ngOnInit(): void {
      this.formGroup=this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
  }
  getErrorMessage(controlName:string):string{
    let formControl=this.formGroup.get(controlName);
    if(!formControl||!formControl.errors||formControl.pristine){
      return "";
    }
    if(formControl.errors.required){
      return '此欄位必填';
    }
    else if(formControl.errors.email){
      return '請輸入有效的電子郵件地址';
    }
    return '';
  }
  get isFormInvalid(): boolean {
    return this.formGroup!.invalid;
  }
  login(){
    // this.a=this.formGroup.value;
    // this.dataService.nextUserList(this.a);
    // this.dataService.sharedUserArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
    //     this.a=queryParams;
    // });
    let body={
      "email":this.formGroup.value.email,
      "password":this.formGroup.value.password,
    };
      this.http.post<number>("http://localhost:8080/chekAccountCreated",body).subscribe(res=>{
      if(res===1){
        localStorage.setItem('email',this.formGroup.value.email);
        this.user=this.formGroup.value;
        alert('登入成功');
        this.http.post("http://localhost:8080/findUsernameByEmail",{"email":this.formGroup.value.email},{responseType:'text'}).subscribe(res=>
        {
          console.log("res:"+res);
          this.user.username=res;
          localStorage.setItem('name',this.user.username);
        })
        // this.router.navigate(['/home']);
      }
      else if(res===0){
          alert('請先至email進行驗證');
      }
      else{
        alert('請輸入正確的帳號密碼');
      }
      })

    }
  isLogin(){//是否已經登入
    this.user.username=localStorage.getItem('name');
    this.user.email=localStorage.getItem('email');
    return localStorage.getItem('email')!=null;

  }
  logout(){//登出
    localStorage.removeItem('email');
  }
  selectedSection: string = 'memberInfo'; // 默认显示会员信息部分
  selectSection(section: string) {
    this.selectedSection = section;
  }

  isSectionSelected(section: string): boolean {
    return this.selectedSection === section;
  }
  changePageToUpdatePassword(){
    this.http.post("http://localhost:8080/encrypt",this.user.username=localStorage.getItem('name') ,{responseType:'text'}).subscribe(
      res=>{
        console.log("res:"+res);
        this.router.navigate(['/updatePassword'], { queryParams: {name:res} });
      })

  }
  saveChange(){
    // this.http.post("http://localhost:8080/chekAccountCreated").subscribe({

    // })
  }

}
