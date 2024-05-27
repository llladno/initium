import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UsersI} from "../types/types";
import ApiService from "../api/api.service";


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() data?: { data: any, type: string }
  @Output() closePopup = new EventEmitter()

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^((\+7|7|8)+([0-9]){10})$/)]),
  });

  ngOnInit() {
    const user = this.data?.data as UsersI
    this.form.setValue({
      name: user.name|| '',
      surname: user.surname || '',
      email: user.email || '',
      phone: user.phone|| ''
    });
  }

  submit(event: Event, type: string, data?:any) {
    if (this.form.valid || type == 'delete') {
      if (type === 'add') {
        ApiService.setData(this.form.value)
      }
      if (type === 'delete') {
        ApiService.deleteData(data)
      }
      if (type === 'update') {
        ApiService.updateData(this.form.value, data)
      }
    }
  }
}
