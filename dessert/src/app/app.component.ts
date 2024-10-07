import { FormGroup } from '@angular/forms';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;
import {  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {  ViewChildren, QueryList} from '@angular/core';
import { CartObj, SharedDataService } from './shared-data.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ProductObj } from './shared-data.service';
import { takeUntil } from 'rxjs/operators';
// import{ formGroup} from './register/register.component.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[SharedDataService]
})
export class AppComponent implements  OnInit{
// AfterViewInit {
  title = 'dessert';
  public firstLayer:Array<Object>=[];
  public secondLayer:Array<Object>=[];
  public thirdLayer:Array<Object>=[];
  // public product:Array<Object>=[];
  public product:ProductObj[]=[];
  public list:Array<Object>=[];
  public first_layer_ID: number = 999;
  public second_layer_ID: number = 999;
  public third_layer_ID: number = 999;
  public firstLayerIsShow:boolean=false;
  public secondLayerIsShow:boolean=false;
  public thirdLayerIsShow:boolean=false;
  public dropdownId: number = 999;
  @Input() isShow: boolean=false;
  public array: CartObj[] = [];
  listStatus:boolean=false;
  // @ViewChild('dropdownButton1') dropdownButton1: ElementRef;
  // 如果您有其他元素也需要捕捉，例如下拉選單的內容，則也使用 @ViewChild
  cartStatus: boolean=false;
  @ViewChild('dropdownButton1', { read: ElementRef }) dropdownButton1: ElementRef;
  @ViewChild('dropdownButton2', { read: ElementRef }) dropdownButton2: ElementRef;
  @ViewChild('dropdownButton3', { read: ElementRef }) dropdownButton3: ElementRef;

  // @ViewChild('dropdownButton1', { static: false }) dropdownButton1: ElementRef;
  // ngAfterViewInit(): void {
  //   this.addDropdownToggle(this.dropdownButton1);
  //   this.addDropdownToggle(this.dropdownButton2);
  //   this.addDropdownToggle(this.dropdownButton3);
  //   // this.addDropdownToggle(this.dropdownButton4);
  //   // this.DropdownToggle(this.dropdownButton2);
  // }
  // addDropdownToggle(dropdownButton: ElementRef) {
  //   const dropdownButtonElement = dropdownButton.nativeElement;
  //   const targetId = dropdownButtonElement.getAttribute('data-target');
  //   const dropdownMenuElement = document.getElementById(targetId);
  //   dropdownButtonElement.addEventListener('click', () => {
  //     dropdownMenuElement.classList.toggle('show');
  //   });
  // }
  // openMenu1(event: Event): void{
  //   this.firstLayerIsShow=!this.firstLayerIsShow;
  //   if(this.firstLayerIsShow){
  //     this.secondLayerIsShow = false;
  //     this.thirdLayerIsShow = false;
  //     this.listStatus = true;
  //   }
  //   event.stopPropagation();
  // }
  // @HostListener('document:click', ['$event'])
  // closeDroplist(event: Event): void {
  //   // 这里可以添加额外的逻辑来检查点击是否在购物车或其相关元素上发生
  //   // 如果点击发生在购物车外部，就关闭购物车
  //   this.listStatus = false;
  // }
  openMenu1(event: Event): void {
    this.firstLayerIsShow = !this.firstLayerIsShow;
    this.listStatus = true; // 顯示下拉選單
    if (this.firstLayerIsShow) {
      this.secondLayerIsShow = false;
      this.thirdLayerIsShow = false;
    }
    console.log("listStatus:"+this.listStatus);
    event.stopPropagation();
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    console.log("event.target",event.target);
    if (
      this.listStatus||(
      this.dropdownButton1 &&
      this.dropdownButton2 &&
      this.dropdownButton3 &&
      !this.dropdownButton1.nativeElement.contains(event.target) &&
      !this.dropdownButton2.nativeElement.contains(event.target) &&
      !this.dropdownButton3.nativeElement.contains(event.target))||
      this.cartStatus
    ) {
      this.listStatus = false;
      this.cartStatus = false;
      this.firstLayerIsShow = false;
      this.secondLayerIsShow = false;
      this.thirdLayerIsShow = false;
      console.log("false",this.listStatus);
    }
    console.log(this.listStatus);
  }

