import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  formGroup:FormGroup ;

  constructor(private  formBuilder:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
      this.formGroup=this.formBuilder.group({
        // account:['test'],
        password:['',[Validators.required,this.passwordValidator]],
        confirmPassword:['',[Validators.required,,this.passwordValidator]]
      },{ validator: this.passwordMatcher });
  }
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(control.value);
    //test() 方法會檢查 control.value 是否符合正則表達式指定的標準。如果符合，test() 將返回 true，否則返回 false
    return valid ? null : { invalidPassword: true };
  }
  passwordMatcher(control: AbstractControl):{[key:string]:boolean}|null{
    let passwordField = control.get('password');
    let confirmPasswordField =control.get('confirmPassword');
    if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
      //確保兩個控制項都存在（非null），然後確保它們的值不相等
        return { 'match': true };
    }
    return null;
  }
  getErrorMessage(controlName:string):string{
    let control=this.formGroup.get(controlName);
    if (!control || control.pristine) {
      return '';
    }
    if (control.errors) {
      if (control.errors.required) {
          return '此欄位必填';
      }
      if(control.errors.invalidPassword) {
          return'密碼必須包含至少一個大小寫英文字母和數字且長度為6~16碼';
      }
    }
    // 如果上述錯誤都沒有觸發，然後檢查整個表單的匹配錯誤
    if (this.formGroup.errors?.match && controlName === 'confirmPassword') {
      return '密碼和確認密碼不相符';
    }
    return '';
  }
  get isFormInvalid():boolean{
    return this.formGroup!.invalid;
  }
  revisePassword(){
      console.log(window.location.href);
      let url=window.location.href;
      let sliced=url.slice(42);
      console.log(sliced);
      let body={"username":sliced,"password":this.formGroup.value.password};
      console.log(body);

      this.http.post("http://localhost:8080/updateResetPwdStatus",{"username":sliced},{responseType:'text'}).subscribe(
        response =>{
          this.http.post("http://localhost:8080/resetPwd",body,{responseType:'text'}).subscribe(
            response => {
              console.log("change password ", response);
              alert('更改密碼成功');
            },
            error=>{
              console.error("change password ", error);
              alert('更改密碼失敗');
            }
          )
        }
      )
      }
}
