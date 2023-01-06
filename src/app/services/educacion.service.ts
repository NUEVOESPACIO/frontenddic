import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private httpClient: HttpClient) { }



  public anadirEducacion(educacion: any) {
    return this.httpClient.post(`${baserUrl}/educacion/`,educacion);
  }

  public listarEducacion() {
    return this.httpClient.get(`${baserUrl}/educacion/listar`);
  }

  public eliminareducacion(id: number) {
    console.log(`${baserUrl}/educacion/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/educacion/` + id.toString());
  }

  public editarEducacion(educacion: any) {
    return this.httpClient.post(`${baserUrl}/educacion/`,educacion);    
  }
  
}