import { Injectable } from '@angular/core';
import {ServiceRequest} from "./entities/ServiceRequest";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserRequest} from "./entities/UserRequest";
import {map, Observable} from "rxjs";
import {UserResponse} from "./entities/UserResponse";
import {User} from "../app/client-messagerie/client-messagerie.component";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl="http://localhost:8083/api/v1/user";

  constructor(private http:HttpClient) { }

  getUsers()
  {
    return this.http.get(this.baseUrl)
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl+"/"+id);
  }

  updateUser(user :UserRequest)
  {
    return this.http.put(this.baseUrl,user)
  }
  addService(userRequest:UserRequest)
  {
    return  this.http.post(this.baseUrl,userRequest).pipe(        map(response => response as UserResponse)
    );
  }

  getUserByEmailAndPassword(userRequest: UserRequest) :  Observable<UserResponse>
  {
    return this.http.post(this.baseUrl+"/findByEmail",userRequest)
      .pipe(
        map(response => response as UserResponse)
      );
  }

  getPrestatires() {
    return this.http.get(this.baseUrl+"/prestatire")
      .pipe(
        map(response => response as User[])
      );
  }

  getClients() {
    return this.http.get(this.baseUrl+"/client")
      .pipe(
        map(response => response as User[])
      );
  }
}
