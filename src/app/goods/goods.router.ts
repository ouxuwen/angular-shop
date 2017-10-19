
import { GoodsComponent } from './goods.component';
import { AllmodelComponent } from './allmodel/allmodel.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ModelComponent } from './model/model.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
export const GoodsRoutes = [
   
    { path: 'goods/:id', component: GoodsComponent },
    { path: "allmodel/:id", component: AllmodelComponent },
    { path: "all-categories", component: AllCategoriesComponent },
    { path: "model/:id", component: ModelComponent },
    { path: "goods-list", component: GoodsListComponent }
];
