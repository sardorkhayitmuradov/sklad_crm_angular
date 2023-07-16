import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [{
  path: '',
  component: SuperAdminComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => 
        import('./dashboard/dashboard.module').then((m)=> m.DashboardModule),
        data: {
          breadcrumb: 'Dashboard'
        },
    },
    {
      path: 'employers',
      loadChildren: () => 
        import('./employers/employers.module').then((m)=> m.EmployersModule),
        data: {
          breadcrumb: 'Employers'
        },
    },
    {
      path: 'settings',
      loadChildren: () => 
        import('./settings/settings.module').then((m)=> m.SettingsModule),
        data: {
          breadcrumb: 'Settings'
        },
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
