import { Component, OnInit } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private myhttp :HttpClient,
    private router:Router) { }

  pid = sessionStorage.getItem("pid")
  pimg = [0]
  pstar = 0
  product:Array<any> = [0]
  productReview:Array<any> = [0]
  
  ngOnInit() {
    let url="http://192.168.3.10:3000/product?pid="+this.pid
    this.myhttp.get(url).subscribe((result:any)=>{
      console.log(result)
      this.product = result
      this.pstar = this.product[0].pstar
      this.pimg[0] = this.product[0].img1
      this.pimg[1] = this.product[0].img2
      this.pimg[2] = this.product[0].img3
    })

    let urlReview = "http://192.168.3.10:3000/product-review?pid="+this.pid
    this.myhttp.get(urlReview).subscribe((result:any)=>{
      this.productReview = result
    })
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  buyNow(){
    this.addToCart()
    this.router.navigateByUrl("/index/cart")
  }

  addToCart(){
    let uid = sessionStorage.getItem("uid")
    let isLogin = sessionStorage.getItem("isLogin")
    if(isLogin){
      let url = "http://192.168.3.10:3000/cart/add?pid="+this.product[0].pid+"&user_id="+uid
      this.myhttp.get(url).subscribe((result:any)=>{
        this.presentToast(result.msg)
      })
    }else{
      this.router.navigateByUrl("/index/sign-in")
    }
  }

  helpful(i:any){
    let rHelpfulNum = this.productReview[i].rHelpfulNum+1
    this.productReview[i].rHelpfulNum = rHelpfulNum
    this.myhttp.get(
      "http://192.168.3.10:3000/product-Review/u?rid="+i+
      "&rHelpfulNum="+rHelpfulNum
   ).subscribe()
    this.productReview[i].isHelpClicked=true
  }

  async report(i:any){
    this.productReview[i].isReported=true
    const toast = await this.toastController.create({
      message: `Your report for user ${this.productReview[i].nickname}'s review has been submitted,Thank you.`,
      duration: 3000
    });
    toast.present();
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
  };

}