  openMenu2(event: Event, id: number): void {
    this.listStatus = true;
    if(this.first_layer_ID==id&&this.secondLayerIsShow){
      this.secondLayerIsShow = false;
    }else{
      this.secondLayerIsShow = true;
      this.thirdLayerIsShow = false;
    }
      this.first_layer_ID=id;
      let b = this.secondLayer.find(b=>{
        return b['firstLayerId'] === this.first_layer_ID
      });
      if(!b){
        console.log("導頁");
      }
      event.stopPropagation();
      // if(b){
      //   this.isShow2=!this.isShow2;
      //   if(this.isShow2){
      //     this.isShow3 = false;
      //   }
      // } else{
      //   console.log("導頁");
      // }

  }
  openMenu3(event: Event,id1: number,id2: number){
    this.listStatus = true;
    if(this.second_layer_ID === id1 && this.thirdLayerIsShow) {
      this.thirdLayerIsShow = false;
    } else {
      this.thirdLayerIsShow=true;
    }
    this.second_layer_ID=id1;
    this.dropdownId=id2;
    // 有沒有第三層資料
    let c = this.thirdLayer.find(c=>{
      return c['firstLayerId'] === this.first_layer_ID&& c['secondLayerId'] === this.second_layer_ID
    });
    if(!c){
        this.thirdLayerIsShow = false;
        console.log("dropdownId:"+c);
        // console.log('導頁,'+"firstLayerId:"+c['firstLayerId']+",name:"+c['name']+",dropdownId:"+this.dropdownId);
        console.log('導頁');
        this.openPage(this.dropdownId);
        this.listStatus = false;
    }
    event.stopPropagation();
  }
  openPage(id){
    this.dropdownId=id;
    // console.log("dropdownId:"+this.dropdownId);
    // console.log('導頁');
    // let p = this.product.find(p=>{
    //   if(p['dropdownId']===this.dropdownId){
    //     this.obj={img:p['img'],price:p['price'],name:p['productName']}
    //     // this.list.push(this.obj);
    //     console.log("sharedArray:",this.dataService.sharedArray);
    //     // console.log("obj",this.obj);
    //     this.dataService.sharedArray.push(this.obj);
    //   }
    //     return ;
    // })
    this.product=[];
    // this.dataService.sharedArray.length=0;
    this.dataService.clearSharedArray();

    let body={
      "dropdownId":this.dropdownId
    };
    let url="http://localhost:8080/applyProduct";
    this.http.post<ProductObj[]>(url,body).subscribe(res=>{
      // console.log(res);
      res.forEach(element => {
        // this.obj={img:element['img'],price:element['price'],name:element['productName']}
        this.product.push({img:element['img'],price:element['price'],productName:element['productName'],productId:element['productId']});
      });
      // console.log("product",this.product);
      console.log(this.product)
      this.dataService.nextQueryResultList(this.product);
      this.router.navigate(['/product']);
      // console.log("sharedArray",this.dataService.sharedArray);
    });

  }

  // /兩層
  // @ViewChildren('dropdownButton') dropdownButtons: QueryList<ElementRef>;
  // ngAfterViewInit(): void {
  //   this.dropdownButtons.forEach(dropdownButton => {
  //     const dropdownButtonElement = dropdownButton.nativeElement;
  //     const targetId = dropdownButtonElement.getAttribute('data-target');
  //     const dropdownMenuElement = document.getElementById(targetId);
  //     dropdownButtonElement.addEventListener('click', () => {
  //       dropdownMenuElement.classList.toggle('show');
  //     });
  //   });
  // }

  // @ViewChild('dropdownButton', { static: false }) dropdownButton: ElementRef;
  // ngAfterViewInit(): void {
  //   const dropdownButtonElement = this.dropdownButton.nativeElement;
  //   const targetId = dropdownButtonElement.getAttribute('data-target');
  //   const dropdownMenuElement = document.getElementById(targetId);
  //   dropdownButtonElement.addEventListener('click', () => {
  //     dropdownMenuElement.classList.toggle('show');
  //   });
  // }
// }

//   @ViewChild('navbarToggler', { static: false }) navbarToggler: ElementRef;
// // implements OnInit {
//   ngAfterViewInit(): void {
//     // 啟用 Bootstrap 的 JavaScript 功能
//     // 如果你需要使用下拉選單的彈出，需要進行這樣的設置
//     const navbarTogglerElement = this.navbarToggler.nativeElement;
//     const targetId = navbarTogglerElement.getAttribute('data-target');
//     const targetElement = document.getElementById(targetId);
//     navbarTogglerElement.addEventListener('click', () => {
//       targetElement.classList.toggle('show');
//     });
//   }
constructor(private http:HttpClient,private dataService: SharedDataService,private router: Router){
  // this.dataService.sharedArray.push(this.list);
  // console.log("this.dataService.sharedArray"+this.dataService.sharedArray);
  this.dataService.cartShowStatus.subscribe(status => {
    this.cartStatus = status;
    console.log("status:"+status);
    // if (status) {
    //   this.cartShow();
    // }
  });
}

