import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers.component';
import { AddEmployersComponent } from './add-employers/add-employers.component';
import { EditEmployersComponent } from './edit-employers/edit-employers.component';

const routes: Routes = [
  {
    path: '',
    component: EmployersComponent,
  },
  { 
    path: 'add', 
  component: AddEmployersComponent 
},
  {
    path: 'edit/:id',
    component: EditEmployersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployersRoutingModule {}
