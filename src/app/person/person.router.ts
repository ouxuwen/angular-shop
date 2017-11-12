import { PersonComponent } from './person.component';
import { MyBingComponent } from './my-bing/my-bing.component';
import { OrderComponent } from './order/order.component';
import { AddressComponent } from './address/address.component';
import { WishListComponent } from "./wish-list/wish-list.component";
import { TrackOrderComponent } from './track-order/track-order.component';
export const PersonRouter = [
    {
        path: '',
        component: PersonComponent,
        children: [
            { path: '', redirectTo: 'person', pathMatch: "full" },
            { path: 'person', component: MyBingComponent },
            { path: 'order', component: OrderComponent },
            { path: 'address', component: AddressComponent },
            { path: 'wish-list', component: WishListComponent },
            { path: "track-order", component: TrackOrderComponent }
        ]
    },
];
