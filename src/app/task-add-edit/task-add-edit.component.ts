import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent implements OnInit {

  public form: FormGroup;
  public actionType: string;
  private formTitle: string;
  private formDescription: string;
  private taskId: number;
  private errorMessage: any;
  private existingTask: TaskModel;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router
  ) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formDescription = 'description';
    if (this.avRoute.snapshot.params[idParam]) {
      this.taskId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        taskId: 0,
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {
    if (this.taskId > 0) {
      this.actionType = 'Edit';
      this.taskService.get(this.taskId)
        .subscribe(data => {
          this.existingTask = data,
            this.form.controls[this.formTitle].setValue(data.title),
            this.form.controls[this.formDescription].setValue(data.description);
        });
    }
  }

  public save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      const task: TaskModel = {
        dt: new Date(),
        creator: 'TODO: Get logged creator name',
        title: this.title.value,
        description: this.description.value
      };

      this.taskService.add(task);
      return;
    }

    if (this.actionType === 'Edit') {
      const task: TaskModel = {
        taskId: this.existingTask.taskId,
        dt: this.existingTask.dt,
        creator: this.existingTask.creator,
        title: this.title.value,
        description: this.description.value
      };
      this.taskService.update(this.taskId, task)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  public cancel() {
    this.router.navigate(['/']);
  }

  public get title() { return this.form.get(this.formTitle); }
  public get description() { return this.form.get(this.description); }
}
