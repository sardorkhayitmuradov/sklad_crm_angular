import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers.component';
import { AddEditEmployersComponent } from './add-edit-employers/add-edit-employers.component';

const routes: Routes = [
  {
    path: '',
    component: EmployersComponent,
  },
  { 
    path: 'add', 
  component: AddEditEmployersComponent 
},
  {
    path: 'edit/:id',
    component: AddEditEmployersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployersRoutingModule {}
