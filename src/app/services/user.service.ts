import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public anadirUsuario(user: any) {

    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    

  }

  public listarUsuarios() {
    return this.httpClient.get(`${baserUrl}/usuarios/listar`);
  }

  public eliminarusuario(id: number) {
    console.log(`${baserUrl}/usuarios/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/usuarios/` + id.toString());
  }

  public editarUsuario(user: any) {

    return this.httpClient.post(`${baserUrl}/usuarios/`,user);
    

  }


  
}
