import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  products = [0]

  cart = [
    { pid:1,
      pname:"Xenoblade Chronicles 2",
      pclass:"Video Game",
      pprice:76.62,
      pqty:100,
      pimg:[
        "../../assets/productsImg/xenoblade2_1.jpeg",
        "../../assets/productsImg/xenoblade2_2.jpeg"
      ],
      pdescrip:"nintendo switch game",
      orderqty: 1,
    },
    { pid:2,
      pname:"Xenoblade Chronicles 2",
      pclass:"Video Game",
      pprice:76.62,
      pqty:100,
      pimg:[
        "../../assets/productsImg/xenoblade2_1.jpeg",
        "../../assets/productsImg/xenoblade2_2.jpeg"
      ],
      pdescrip:"nintendo switch game",
      orderqty: 2,
    },
    { pid:3,
      pname:"Xenoblade Chronicles 2",
      pclass:"Video Game",
      pprice:76.62,
      pqty:100,
      pimg:[
        "../../assets/productsImg/xenoblade2_1.jpeg",
        "../../assets/productsImg/xenoblade2_2.jpeg"
      ],
      pdescrip:"nintendo switch game",
      orderqty: 1,
    }
  ]


  constructor(private myhttp:HttpClient,private router:Router) { }

  ngOnInit() {
    this.myhttp.get("http://192.168.3.10:3000/product-list").subscribe((result:any)=>{
      this.products = result
    })
  }

  product_detail(i){
    sessionStorage.setItem("pid",i)
    this.router.navigateByUrl("/index/product-detail")
  }

}
