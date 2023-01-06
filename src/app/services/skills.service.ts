import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private httpClient: HttpClient) { }

  public anadirSkills(skill: any) {
    console.log("llego a anadir");
    return this.httpClient.post(`${baserUrl}/skills/`,skill);
  }

  public listarSkills() {
    return this.httpClient.get(`${baserUrl}/skills/listar`);
  }

  public eliminarSkills(id: number) {
    console.log(`${baserUrl}/skills/` + id.toString())
    return this.httpClient.delete(`${baserUrl}/skills/` + id.toString());
  }

  public editarSkills(skill: any) {
    console.log("llego al servicio ok");
    return this.httpClient.post(`${baserUrl}/skills/`,skill);    
  }

}
