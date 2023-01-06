import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpleoService {

  constructor(private httpClient: HttpClient) { }



  public anadirTipoEmpleo(tipoempleo: any) {
    return this.httpClient.post(`${baserUrl}/tipoempleos/`,tipoempleo);
  }

  public listarTipoEmpleo() {
    return this.httpClient.get(`${baserUrl}/tipoempleos/listar`);
  }

  public eliminarTipoEmpleo(id: number) {    
    return this.httpClient.delete(`${baserUrl}/tipoempleos/` + id.toString());
  }

  public editarTipoEmpleo(tipoempleo: any) {
    return this.httpClient.post(`${baserUrl}/tipoempleos/`,tipoempleo);    
  }
  
}