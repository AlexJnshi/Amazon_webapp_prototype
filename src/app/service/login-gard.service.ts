import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGardService implements CanActivate{

  isLogin = sessionStorage.getItem("isLogin")
  constructor(private router:Router) { }

  canActivate(){
    if(this.isLogin){
      return true
    }else{
      this.router.navigateByUrl("/index/sign-in")
    }
  }
}
