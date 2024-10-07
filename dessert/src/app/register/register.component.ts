import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SharedDataService, UserObj } from '../shared-data.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, map, takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[SharedDataService]
})
export class RegisterComponent implements OnInit {
  formGroup:FormGroup;
  constructor(private formBuilder: FormBuilder,private dataService: SharedDataService,private http: HttpClient,private router:Router) {}
  componentDestroyed: Subject<boolean> = new Subject();
  public a: UserObj ;
  pwdShow=false;
  registerStatus = new BehaviorSubject<boolean>(false);

  // get formArray(): FormArray {
  //   return this.formGroup?.get('insuredList')! as FormArray;
  // }
  ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)],
          (control: AbstractControl) => this.usernameValidator(control)],//異步驗證器
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,this.passwordValidator]]
      });
    }

    passwordValidator(control: AbstractControl): { [key: string]: any } | null {
      const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(control.value);
      //test() 方法會檢查 control.value 是否符合正則表達式指定的標準。如果符合，test() 將返回 true，否則返回 false
      return valid ? null : { invalidPassword: true };
    }

    usernameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
      return this.http.get<boolean>(`http://localhost:8080/checkUsername?username=${control.value}`).pipe(
        debounceTime(300),
        map(usernameExists  => (usernameExists  ? { usernameTaken: true } : null)),
        catchError(() => of(null))// 在出現錯誤時，返回null代表沒有錯誤
      );
    }
    // usernameValidator(): AsyncValidatorFn {
    //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //     return this.http.get<boolean>(`http://localhost:8080/checkUsername?username=${control.value}`).pipe(
    //       debounceTime(300),
    //       map(isTaken => (isTaken ? { usernameTaken: true } : null)),
    //       catchError(() => of(null))
    //     );
    //   };
    // }

  // ngOnInit(): void {
  //   this.formGroup = this.formBuilder.group({
  //     insuredList: this.formBuilder.array([this.createInsuredItem()]),
  //   });
  // }
  // createInsuredItem(): FormGroup {
  //   return this.formBuilder.group({
  //     name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required]
  //   });
  // }
  getErrorMessage(controlName: string): string {
    let formControl= this.formGroup?.get(controlName);
    if (!formControl|| !formControl.errors || formControl.pristine) {
      return '';
    }
    let errorMessage: string = '';
    if (formControl.errors.required) {
        errorMessage = '此欄位必填';
    } else if (formControl.errors.minlength) {
        errorMessage = '姓名至少需六個字以上';
    } else if (formControl.errors.maxlength) {
        errorMessage = '姓名至多只能輸入十二個字';
    }else if (formControl.errors.email) {
        errorMessage = '請輸入有效的電子郵件地址';
    }
    else if (formControl.errors.invalidPassword) {
        errorMessage = '密碼必須包含至少一個大小寫英文字母和數字且長度為6~16碼';
    }
    else if (formControl.errors.usernameTaken) {
        errorMessage = '這個使用者名稱已被使用，請試試其他名稱';
    }
    return errorMessage!;
  }
  get isFormInvalid(): boolean {
    return this.formGroup!.invalid;
  }
  // get username(){
  //   console.log("name",this.formGroup.get('name'));
  //   return this.formGroup.get('name');}
  // get email(){return this.formGroup.get('email');}
  // get password(){return this.formGroup.get('password')}
  register(){
    // console.log(this.formGroup.value)
    this.a=this.formGroup.value;
    this.dataService.nextUserList(this.a);
    this.dataService.sharedUserArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
        this.a=queryParams;
    });
    console.log("a",this.a);
      let url="http://localhost:8080/createAccount";
      let body={
        "email":this.formGroup.value.email,
        "password":this.formGroup.value.password,
        "username":this.formGroup.value.name,
        "status":0,
        "resetPwd":0
      };
      this.http.post<number>(url,body).subscribe(res=>{
        if(res===0){
            alert('帳戶已經存在，請直接登入');
            this.router.navigate(['/login']);
        }
        else{
            alert('請至mail進行驗證');
        }
      });
    }
        // if (res) {
          // alert('註冊成功');
          // const date = new Date();
          // const result=(date, 'yyyy/MM/dd hh:mm:ss EEEE', 'zh-Hant-TW', '+0800');
          // console.log(result)
          // this.snackbar.open('登入成功', 'OK', { duration: 3000});
      // } else {
          // this.snackbar.open('請檢查使用者名稱及密碼', 'OK', {duration: 3000});
      // }
        // if (res.success) {
        //   this.loginStatus.next(true);
        // res.forEach(element => {
        //   console.log(element);
        // });


    // console.log(this.formGroup.value.insuredList[0].name);
    // console.log(this.formGroup.value.insuredList[0].email);
    // console.log(this.formGroup.value.insuredList[0].password);
    // this.dataService.setName(this.formGroup.value.insuredList[0].name);
    // this.dataService.setEmail(this.formGroup.value.insuredList[0].email);
    // this.dataService.setPassword(this.formGroup.value.insuredList[0].password);

}

