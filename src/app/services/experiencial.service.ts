import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class ExperiencialService {

  constructor(private httpClient: HttpClient) { }

  public anadirExperiencial(experiencial: any) {
    return this.httpClient.post(`${baserUrl}/experiencial/`,experiencial);
  }



  public listarExperiencial() {
    return this.httpClient.get(`${baserUrl}/experiencial/listar`);
  }

  public eliminarExperiencial(id: number) {
    console.log(`${baserUrl}/experiencial/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/experiencial/` + id.toString());
  }

  public editarExperiencial(experiencial: any) {
    return this.httpClient.post(`${baserUrl}/experiencial/`,experiencial);    
  }





}
