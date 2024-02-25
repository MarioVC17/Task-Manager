import { Task } from 'src/app/interfaces/interfaces';
import { swalToast } from '../../utils/swal.utils';
import { Component, OnInit, ViewChild } from '@angular/core';
import { swalWarningMessage } from 'src/app/utils/swal.utils';
import { TaskService } from 'src/app/services/task/task.service';
import { TaksModalComponent } from 'src/app/components/taks-modal/taks-modal.component';
import { StatusModalComponent } from 'src/app/components/status-modal/status-modal.component';

@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.component.html',
  styleUrls: ['./tasks-manager.component.scss']
})
export class TasksManagerComponent implements OnInit {

  @ViewChild('modal') private modalCreateTask!: TaksModalComponent;
  @ViewChild('status') private modalStatus!: StatusModalComponent;

  public Task!: Task;
  public search: string = '';
  public activeTab: string = '';
  public ListTasks!: Array<Task>;

  /**
   * @constructor
   * @param {TaskService} _taskService
   */
  constructor(
    private _taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.ListTasks = this.taskList;
  }

  public get taskList() {
    return this._taskService.taskList;
  }

  /**
   * Filtra la información por medio de palabras claves
   * @param {string} field
   */
  public onSearch(field: string) {
    setTimeout(() => {
      this.ListTasks = this.taskList.filter((task) => {
        return (task.name as string).toLowerCase().includes(field.toLowerCase());
      });
    }, 500);
  }

  /**
   * Retorna el total de Tareas o Tareas en progreso
   * @param {string} option - Opción a seleccionar 
   */
  public changeContent(option: string) {
    this.activeTab = option;
    if (option === 'task-progress') {
      this.ListTasks = this.taskList.filter((task) => task.status === '2');
    } else this.ListTasks = this.taskList;
  }

  /**
   * Abre modal que permite la creación o actualización de una Tarea
   * @param {Task} task - Tarea (se carga cuando se va a actualizar)
   */
  public openModalTask(task?: Task) {
    this.modalCreateTask.openModal(task);
  }

  /**
   * Abre modal para la actualización de un estado de una Tarea
   * @param {Task} task - Tarea que contiene el estado a modificar
   */
  public openModalStatus(task: Task) {
    this.modalStatus.openModalStatus(task);
  }

  /**
   * Elimina una tarea usando el ID de la misma
   * @param {string} id_task - ID de una tarea
   */
  public async deleteTask(id_task: string) {
    const Title: string = 'Eliminar Tarea';
    const Message: string = '¿Estás seguro de que deseas eliminar esta tarea?';
    const { isConfirmed } = await swalWarningMessage(Title, Message);
    if (isConfirmed) {
      this.ListTasks = this.ListTasks.filter(task => task.task_id !== id_task);
      this._taskService.deleteTask(id_task);
      swalToast('¡Tarea eliminada con éxito!');
    }
  }

  public proccessTask(ev: any) {
    const { action, task } = ev;
    if (action === 'create') {
      this._taskService.createTask(task);
      swalToast('¡Tarea añadida con éxito!');
      this.ListTasks.push(task);
    } else {
      swalToast('¡Tarea actualizada exitosamente!');
      this.changeStatus(task)
    }
  }

  /**
   * Actualiza el estado de una Tarea
   * @param {any} ev 
   */
  public changeStatus(ev: any) {
    this.ListTasks = this.ListTasks.map((task: any) => {
      if(task.task_id === ev.task_id) {
        return ev;
      } else return task;
    });
    this._taskService.updatedTask(ev);
  }

  /**
   * Abre modal para actualizar una tarea
   * @param {Task} task 
   */
  public updateTask(task: Task) {
    this.openModalTask(task);
  }
}
