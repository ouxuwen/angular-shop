import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule' },
//   {
//     path: 'checkout',
//     loadChildren: './checkout/checkout.module#CheckoutModule' },
//   {
//     path: 'user',
//     loadChildren: './user/index#UserModule',
//     canActivate: [ CanActivateViaAuthGuard ]
//   },
//   {
//     path: 'product',
//     loadChildren: './product/index#ProductModule'
//   },
    {
      path: 'goods',
      loadChildren: './goods/goods.module#GoodsModule'
    },
    {
      path: 'login',
      loadChildren: './login/index#LoginModule'
    },

];
