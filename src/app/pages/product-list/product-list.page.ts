import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  products:Array<any> = [0]

  constructor(private myhttp:HttpClient,private router:Router) { }

  ngOnInit() {
    this.myhttp.get("http://192.168.3.10:3000/product-list").subscribe((result:any)=>{
      this.products = result
    })
  }

  product_detail(i:string){
    sessionStorage.setItem("pid",i)
    this.router.navigateByUrl("/index/product-detail")
  }
}
