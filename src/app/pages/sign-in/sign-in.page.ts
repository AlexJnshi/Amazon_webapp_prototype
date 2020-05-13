import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  upswd:string
  uname:string

  constructor(
    private myhttp:HttpClient,
    private router:Router, 
    private alertController:AlertController) { }

  ngOnInit() {
  }

  async presentAlertMultipleButtons(msg) {
    const alert = await this.alertController.create({
      header: 'Sign in massage',
      message: msg,
      buttons: [{
        text:"Ok",
        role:"cancel",
        handler:()=>{
          this.router.navigateByUrl("/index").then(()=>{window.location.reload()})
        }
      }]
    });

    await alert.present();
  }

  signin(){
    let url ="http://192.168.3.10:3000/signin"
    this.myhttp.post(url,{
      uname:this.uname,
      upassword:this.upswd
    }).subscribe((result:any)=>{
      if(result.code==0){
        this.presentAlertMultipleButtons(result.msg)
      }
      if(result.code==1){
        sessionStorage.setItem("uid",result.user.uid)
        sessionStorage.setItem("user",result.user.uname)
        sessionStorage.setItem("isLogin","1")
        this.presentAlertMultipleButtons(result.msg)
      }
    })
  }
  

}
