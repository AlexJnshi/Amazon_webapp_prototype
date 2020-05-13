import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pImg:Array<any> = [0]

  constructor( private myHttp : HttpClient) { }

  ngOnInit() {
    this.myHttp.get("http://192.168.3.10:3000/carousel").subscribe((result:any)=>{
       this.pImg = result;
    })
  }

  //slideOpts is the carousel control function, the full api can be found at https://swiperjs.com/api/
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true,
  };

}
