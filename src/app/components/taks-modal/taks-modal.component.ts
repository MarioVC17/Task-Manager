import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task/task.service';
import { DateTime } from "luxon";
import { ToastrService } from 'ngx-toastr';
import { swalToast, swalToastError } from 'src/app/utils/swal.utils';

@Component({
  selector: 'app-taks-modal',
  templateUrl: './taks-modal.component.html',
  styleUrls: ['./taks-modal.component.scss']
})
export class TaksModalComponent implements OnInit {

  @ViewChild("content") private modalContent: any;
  private modalRef!: NgbModalRef;

  public FormGroup!: FormGroup;
  public Task: any;
  public Update: boolean = false;

  constructor (
    private _modalService: NgbModal,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void { }

  /**
   * Construye Formulario para crear o editar una Tarea
   * @param {any} task - Tarea a actualiza (si es el caso) 
   * @returns {FormGroup} - Formulario para crear o editar una tarea
   */
  public createForm(task?: any): FormGroup {
    return new FormGroup({
      task_id: new FormControl(task ? task.task_id : this._taskService.generateTaskID),
      name: new FormControl(task ? task.name : '', [Validators.required, Validators.maxLength(32)]),
      description: new FormControl(task ? task.description : '', [Validators.required, Validators.maxLength(40)]),
      creation_date: new FormControl(task ? task.creation_date : DateTime.now()),
      status: new FormControl(task ? task.status : '')
    });
  }

  /**
   * Abre modal y construye el Formulario
   * @param task - Tarea
   * @returns {void}
   */
  public openModal(task?: any): void {
    this.Task = task;
    this.FormGroup = this.createForm(task);
    this.modalRef = this._modalService.open(this.modalContent);
  }

  /**
   * Cierra modal
   * @returns {void}
   */
  public closeModal(): void {
    this.modalRef.close();
  }

  /**
   * Valida si los campos de un formulario son invalidos
   * @param {string} formControlName - Nombre del formControlName
   * @returns {boolean | undefined}
   */
  public formInvalid(formControlName: string): boolean | undefined {
    const control = this.FormGroup.get(formControlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  /**
   * Procesa la información para Crear o Actualizar una Tarea
   * @returns {void}
   */
  public processTask(): void {
    const Value = this.FormGroup.value;
    if (this.FormGroup.valid) {
      if (this.Task === undefined) {
        this.Update = false;
        this._taskService.createTask(Value);
        swalToast('¡Tarea añadida con éxito!');
      } else {
        this.Update = true;
        this._taskService.updatedTask(Value);
        swalToast('¡Tarea actualizada exitosamente!');
      }
      this.modalRef.close();
    } else swalToastError('Oops, parece que hay errores en algunos campos. Por favor, verifica y vuelve a intentar. ')
  }
}
