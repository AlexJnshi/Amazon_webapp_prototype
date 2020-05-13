import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    private myhttp:HttpClient,
    private router:Router
    ) { }

  uid = sessionStorage.getItem("uid")
  isCartEmpty:boolean = true
  Itemqty:number = 0
  totalPrice:number = 0
  cart:Array<any> = [0]

  //  If cart is empty, set isCartEmpty as true, which will show user empty img.
  //  Calculate total Price and total quantity.
  ngOnInit() {
    let url = "http://192.168.3.10:3000/cart?uid="+this.uid
    this.myhttp.get(url).subscribe((result:any)=>{
      this.cart = result
      if(result.length==0){
        this.isCartEmpty=true
      }else{
        this.isCartEmpty=false
        for(let i=0;i<this.cart.length;i++){ 
          this.totalPrice += this.cart[i].price*this.cart[i].count
          this.Itemqty +=this.cart[i].count
        }
      }
    })
  }

  //  Update item quantity and total price when user adjust cart.
  itemQtyAndPriceUpdate(){
    this.totalPrice = 0
    this.Itemqty = 0
    for(let i=0;i<this.cart.length;i++){ 
      this.totalPrice += this.cart[i].price*this.cart[i].count
      this.Itemqty +=this.cart[i].count
    }
  }

  //  Iterate through the entire cart, if user adjust all items quntity as 0,
  //  that is means cart is empty, so set isCartEmpty as true. 
  isEmpty(){
    let tem = 0
    for(let key=0;key<this.cart.length;key++){
       tem += Number(this.cart[key].count)
    }
    if(tem == 0){
      this.isCartEmpty = true
    }
  }

  updateCount(i){
    let pid = this.cart[i].pid
    let url = "http://192.168.3.10:3000/cart/update?uid="+this.uid+"&pid="+pid+"&count="+this.cart[i].count
    this.myhttp.get(url).subscribe()
    this.itemQtyAndPriceUpdate()
  }
  
  cart_plus_btn(i){
    this.cart[i].count++
    this.updateCount(i)
  }

  cart_minus_btn(i){
    if(this.cart[i].count>1){
      this.cart[i].count--
      this.updateCount(i)
    }else if(this.cart[i].count==1){
      this.cart[i].count--
      console.log(this.cart[i].count)
      this.updateCount(i)
      // cart count ==0 means delete this item so hide this item
      document.getElementById(`cart-item-sliding-${i}`).style.display="none"
      this.isEmpty()
    }
    this.itemQtyAndPriceUpdate()
  }

  cart_item_delete_btn(i){
    this.cart[i].count = 0
    this.updateCount(i)
    this.itemQtyAndPriceUpdate()
    document.getElementById(`cart-item-sliding-${i}`).style.display="none"
    this.isEmpty()
  }

  checkOut(){
    this.router.navigateByUrl("/index/checkout").then(()=>{window.location.reload()})
  }
}
