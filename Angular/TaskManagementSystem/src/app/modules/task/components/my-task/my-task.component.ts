import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { ngxCsv } from 'ngx-csv/ngx-csv';

import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent {
  tasks: any[] = [];
  users: any[] = [];

  myTaskColumns = [
    'id',
    'title',
    'description',
    'assigned_to',
    'due_date',
    'status',
    'actions',
  ];
  statusOptions = ['pending', 'completed'];
  taskFormArray: any;
  dataSource: any;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });

    this.taskFormArray = this.fb.array([]);

    this.taskService.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.tasks.forEach((task) => {
          this.taskFormArray.push(this.createTaskFormGroup(task));
        });
        this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
      },
    });
    // Populate the form array with initial data
  }

  addRow() {
    const newEntry = {
      id: '',
      title: '',
      description: '',
      assigned_to: '',
      due_date: '',
      status: '',
    };
    this.taskFormArray.push(this.createTaskFormGroup(newEntry));
    this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
  }

  removeRow(i: number) {
    console.log('removed row', i);
    this.taskFormArray.removeAt(i);
    this.dataSource.data = this.taskFormArray.controls;
  }

  createTaskFormGroup(task: any): FormGroup {
    return this.fb.group({
      id: [task.id],
      title: [task.title],
      description: [task.description],
      assigned_to: [task.assigned_to],
      due_date: [task.due_date],
      status: [task.status],
    });
  }

  addValidators(column: string, i: number) {
    const control = this.taskFormArray.controls[i].get(column);

    if (control) {
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }
  }

  onSave(taskIndex: number) {
    let isAvailable = false;
    const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
    if (taskForm.valid) {
      const newTask = taskForm.value;

      for (let t of this.tasks) {
        if (t.id == newTask.id) {
          isAvailable = true;
        }
      }
      if (!isAvailable) {
        newTask.id = Date.now();
        this.taskService.addTask(newTask);
        this.tasks = [...this.tasks, newTask];

        taskForm.patchValue({ id: newTask.id });

        this.dataSource.data[taskIndex] =
          this.taskFormArray.controls[taskIndex];
        this.dataSource._updateChangeSubscription();

        this.toastr.success('Task added successfully', 'Success');
      } else {
        this.taskService.editTask(newTask.id, newTask);
        this.tasks = this.tasks.map((task) => {
          if (task.id == newTask.id) return newTask;
          else return task;
        });
        taskForm.patchValue(newTask);

        this.dataSource.data[taskIndex] =
          this.taskFormArray.controls[taskIndex];
        this.dataSource._updateChangeSubscription();

        this.toastr.success('Task updated successfully', 'Success');
      }
    } else {
      this.toastr.error('Please fill the form properly', 'ERROR💥');
    }
  }

  onDelete(taskIndex: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
    const taskId = taskForm.value.id;

    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);

      this.taskFormArray.clear();

      this.tasks.forEach((task) => {
        this.taskFormArray.push(this.createTaskFormGroup(task));
      });

      this.dataSource = new MatTableDataSource(this.taskFormArray.controls);

      this.toastr.success('Task deleted successfully', 'Success');
    });
  }

  onSubmit() {
    console.log(this.taskFormArray);
    let removeRows: any[] = [];
    if (this.taskFormArray.valid) {
      for (let [i, group] of this.taskFormArray.controls.entries()) {
        console.log(i, group);
        if (group.touched && group.valid && !group.pristine) {
          this.onSave(i);
          group.touched = false;
        } else if (!group.touched && group.value.id == '') {
          removeRows.push(i);
        }
      }

      for (let r of removeRows.reverse()) {
        this.removeRow(r);
      }
    } else {
      this.toastr.error('Please make valid changes', 'ERROR💥');
    }
  }

  exportTaskData() {
    // let options = {
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalseparator: '.',
    //   showLabels: true,
    //   showTitle: true,
    //   title: 'TaskData',
    //   useBom: true,
    //   headers: [
    //     'id',
    //     'title',
    //     'description',
    //     'assigned_to_id',
    //     'due_date',
    //     'status',
    //   ],
    // };

    // new ngxCsv(this.tasks, 'taskData', options);

    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(this.tasks);

    const workbook = {
      Sheets: {
        taskData: worksheet,
      },
      SheetNames: ['taskData'],
    };

    const excelbuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blobData = new Blob([excelbuffer], { type: EXCEL_TYPE });

    this.fileSaverService.save(blobData, 'taskData');
  }

  importTaskData(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      let data = new Uint8Array(fileReader.result as ArrayBuffer);
      console.log('data', data);
      let workbook = XLSX.read(data, { type: 'array' });
      console.log('workbook', workbook);
      let sheetNames = workbook.SheetNames;

      this.tasks = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      this.taskService.saveImportedData(this.tasks);

      this.taskFormArray.clear();
      this.tasks.forEach((task) => {
        this.taskFormArray.push(this.createTaskFormGroup(task));
      });
      this.dataSource = new MatTableDataSource(this.taskFormArray.controls);

      this.toastr.success('Data imported successfully', 'Success');
    };
    fileReader.readAsArrayBuffer(file);
  }
}
