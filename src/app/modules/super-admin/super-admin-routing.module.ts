import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: SuperAdminComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    {
      path: 'login',
      loadChildren: () =>
        import('./login/login.module').then((m) => m.SuperAdminLoginModule),
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      data: {
        breadcrumb: 'Dashboard',
      },
      canActivate: [AuthGuard],
    },
    {
      path: 'employers',
      loadChildren: () =>
        import('./employers/employers.module').then((m) => m.EmployersModule),
      data: {
        breadcrumb: 'Employers',
      },
      canActivate: [AuthGuard],
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./settings/settings.module').then((m) => m.SettingsModule),
      data: {
        breadcrumb: 'Settings',
      },
      canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
