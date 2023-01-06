import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private httpClient: HttpClient) { }

  public anadirProyecto(proyecto: any) {
    return this.httpClient.post(`${baserUrl}/proyectos/`,proyecto);
  }

  public listarProyectos() {
    return this.httpClient.get(`${baserUrl}/proyectos/listar`);
  }

  public eliminarProyecto(id: number) {
    console.log(`${baserUrl}/proyectos/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/proyectos/` + id.toString());
  }

  public editarProyecto(proyecto: any) {
    return this.httpClient.post(`${baserUrl}/proyectos/`,proyecto);    
  }



}
