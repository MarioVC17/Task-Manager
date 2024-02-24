import { Component, Input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaksModalComponent } from 'src/app/components/taks-modal/taks-modal.component';
import { TaskService } from 'src/app/services/task/task.service';
import { swalWarningMessage } from 'src/app/utils/swal.utils';
import { swalToast } from '../../utils/swal.utils';


@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.component.html',
  styleUrls: ['./tasks-manager.component.scss']
})
export class TasksManagerComponent {

  @ViewChild('modal') private modalCreateProject!: TaksModalComponent;
  public task : any;

  constructor(
    private _taskService: TaskService,
  ) {}

  public get taskList() {
    return this._taskService.taskList;
  }

  public get optionsList() {
    return [
      {
        value: 'a',
        nombre: 'asd'
      },
      {
        value: 'b',
        nombre: 'ad'
      }
     ]
  }

  public openModaal(task?: any) {
    this.modalCreateProject.openModal(task);
  }

  public validateSelect() {
    console.log('Detected change')
    // const ASD = value.target.value;
    // this._taskService.updatedStatus(ASD, id);
  }

  public async deleteTask(id: string) {
    const Title: string = 'Eliminar Tarea';
    const Message: string = '¿Estás seguro de que deseas eliminar esta tarea?';
    const { isConfirmed } = await swalWarningMessage(Title, Message);
    if (isConfirmed) {
      this._taskService.deleteTask(id);
      swalToast('¡Tarea eliminada con éxito!')
    }
  }

  public updateTask(task: any) {
    this.openModaal(task);
  }

  identify(index: number, item: any) {
    return item.label;
 }
}
