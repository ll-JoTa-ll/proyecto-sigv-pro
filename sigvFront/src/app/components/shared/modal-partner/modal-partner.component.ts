import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-modal-partner',
  templateUrl: './modal-partner.component.html',
  styleUrls: ['./modal-partner.component.sass']
})
export class ModalPartnerComponent implements OnInit {

  todo = [];

  done = [];

  constructor(public modalRef: BsModalRef,private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.todo = this.sessionStorageService.retrieve('ss_keys');
  }

  VolverHome(){
    this.modalRef.hide();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
