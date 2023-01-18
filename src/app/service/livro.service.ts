import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  buscar(termoDePesquisa: string): Observable<Item[]> {
    const params = new HttpParams().append('q', termoDePesquisa);

    //Observable: (observável) coleção de valores ou eventos futuros. 
    //É lazy (preguiçoso), o Observer presisa manifestar explicitamente o interesse em consumir seus dados (subscribe)    
    
    //Observer: (observador) é representa a ideia de uma coleção de callbacks. 
    //Ele consegue ouvir os valores entregues pelo Observable.

    //Padrão Observer ou pub/sub: base da programação orientada a eventos, util quando vários componentes estão interessados em um determinado evento 
    return this.http
                .get<LivrosResultado>(this.API, {params})
                //Os operadores, quando conectados a um Observable, executam uma ação e retornam outro Observable.
                .pipe( //pipe é um operador que canaliza/agrupa um fluxo de outros operadores
                  tap(retornoAPI => console.log(retornoAPI)), //tap é o operador que permite inspecionar o valor do Observable
                  map(retornoAPI => retornoAPI.items)); 
  }
}
