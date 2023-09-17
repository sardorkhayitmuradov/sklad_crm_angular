import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/guards/auth.guard';
import { NetworkAwarePreloadStrategy } from './modules/shared/services/network-aware-preload-strategy.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'admin/login',
    loadChildren: () =>
      import('./modules/super-admin-login/super-admin-login.module').then(
        (m) => m.SuperAdminLoginModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
    canActivate: [AuthGuard],
    data: {
      breadcrumbWithTranslate: 'superAdmin',
    },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'employer',
    loadChildren: () =>
      import('./modules/employer/employer.module').then(
        (m) => m.EmployerModule
      ),
    canActivate: [AuthGuard],
    data: {
      breadcrumbWithTranslate: 'employer',
      preload: true,
    },
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
    canActivate: [AuthGuard],
    data: {
      breadcrumbWithTranslate: 'employee.title',
      preload: true,
    },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
