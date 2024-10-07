import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DescriptionObj, SharedDataService ,CartObj} from 'src/app/shared-data.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  productData: DescriptionObj[] = [];
  isHeartFilled = false;
  count=1;
  cartArray:CartObj[];
//   constructor(private dataService: SharedDataService) {
//     this.dataService.currentProductData.subscribe(data => this.productData = data);
// }
  constructor(private dataService: SharedDataService,private http:HttpClient) { }
  componentDestroyed: Subject<boolean> = new Subject();
  ngOnInit() {
    this.dataService.currentProductData.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
      this.productData=queryParams;
    })
    console.log("productData:"+this.productData)
  }
  heartFilled(){
    this.isHeartFilled=!this.isHeartFilled;
  }
  plus(){
    this.count=this.count+1;
  }
  minus(){
    this.count=this.count-1;
  }
  addToCart(){
  //   console.log(this.productData[0].productId);
  //   console.log(this.count);
  //   console.log(localStorage.getItem('email'));
    let param = {
      email:localStorage.getItem('email'),
      id:this.productData[0].productId,
      count:this.count
    }

    this.http.post<String[]>("http://localhost:8080/cartProductList",param).subscribe(
      res=>{
          console.log("res:"+res);
          this.http.post<CartObj[]>("http://localhost:8080/cartItemList",res).subscribe(
            success=>{
              this.dataService.updateCart(success);
              console.log("success:"+success);
            }
          )
          this.dataService.toggleCartShow(true);
          // this.cartArray.push();
      });
      console.log("cartShowStatus:"+this.dataService.cartShowStatus);
  }
}
