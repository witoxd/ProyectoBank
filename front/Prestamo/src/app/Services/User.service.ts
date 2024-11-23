import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from '../Models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_uri_node = 'http://localhost:4000';
 // api_uri_node = 'https://5dda-181-50-65-30.ngrok-free.app/';
  base_path = `${this.api_uri_node}/Users`
  base_path_service = `${this.api_uri_node}/User`
  constructor(
    private http:HttpClient
  ) {}

  getAllUser():Observable<{Users:UserI[]}>{
    return this.http
      .get<{Users:UserI[]}>(this.base_path)
  }


  getOneUser(id: number):Observable<{User:UserI[]}>{
    return this.http
      .get<{User:UserI[]}>(`${this.base_path_service}/${id}`)
  }

  createUser(data: any):Observable<UserI>{
    return this.http.post<UserI>(this.base_path_service, data)
  }

  updateUser(id: number, data: any): Observable<UserI> {
    return this.http.put<UserI>(`${this.base_path_service}/${id}`, data);
  }

  deleteUser(id: number): Observable<UserI> {
    return this.http.delete<UserI>(`${this.base_path_service}/${id}`);
  }
  
}


