import { PersonComponent } from './person.component';
import { MyBingComponent } from './my-bing/my-bing.component';
import { OrderComponent } from './order/order.component';
export const PersonRouter = [
    {
        path: '',
        component: PersonComponent,
        children: [
            { path: '',redirectTo:'person', pathMatch:"full"},
            { path: 'person', component: MyBingComponent },
            { path: 'order', component: OrderComponent }
        ]
    },
];
