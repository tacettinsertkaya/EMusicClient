import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';

const routes: Routes = [
  {

    path: "",
    component:UserLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)

  },

  {

    path: "auth",
    component:AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
