import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import ApiService from "../../api/api.service";
import {EventI, UsersI} from "../../../types/types";
import apiService from "../../api/api.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss',],
})


export class TableComponent implements OnInit {
  @Output() openPopup = new EventEmitter()
  users: UsersI[] = []
  checked: UsersI[] = []


  click(data: EventI) {
    this.openPopup.emit(data)
  }

  onCheck(event: Event, user: UsersI) {
    const target = event.target as HTMLInputElement
    if (target.checked) {
      this.checked.push(user)
    } else {
      this.checked = this.checked.filter((item: UsersI) => item.name !== user.name)
    }
  }

  allChecked(event: Event) {
    const target = event.target as HTMLInputElement
    target.checked ? this.users.forEach((item: UsersI) => this.checked.push(item))
      : this.checked = []
  }

  async ngOnInit() {
    apiService.data.subscribe({
      next: (res:UsersI[]) => {
        this.users = res
      }
    })
    await ApiService.getData().then((res) => this.users = res)

  }

  sort(params: string) {
    if (params === 'name') {
      this.users = this.users.sort((a, b) =>a.name.localeCompare(b.name))
    } else if (params === 'surname') {
      this.users = this.users.sort((a, b) =>a.surname.localeCompare(b.surname))
    } else if (params === 'email') {
      this.users = this.users.sort((a, b) =>a.email.localeCompare(b.email))
    } else if (params === 'phone') {
      this.users = this.users.sort((a, b) =>a.phone.localeCompare(b.phone))
    }
  }
}
