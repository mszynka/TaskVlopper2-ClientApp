import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../models/task.model';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks$: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.tasks$ = this.taskService.query();
  }

  public delete(taskId: number) {
    const ans = confirm('Do you want to delete task?');
    if (!ans) {
      return;
    }

    this.taskService.delete(taskId).subscribe((data) => {
      this.loadTasks();
    });
  }
}
