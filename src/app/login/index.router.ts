import { LoginComponent } from './login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
export const HomeRoutes = [
  { path: '', component: LoginComponent },
  { path: "forget-password", component: ForgetPasswordComponent }
];
