import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor( 
    private myhttp:HttpClient,
    private alertcontroler:AlertController,
    private router:Router
    ) { }

  ngOnInit() {
  }

  // show password checkbox ngModel bind
  isToggled: boolean = false;
  
  // password input [type] bind
  togglePassword:any = "password"

  userName:string
  userEmail:string
  userPassword:string
  
  unameTipsColor:string
  emailTipsColor:string
  passwordTipsColor:string

  unameReg = /^[a-zA-Z0-9_-]{4,8}$/
  upasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/
  emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/


  //checkbox ionchange
  showPassword(){
    if(this.isToggled){
      this.togglePassword ="text"
    }else{
      this.togglePassword="password"
    } 
  }
  //verification for user name
  userNameChange(){
    let url = "http://192.168.3.10:3000/user/uname?uname="+this.userName
    this.myhttp.get(url).subscribe((result:any)=>{
      if(!result){
        if(this.unameReg.test(this.userName)){
          this.unameTipsColor = "success"
          document.getElementById("sign-up-page-name-tips").innerHTML = "Awesome!"
        }else{
          this.unameTipsColor = "warning"
          document.getElementById("sign-up-page-name-tips").innerHTML = "Please enter 4-8 letters or numbers"
        }
      }else{
        this.unameTipsColor = "danger"
        document.getElementById("sign-up-page-name-tips")
        .innerHTML = "This username is already in use. please try another one"
      }
    })
    
  }

  //verification for email address
  userEmailChange(){
    if(this.emailReg.test(this.userEmail)){
      this.emailTipsColor = "success"
      document.getElementById("sign-up-page-email-tips").innerHTML = "Awesome!"
    }else{
      this.emailTipsColor = "warning"
      document.getElementById("sign-up-page-email-tips").innerHTML = "Please enter correct email address"
    }
  }

  //verification for password
  userPasswordChange(){
    if(this.upasswordReg.test(this.userPassword)){
      this.passwordTipsColor = "success"
      document.getElementById("sign-up-page-password-tips").innerHTML = "Awesome!"
    }else{
      this.passwordTipsColor = "warning"
      document.getElementById("sign-up-page-password-tips").innerHTML = "Please enter 8~16 digits, at least including 1 uppercase letter,1 lowercase letter and 1 digit"
    }
  }

  signUpBtnDisable(){
    if(
      this.unameReg.test(this.userName)&&
      this.emailReg.test(this.userEmail)&&
      this.upasswordReg.test(this.userPassword)
    ){
      return false
    }else{
      return true
    }
  }

  async alertMsg(header,message,isSuccess){
    const alert = await this.alertcontroler.create({
      header,
      message,
      buttons:[{
        text:"Ok",
        role:"cancel",
        handler:()=>{
          if(isSuccess=1){
            this.router.navigateByUrl("/index/sign-in")
          }
        }
      }]
    })
    await alert.present();
  }
  


  signUpBtn(){
    this.myhttp.post("http://192.168.3.10:3000/signup",{
      uname:this.userName,
      upassword:this.userPassword,
      email:this.userEmail
    }).subscribe(result=>{
      if(result){
        this.alertMsg("Emmm","Something goes wrong,Please try again",0)
      }else{
        this.alertMsg("Great!","Sign up successful,please sign in",1)
      }
    })

  }

}
