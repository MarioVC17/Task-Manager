import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { Task } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  /**
   * @constructor
   * @param {LocalstorageService} _localstorage
   */
  constructor(
    private _localstorage: LocalstorageService
  ) { }

  /**
   * Genera un ID único para las Tareas
   */
  public get generateTaskID() {
    return uuidv4();
  }

  /**
   * Actualiza la Lista de Tareas en el 'localstorage'
   */
  private set setTaskList(tasks_list: any) {
    this._localstorage.setItem('Tasks', tasks_list);
  }

  /**
   * 
   * @returns {Array<Task>}
   */
  public get taskList(): Array<Task> {
    const Tasks: string = this._localstorage.getItem('Tasks') ?? 'null'
    return JSON.parse(Tasks) ?? [];
  }

  /**
   * Crea una nueva tarea
   * @param {any} task_list - Lista de tareas 
   */
  public createTask(task_list: any): void {
    const TaskList: Array<Task> = this.taskList;
    TaskList.push(task_list);
    this.setTaskList = TaskList;
  }

  /**
   * Actualiza una tarea
   * @param {any} task_list - Lista de tareas
   */
  public updatedTask(task_list: any): void {
    const TaskList: Array<Task> = this.taskList.map((task) => {
      if (task.task_id === task_list.task_id) {
        return task_list;
      } else return task;
    });
    this.setTaskList = TaskList;
  }

  /**
   * Elimina una Tarea usando el ID
   * @param {string} taskID - ID de una Tarea 
   */
  public deleteTask(taskID: string): void {
    const TaskList: Array<Task> = this.taskList.filter(task => task.task_id !== taskID);
    this._localstorage.setItem('Tasks', TaskList);
  }
}
