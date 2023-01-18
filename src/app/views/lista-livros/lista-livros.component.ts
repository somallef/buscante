import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];
  campoBusca: string = ''

  constructor(private service: LivroService) { }

  //Quando um evento acontece, o observable notificará todos os observers e cada observer 
  //puxará as informações de que precisa do observable.
  //O Observer é uma coleção de callbacks que sabe escutar os valores entregues pelo Observable.
  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({ //Assinar um observable é como chamar uma função, fornecendo retornos de chamada para onde os dados serão entregues.
      next: (retornoDoObservable) => console.log(retornoDoObservable), //cada chave aqui representa um tipo de notificação do Observable
      error: (erroRetornadoDoObservable) => console.error(erroRetornadoDoObservable),
      complete: () => console.log('Observable completado') //a notificação do tipo complete permite notificar o fim do ciclo de vida do Observable
    });
  }

}



