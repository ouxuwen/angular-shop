import { HomeComponent } from './home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { QuickOrderComponent } from './quick-order/quick-order.component';

export const HomeRoutes = [
  { path: '', component: HomeComponent },
  { path: "inventory", component: InventoryComponent },
  { path: "quick-order", component: QuickOrderComponent },
  
];
