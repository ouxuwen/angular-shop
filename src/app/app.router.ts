import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';
import {　AuthLogin,AuthLogout }　from './services'
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path:'home',
    loadChildren:'app/home/home.module#HomeModule'
  },
  {
    path: 'goods',
    loadChildren: 'app/goods/goods.module#GoodsModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/index#LoginModule',
    canActivate:[AuthLogout]
  },
  {
    path: 'cart',
    loadChildren: 'app/cart/cart.module#CartModule',
    canActivate:[AuthLogin]
  },  
  {
    path: 'person',
    loadChildren: 'app/person/person.module#PersonModule',
    canActivate:[AuthLogin]
  },
  {
    path:'**',
    redirectTo: 'home',
  }

];
