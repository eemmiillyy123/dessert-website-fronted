import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderObj, SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-inform',
  templateUrl: './inform.component.html',
  styleUrls: ['./inform.component.scss']
})
export class InformComponent implements OnInit {
  formGroup:FormGroup;
  payAndSendGroup:FormGroup;
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router:Router,private dataService: SharedDataService) {}
  minDate: string;
  email:string;
  isChecked=false;
  receiverName:string='';
  receiverPhoneNumber:string='';
  receiverSite:string='';
  orderArray:OrderObj[]=[];

  ngOnInit(): void {
    this.email=localStorage.getItem('email');
    const today = new Date();
    this.minDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    this.formGroup=this.formBuilder.group({
      name:['',[Validators.required]],
      phoneNumber:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      site:['',[Validators.required]]
    })
    this.payAndSendGroup=this.formBuilder.group({
      deliveryMethod:['',[Validators.required]],
      paymentMethod:['',[Validators.required]],
      deliveryDate:['',[Validators.required]],
      note: ['']
    })

  }
  getErrorMessage(controlName:string):string{
    let formControl=this.formGroup.get(controlName);
    if(!formControl||!formControl.errors||formControl.pristine){
      return '';
    }
    let errorMessage: string = '';
    if(formControl.errors.required){
      return '此欄位必填';
    }
    if(formControl.errors.pattern){
      return '手機號碼必須為0-9的10碼數字';
    }
  }

  get isFormInvalid(): boolean {
    return this.formGroup!.invalid||this.payAndSendGroup!.invalid;
  }

  setorder(){
    let a:OrderObj;
    a={'orderNumber':1,name:this.formGroup.value.name,'phoneNumber':this.formGroup.value.phoneNumber,'site':this.formGroup.value.site,'deliveryMethod':this.payAndSendGroup.value.deliveryMethod,'paymentMethod':this.payAndSendGroup.value.paymentMethod,'deliveryDate':this.payAndSendGroup.value.deliveryDate,'note':this.payAndSendGroup.value.note};
    console.log("a:",a);
    console.log(this.formGroup.value.name);

    this.orderArray.push(a);
    console.log(this.orderArray);
    this.dataService.updateOrder(this.orderArray);
  }
  // ngOnInit(): void {
  //   this.setMinDateForInput();
  // }
  // today = new Date();
  // setMinDateForInput(): void {

  //   const formattedDate = `${this.today.getFullYear()}-${(this.today.getMonth() + 1).toString().padStart(2, '0')}-${this.today.getDate().toString().padStart(2, '0')}`;
  //   const dateInput = document.getElementById('exampleDate') as HTMLInputElement;
  //   dateInput.setAttribute('min', formattedDate);
  // }

  checkckecked(){
    if(this.isChecked){
      this.isChecked=false;
      this.receiverName='';
      this.receiverPhoneNumber='';
      this.receiverSite='';
    }else{
      this.isChecked=true;
      console.log('name'+this.formGroup.value.name);
      this.receiverName=this.formGroup.value.name;
      this.receiverPhoneNumber=this.formGroup.value.phoneNumber;
      this.receiverSite=this.formGroup.value.site;
    }
  }
  goBack(){
    // this.router.navigate(['../']);
    window.history.back();
  }
  nextStep(){
    console.log(this.formGroup.value);
    console.log(this.payAndSendGroup.value);
    this.router.navigate(['confirm-order']);
    this.setorder();
  }
}
