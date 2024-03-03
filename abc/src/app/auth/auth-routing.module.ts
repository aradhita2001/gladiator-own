import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { EmiCalculatorComponent } from "./components/emi-calculator/emi-calculator.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { UserComponent } from "./components/user/user.component";

const routes: Routes = [
    { 
      path: "", 
      component: AuthComponent, 
      children: [
        {path: "", component: HomeComponent},
        {path: "Home", component: HomeComponent},
        {path: "About-us", component: AboutUsComponent},
        {path: "login", component: LoginComponent},
        {path: "sign-up", component: UserComponent},
        {path: "loan", component: EmiCalculatorComponent}
      ]
    },
  ];
   
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AuthRoutingModule {}