  getList(){
      let body={
        //  "firstLayerId":"1",
          // "secondLayerId":"0"
      };
      let url="http://localhost:8080/applySelect";
      this.http.post<any>(url,body).subscribe(res=>{
          res.forEach(element => {
            if(element.secondLayerId===0&&element.thirdLayerId===0){
              this.firstLayer.push(element);
            }
            if(element.secondLayerId!==0&&element.thirdLayerId===0){
              this.secondLayer.push(element);
            }
            if(element.firstLayerId!==0&&element.secondLayerId!==0&&element.thirdLayerId!==0){
              this.thirdLayer.push(element);
            }
          });
          // this.p1=(this.firstLayer[0]['name']);
          // this.p2=(this.firstLayer[1]['name']);

          // let product1:String=(listA[0]).firstLayerName;
          // let o1 = Object.entries(product1);
          // console.log(o1);
          // this.p1=o1[4][1];
          // this.p2=o2[4][1];
          // console.log(this.p1);
          // console.log(this.p2);
      });
  };
  getProduct(){
    let body={
      //  "firstLayerId":"1",
        // "secondLayerId":"0"
    };
    let url="http://localhost:8080/applyProduct";
    this.http.post<any>(url,body).subscribe(res=>{
      // console.log(res);
      // res.forEach(element => {
      //   this.product.push(element);
      // });
      // console.log(this.product);
    });
  }
  getUser(){
    // let name = this.dataService.getName();
    console.log("name",this.dataService.nextUserList['name']);
    // let email = this.dataService.getEmail();
    // console.log("email",email);
    // let ps = this.dataService.getPassword();
    // console.log("ps",ps);
    // let body={
    //   "email":name,
    //   "passeord":email,
    //   "username":ps
    // };
    // let url="http://localhost:8080/applyCreate";
    // this.http.post<any>(url,body).subscribe(res=>{

    // })
  }
  ngOnInit(): void {
    this.getList();
    this.getUser();
    this.dataService.sharedcartItemArray.subscribe(data => {
      this.array = data;
  });

    // this.getProduct();
    // this.dataService.sharedcartItemArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
    //   // 訂閱了由SharedDataService發出的資料。這是通過使用dataService.sharedSharedArray來實現的，這個Observable在資料變化時會觸發。
    //   // pipe(takeUntil(this.componentDestroyed))來確保當ProductComponent被摧毀（例如由於路由更改）時，這個訂閱會被取消。這是為了防止記憶體洩露。
    //   // componentDestroyed:是一個Subject，當你希望結束所有的Observable訂閱時，你可以通過發出一個值來觸發它
    //   this.array=queryParams;
    //   console.log("array:"+this.array)
    // })

  }

  cartShow(event: Event): void{
      this.http.post<String[]>("http://localhost:8080/serachIdAndCount",localStorage.getItem("email")).subscribe(
        res=>{
        this.http.post<CartObj[]>("http://localhost:8080/cartItemList",res).subscribe(res=>{
          this.array=res;
        })
      })
      // this.array=this.dataService.sharedcartItemArray
      this.cartStatus=!this.cartStatus;
      event.stopPropagation();
  // this.isShow=!this.isShow;
  }
  //使用HostListener监听全局点击事件
  //當用戶點擊頁面的任何位置時，都可以捕獲這個事件。
  //然後，檢查點擊事件是否發生在「商品」按鈕或下拉選單上，如果不是，就設置 listStatus 為 false。
  // @HostListener('document:click', ['$event'])
  // closeCart(event: Event): void {
  //   // 这里可以添加额外的逻辑来检查点击是否在购物车或其相关元素上发生
  //   // 如果点击发生在购物车外部，就关闭购物车
  //   this.cartStatus = false;
  //   // this.listStatus = false;
  // }
  checkOut(){
    console.log("changetopage")
    this.router.navigate(['/check-out']);
  }
  deleteProduct(event: Event,name){
    this.http.post<String>("http://localhost:8080/serachIdByName",name).subscribe(
        res=>{
          let body={
              "id":res,
              "email":localStorage.getItem("email")
          }
        this.http.post<CartObj[]>("http://localhost:8080/deleteCartItem",body).subscribe(res=>{
          this.cartStatus=true;
          this.array=res;
          console.log("array:",this.array);

        })
        event.stopPropagation();
        console.log(res);
      })
  }
}

