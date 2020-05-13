import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './index.page';
import { LoginGardService } from '../../service/login-gard.service'

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path:'',
        loadChildren:()=> import('../home/home.module').then(m=> m.HomePageModule)
      },
      {
        path: 'sign-in',
        loadChildren: () => import('../sign-in/sign-in.module').then( m => m.SignInPageModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('../sign-up/sign-up.module').then( m => m.SignUpPageModule)
      },
      // LoginGardService will check whether user is login or not,
      // If user did not login, will be redirect to sign up page.
      {
        path:'user',
        canActivate:[LoginGardService],
        loadChildren:()=> import('../user/user.module').then(m=> m.UserPageModule)
      },
      {
        path:'cart',
        canActivate:[LoginGardService],
        loadChildren:()=> import('../cart/cart.module').then(m=> m.CartPageModule)
      },
      {
        path: 'product-list',
        loadChildren: () => import('../product-list/product-list.module').then( m => m.ProductListPageModule)
      },
      {
        path: 'product-detail',
        loadChildren: () => import('../product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
      },
      {
        path: 'checkout',
        canActivate:[LoginGardService],
        loadChildren: () => import('../checkout/checkout.module').then( m => m.CheckoutPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
