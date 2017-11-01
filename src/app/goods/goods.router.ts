
import { GoodsComponent } from './goods.component';
import { AllmodelComponent } from './allmodel/allmodel.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { ModelComponent } from './model/model.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { CategoriesComponent　}　from './categories/categories.component'
export const GoodsRoutes = [
   
    { path: 'goods-detail', component: GoodsComponent },
    { path: "all-model", component: AllmodelComponent },
    { path: "all-categories", component: AllCategoriesComponent },
    { path: "model", component: ModelComponent },
    { path: "goods-list", component: GoodsListComponent },
    { path: "categories", component: CategoriesComponent },
];
