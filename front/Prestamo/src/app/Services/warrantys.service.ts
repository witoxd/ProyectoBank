import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { warrantyI } from '../Models/warranty';
@Injectable({
  providedIn: 'root'
})
export class warrantysService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/warrantys`
  base_path_service = `${this.api_uri_node}/warranty`
  constructor(
    private http: HttpClient
  ) { }

  getAllwarrantys(): Observable<{ warrantys: warrantyI[] }> {
    return this.http
      .get<{ warrantys: warrantyI[] }>(this.base_path)
  }


  getOnewarrantys(id: number): Observable<{ warrantys: warrantyI[] }> {
    return this.http
      .get<{ warrantys: warrantyI[] }>(`${this.base_path_service}/${id}`)
  }

  createwarrantys(data: any): Observable<warrantyI> {
    return this.http.post<warrantyI>(this.base_path_service, data)
  }

  updatewarrantys(id: number, data: any): Observable<warrantyI> {
    return this.http.put<warrantyI>(`${this.base_path_service}/${id}`, data);
  }

  deletewarrantys(id: number): Observable<warrantyI> {
    return this.http.delete<warrantyI>(`${this.base_path_service}/${id}`);
  }

}