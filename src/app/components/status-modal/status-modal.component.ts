import { Task } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { swalToast } from 'src/app/utils/swal.utils';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent {

  @ViewChild("status_modal") private modalContent: any;
  @Output() newItemEvent = new EventEmitter<any>();
  private modalRef!: NgbModalRef;

  public Task!: Task;
  public FormGroup!: FormGroup;

  /**
   * @constructor
   * @param {NgbModal} _modalService 
   */
  constructor(
    private _modalService: NgbModal
  ) {}

  /**
   * Crea formulario con campo para modificar el estado de una Tarea
   * @param {Task} task - Tarea 
   * @returns {FormGroup}
   */
  public createFormGroup(task: Task): FormGroup {
    return new FormGroup({
      status: new FormControl(task.status)
    });
  }

  /**
   * Emite la nueva configuración de una Tarea
   * @returns {void} 
   */
  public saveStatus(): void {
    const Status: string = this.FormGroup.get('status')?.value;
    this.Task = { ...(this.Task), status: Status } 
    this.newItemEvent.emit(this.Task);
    this.modalRef.close();
    swalToast('¡El estado se actualizó con éxito!');
  }

  /**
   * Abre el modal que permite la configuración del estado de una Tarea
   * @param {Task} task 
   */
  public openModalStatus(task: Task): void {
    this.Task = task;
    this.FormGroup = this.createFormGroup(this.Task);
    this.modalRef = this._modalService.open(this.modalContent);
  }

  public closeModal() {
    this.modalRef.close();
  }
}
