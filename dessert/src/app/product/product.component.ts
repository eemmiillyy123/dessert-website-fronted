import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;
import { DescriptionObj, SharedDataService } from '../shared-data.service';
import { Subject } from 'rxjs';
import { ProductObj } from '../shared-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class  ProductComponent implements OnInit {
  // public arrayFromApp: any[] = [];
  public array: ProductObj[] = [];


  constructor(private dataService: SharedDataService,private http:HttpClient) { }

  componentDestroyed: Subject<boolean> = new Subject();
  ngOnInit() {
    // this.arrayFromApp = this.dataService.sharedArray;
    this.dataService.sharedSharedArray.pipe(takeUntil(this.componentDestroyed)).subscribe(queryParams=>{
      // 訂閱了由SharedDataService發出的資料。這是通過使用dataService.sharedSharedArray來實現的，這個Observable在資料變化時會觸發。
      // pipe(takeUntil(this.componentDestroyed))來確保當ProductComponent被摧毀（例如由於路由更改）時，這個訂閱會被取消。這是為了防止記憶體洩露。
      // componentDestroyed:是一個Subject，當你希望結束所有的Observable訂閱時，你可以通過發出一個值來觸發它
      this.array=queryParams;
      console.log("array:"+this.array)
      //當資料更新時，將回傳的資料指定給arrayFromApp。
    })

  }
  description(id:number){
    this.http.post<DescriptionObj[]>("http://localhost:8080/showProductDescription",{productId:id}).subscribe(
      // res=>{
      //     console.log("img:"+res.img)
      // })
      res=>{
        res.forEach(item => {
          console.log("productName:", item.productName);
        });
        // 在取得API響應後
        this.dataService.updateProductData(res);

      });
  }
}

