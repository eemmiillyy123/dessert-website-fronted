import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartObj, OrderObj, SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  public array: CartObj[] = [];
  orderArray:OrderObj[]=[];
  constructor(private dataService: SharedDataService,private router:Router,private http:HttpClient) { }
  componentDestroyed: Subject<boolean> = new Subject();
  ngOnInit(): void {
    // this.http.post<String[]>("http://localhost:8080/serachIdAndCount",localStorage.getItem("email")).subscribe(
    //     res=>{
    //     this.http.post<CartObj[]>("http://localhost:8080/cartItemList",res).subscribe(res=>{
    //       this.array=res;
    //     })
    //   })
    this.dataService.sharedcartItemArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
      this.array=queryParams;
    })
      this.dataService.orderArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
        this.orderArray=queryParams;
      })
      console.log(this.orderArray[0].name);

  }
  getTotalAmount(): number {
    return this.array.reduce((sum, item) => sum + (item.count * item.price), 0);
  }
  goBack(){
    // this.router.navigate(['../']);
    window.history.back();
  }
  changeToMyOrder(){
    this.router.navigate(['my-order']);
  }
}
