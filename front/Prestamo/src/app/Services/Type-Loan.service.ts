import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeLoanI } from '../Models/TypeLoan';
@Injectable({
  providedIn: 'root'
})
export class TypeLoanService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/TypeLoans`
  base_path_service = `${this.api_uri_node}/TypeLoan`
  constructor(
    private http:HttpClient
  ) {}

  getAllTypeLoan():Observable<{TypeLoans:TypeLoanI[]}>{
    return this.http
      .get<{TypeLoans:TypeLoanI[]}>(this.base_path)
  }


  getOneTypeLoan(id: number):Observable<{TypeLoans:TypeLoanI[]}>{
    return this.http
      .get<{TypeLoans:TypeLoanI[]}>(`${this.base_path_service}/${id}`)
  }

  createTypeLoan(data: any):Observable<TypeLoanI>{
    return this.http.post<TypeLoanI>(this.base_path_service, data)
  }

  updateTypeLoan(id: number, data: any): Observable<TypeLoanI> {
    return this.http.put<TypeLoanI>(`${this.base_path_service}/${id}`, data);
  }

  deleteTypeLoan(id: number): Observable<TypeLoanI> {
    return this.http.delete<TypeLoanI>(`${this.base_path_service}/${id}`);
  }
  
}
