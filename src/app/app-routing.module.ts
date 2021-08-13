import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'login', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
