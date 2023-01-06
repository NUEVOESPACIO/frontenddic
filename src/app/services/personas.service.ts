import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {  
  

  constructor(private httpClient: HttpClient) { }

  public anadirPersonas(persona: any) {
    return this.httpClient.post(`${baserUrl}/personas/`,persona);
  }

  public listarPersonas() {
    return this.httpClient.get(`${baserUrl}/personas/listar`);
  }

  public eliminarPersonas(id: number) {
    console.log(`${baserUrl}/personas/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/personas/` + id.toString());
  }

  public editarPersonas(personas: any) {
    return this.httpClient.post(`${baserUrl}/personas/`,personas);    
  }


}
