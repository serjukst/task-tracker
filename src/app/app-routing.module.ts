import { RegisterPageComponent } from './register-page/register-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    ...canActivate(redirectLoggedInToItems)
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'dashboard/:id',
    component: TaskPageComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
