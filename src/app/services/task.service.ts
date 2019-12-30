import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaskModel } from '../models/task.model';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class TaskService extends CrudService<TaskModel> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'Tasks');
  }
}
