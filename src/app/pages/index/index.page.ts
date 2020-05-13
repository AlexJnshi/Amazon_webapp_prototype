import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  uname:string
  isLogin:boolean
  constructor(private myHttp:HttpClient) { }

  ngOnInit() {
    this.isLogin = Boolean(sessionStorage.getItem("isLogin"))
    this.uname = sessionStorage.getItem("user")
  }
}

