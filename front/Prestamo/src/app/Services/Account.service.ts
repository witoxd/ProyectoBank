import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountI } from '../Models/Account';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/Accounts`
  base_path_service = `${this.api_uri_node}/Account`
  constructor(
    private http:HttpClient
  ) {}

  getAllAccount():Observable<{Accounts:AccountI[]}>{
    return this.http
      .get<{Accounts:AccountI[]}>(this.base_path)
  }


  getOneAccount(id: number):Observable<AccountI>{
    return this.http
      .get<AccountI>(`${this.base_path_service}/${id}`)
  }

  createAccount(data: any):Observable<AccountI>{
    return this.http.post<AccountI>(this.base_path_service, data)
  }

  updateAccount(id: number, data: any): Observable<AccountI> {
    return this.http.put<AccountI>(`${this.base_path_service}/${id}`, data);
  }

  deleteAccount(id: number): Observable<AccountI> {
    return this.http.delete<AccountI>(`${this.base_path_service}/${id}`);
  }
  
}