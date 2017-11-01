
import { CartComponent } from './cart.component';
import { CheckOutComponent } from './check-out/check-out.component';

export const CartRoutes = [
    { path: '', redirectTo:"cart",  pathMatch: 'full' },
    { path: 'cart', component: CartComponent },
    { path: "check-out", component: CheckOutComponent },

];
