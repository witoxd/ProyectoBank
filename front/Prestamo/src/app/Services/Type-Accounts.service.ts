import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeAccountI } from '../Models/typeAccount';
@Injectable({
  providedIn: 'root'
})
export class TypeAccountService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/TypeAccounts`
  base_path_service = `${this.api_uri_node}/TypeAccount`
  
  constructor(
    private http:HttpClient
  ) {}

  getAllTypeAccount():Observable<{TypeAccounts:TypeAccountI[]}>{
    return this.http
      .get<{TypeAccounts:TypeAccountI[]}>(this.base_path)
  }


  getOneTypeAccount(id: number):Observable<{TypeAccounts:TypeAccountI[]}>{
    return this.http
      .get<{TypeAccounts:TypeAccountI[]}>(`${this.base_path_service}/${id}`)
  }

  createTypeAccount(data: any):Observable<TypeAccountI>{
    return this.http.post<TypeAccountI>(this.base_path_service, data)
  }

  updateTypeAccount(id: number, data: any): Observable<TypeAccountI> {
    return this.http.put<TypeAccountI>(`${this.base_path_service}/${id}`, data);
  }

  deleteTypeAccount(id: number): Observable<TypeAccountI> {
    return this.http.delete<TypeAccountI>(`${this.base_path_service}/${id}`);
  }
  
}
