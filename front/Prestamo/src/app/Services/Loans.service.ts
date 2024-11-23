import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanI } from '../Models/Loan';
@Injectable({
  providedIn: 'root'
})
export class LoansService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/Loans`
  base_path_service = `${this.api_uri_node}/Loan`
  constructor(
    private http:HttpClient
  ) {}

  getAllLoans():Observable<{Loanss:LoanI[]}>{
    return this.http
      .get<{Loanss:LoanI[]}>(this.base_path)
  }


  getOneLoans(id: number):Observable<{Loans:LoanI[]}>{
    return this.http
      .get<{Loans:LoanI[]}>(`${this.base_path_service}/${id}`)
  }

  createLoans(data: any):Observable<LoanI>{
    return this.http.post<LoanI>(this.base_path_service, data)
  }

  updateLoans(id: number, data: any): Observable<LoanI> {
    return this.http.put<LoanI>(`${this.base_path_service}/${id}`, data);
  }

  deleteLoans(id: number): Observable<LoanI> {
    return this.http.delete<LoanI>(`${this.base_path_service}/${id}`);
  }
  
}
