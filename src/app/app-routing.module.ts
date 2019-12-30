import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';


const routes: Routes = [
  { path: '', component: TaskListComponent, pathMatch: 'full' },
  { path: 'task/:id', component: TaskComponent },
  { path: 'add', component: TaskAddEditComponent },
  { path: 'task/edit/:id', component: TaskAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
