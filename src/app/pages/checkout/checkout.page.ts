import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(
    public loadingController : LoadingController,
    private router:Router,
    private myhttp:HttpClient
    ) { }
   
  uid:string = sessionStorage.getItem("uid")
  totalPrice:number = 0;
  Itemqty:number = 0;
  cart:Array<any>
  express:number = 5;
  dOpt:string = "dExpress"

  ngOnInit() {
    let url = "http://192.168.3.10:3000/cart?uid="+this.uid
    this.myhttp.get(url).subscribe((result:any)=>{
      this.cart = result
      for(let i=0;i<this.cart.length;i++){ 
        this.totalPrice += this.cart[i].price*this.cart[i].count
        this.Itemqty +=this.cart[i].count
      }
    })
  }
  
  deliveryFee(){
    return this.dOpt=="dFree"?0:this.express
  }

  //  Since there is no order page, so when user click checkout button,
  //  the cart will be cleared
  clearCart(){
    let url = "http://192.168.3.10:3000/cart/clearCart?uid="+this.uid
    this.myhttp.get(url).subscribe()
  }

  //  there is 3 secs delay to show order success message
  //  then user will be redirected to index page
  async presentLoading(){
    const loading = await this.loadingController.create({
      message: 'Thank you for your order!',
      duration: 3000
    });
    await loading.present()
    this.clearCart()
    setTimeout(()=>{this.router.navigateByUrl("index")},3000)
  }
}