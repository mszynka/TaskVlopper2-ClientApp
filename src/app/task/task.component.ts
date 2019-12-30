import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public task$: Observable<TaskModel>;
  private taskId: number;

  constructor(
    private taskService: TaskService,
    private avRoute: ActivatedRoute
  ) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.taskId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadTask();
  }

  private loadTask() {
    this.task$ = this.taskService.get(this.taskId);
  }

}
