import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLoginComponent } from './super-admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminLoginRoutingModule {}
