import { Injectable } from '@angular/core';
import axios from "axios";
import {UsersI} from "../types/types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
class ApiService {
  url: string = 'https://test-data.directorix.cloud/task1'
  data = new BehaviorSubject<UsersI[]>([])

  async getData(){
    const local = localStorage.getItem('users')
    if (local) {
      return JSON.parse(local)
    } else {
      const users = await axios.get(this.url)
      localStorage.setItem('users', JSON.stringify(users.data.users))
      this.data.next(users.data)
      return users.data.users
    }
  }
  async setData(user: UsersI) {
    const local = localStorage.getItem('users')
    const parse = JSON.parse(local as string)
    parse.push(user)
    localStorage.setItem('users', JSON.stringify(parse))
    this.data.next(parse)
  }
  async deleteData(users: UsersI[]) {
    const local = localStorage.getItem('users')
    let parse: UsersI[] = JSON.parse(local as string)
    parse = parse.filter(user1 =>
      !users.some(user2 => user2.email === user1.email && user2.phone === user1.phone)
    );
    localStorage.setItem('users', JSON.stringify(parse))
    this.data.next(parse)
  }

  async updateData(user: UsersI, i: number) {
    const local = localStorage.getItem('users')
    const parse: UsersI[] = JSON.parse(local as string)
    parse[i] = user
    localStorage.setItem('users', JSON.stringify(parse))
    this.data.next(parse)
  }
}

export default new ApiService()
