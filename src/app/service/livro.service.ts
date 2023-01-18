import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar(termoDePesquisa: string): Observable<any> {
    const params = new HttpParams().append('q', termoDePesquisa);

    //Observable: (observável) coleção de valores ou eventos futuros. 
    //É lazy (preguiçoso), o Observer presisa manifestar explicitamente o interesse em consumir seus dados (subscribe)    
    
    //Observer: (observador) é representa a ideia de uma coleção de callbacks. 
    //Ele consegue ouvir os valores entregues pelo Observable.

    //Padrão Observer ou pub/sub: base da programação orientada a eventos, util quando vários componentes estão interessados em um determinado evento 
    return this.http.get(this.API, {params});
  }
}
