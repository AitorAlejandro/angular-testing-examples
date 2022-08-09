import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { PlaceholderUser } from "../models/placeholder-user.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<User> = [{ email: 'defaultUser@gmail.com', password: '123' }];

  constructor(private http: HttpClient) { }

  public insert(user: User):void {
    this.users.push(user);
  }

  public getAll(): Observable<User[]> {
    return of(this.users);
  }

  public getAllPlaceholder(): Observable<PlaceholderUser[]> {
    return this.http.get<PlaceholderUser[]>('https://jsonplaceholder.typicode.com/users');
  }

  public add(num1: number, num2: number): number {
    return num1 + num2;
  }
}
