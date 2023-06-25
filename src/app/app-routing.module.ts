import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  // Super Admin Login
  {
    path: 'admin/login',
    loadChildren: () =>
    import('./modules/superAdminLogin/superAdminLogin.module').then((m) => m.SuperAdminLoginModule),
  },
  // Employee and Employer Login
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'employer',
    loadChildren: () =>
      import('./modules/employer/employer.module').then((m) => m.EmployerModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: '**',
    loadChildren: () => 
      import('./modules/not-found/not-found.module').then((m) => m.NotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
