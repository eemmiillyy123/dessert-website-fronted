import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';// BehaviorSubject 是用來呈現當前的值，會記住最新一次發送的元素，並把該元素當作目前的值
export interface ProductObj {
  img: string;
  productName: string;
  price: number;
  productId:number
}
export interface UserObj {
  name: string;
  email: string;
  password: string;
  registerTime:Date;
  status:Number;
}
export interface DescriptionObj{
  img: string;
  productName: string;
  price: number;
  productId:number;
  description:string;
  introduction:string;
  status:number;
  dropdownId:number;
}
export interface CartObj{
  img:string;
  productName: string;
  price: number;
  count:number;
}
export interface OrderObj{
  orderNumber:number;
  name:string;
  phoneNumber:string;
  site:string;
  deliveryMethod:string;
  paymentMethod:string;
  deliveryDate:string;
  note:string;
}
@Injectable()
export class SharedDataService {
  private sharedArray = new BehaviorSubject<ProductObj[]>(null)//初始值為null
  private userArray = new BehaviorSubject<UserObj>(null)//初始值為null
  private productDataSource = new BehaviorSubject<DescriptionObj[]>(null);
  private cartItemArray = new BehaviorSubject<CartObj[]>(null);
  private showStatus = new Subject<boolean>();
  private orderInformationArray=new BehaviorSubject<OrderObj[]>(null);

  sharedSharedArray = this.sharedArray.asObservable();
  sharedUserArray = this.userArray.asObservable();
  currentProductData = this.productDataSource.asObservable();
  sharedcartItemArray = this.cartItemArray.asObservable();
  cartShowStatus = this.showStatus.asObservable();
  orderArray=this.orderInformationArray.asObservable();

  constructor() { }
  nextQueryResultList(sharedArray:ProductObj[]|[]){//允許外部元件傳入一個新陣列，然後更新sharedArray的值
    this.sharedArray.next(sharedArray);
  }
  nextUserList(userArray:UserObj){
    this.userArray.next(userArray);
  }

  updateProductData(data: DescriptionObj[]|[]) {
    this.productDataSource.next(data);
  }

  updateCart(data: CartObj[]|[]) {
    this.cartItemArray.next(data);
  }

  updateOrder(data: OrderObj[]|[]) {
    this.orderInformationArray.next(data);
  }

  clearSharedArray() {//清空陣列
    // this.sharedArray = new BehaviorSubject<any[]>(null);
    // this.sharedArray.next(<Obj[]>(null));
    this.sharedArray.next([]);
    console.log(this.sharedArray);
  }

  toggleCartShow(status: boolean) {
    this.showStatus.next(status);
  }

}
