import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartObj, SharedDataService } from '../shared-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  public array: CartObj[] = [];
  constructor(private router:Router,private http:HttpClient,private dataService: SharedDataService) { }
  cnt=0;
  remove:boolean=false;
  dollar=0;
  ngOnInit(): void {

  this.http.post<String[]>("http://localhost:8080/serachIdAndCount",localStorage.getItem("email")).subscribe(
        res=>{
        this.http.post<CartObj[]>("http://localhost:8080/cartItemList",res).subscribe(res=>{
          this.array=res;
        })
      })
    }
    plus(item){
      item.count++;
      this.array[0].count=item.count;
    }
    minus(item){
      console.log(item.count);
      if(item.count>0){
        item.count--;
        this.array[0].count=item.count;
      }
      else{
        this.remove=true;
        console.log(this.remove);
      }

    }
    getTotalAmount(): number {
      return this.array.reduce((sum, item) => sum + (item.count * item.price), 0);
    }
    nextStep(){
      this.dataService.updateCart(this.array);
      this.router.navigate(['inform']);
    }
}
