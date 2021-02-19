import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MyTasksComponent} from './components/my-tasks/my-tasks.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminStatComponent} from './components/admin-stat/admin-stat.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'my-tasks', component: MyTasksComponent, canActivate: [AuthGuard]},
  {path: 'admin-stat', component: AdminStatComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
