import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmortizationI } from '../Models/Amortization';
@Injectable({
  providedIn: 'root'
})
export class AmortizationService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/Amortizations`
  base_path_service = `${this.api_uri_node}/Amortization`
  constructor(
    private http:HttpClient
  ) {}

  getAllAmortization():Observable<{Amortizationes:AmortizationI[]}>{
    return this.http
      .get<{Amortizationes:AmortizationI[]}>(this.base_path)
  }


  getOneAmortization(id: number):Observable<{Amortizationes:AmortizationI[]}>{
    return this.http
      .get<{Amortizationes:AmortizationI[]}>(`${this.base_path_service}/${id}`)
  }

  createAmortization(data: any):Observable<AmortizationI>{
    return this.http.post<AmortizationI>(this.base_path_service, data)
  }

  updateAmortization(id: number, data: any): Observable<AmortizationI> {
    return this.http.put<AmortizationI>(`${this.base_path_service}/${id}`, data);
  }

  deleteAmortization(id: number): Observable<AmortizationI> {
    return this.http.delete<AmortizationI>(`${this.base_path_service}/${id}`);
  }
  
}