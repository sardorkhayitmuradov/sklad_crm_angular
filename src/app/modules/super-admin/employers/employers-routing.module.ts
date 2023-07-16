import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers.component';
import { AddEmployersComponent } from './add-employers/add-employers.component';
import { EditEmployersComponent } from './edit-employers/edit-employers.component';
import { EmployersResolver } from './services/employers.resolver';

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
    resolve: {
      data: EmployersResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployersRoutingModule {}
