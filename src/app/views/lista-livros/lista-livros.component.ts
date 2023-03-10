import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, filter, map, of, Subscription, switchMap, throwError } from 'rxjs';
import { Item, Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent /*implements OnDestroy*/ {

  livrosResultado: LivrosResultado;  
  mensagemErro: string = ''
  //O FormControl() irá nos retornar um Observable, então utilizaremos o método valueChanges 
  //para o campoBusca na variável livrosEncontrados$. 
  //Esse método retorna um Observable que vai emitir um evento cada vez que houver 
  //uma mudança no controle que estamos atribuindo, ou seja, no campo de busca.
  campoBusca = new FormControl()
  //SwitchMap: A ideia desse operador é trocar os valores e passar ao servidor só o último valor (B), 
  //desconsiderando os valores anteriores (A).
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(resultado => resultado.items ?? []), //retorna um array vazio caso a api não retorne correspondência para o termo digitado
    map(items => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      console.log(erro)
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
    })

    

    /*//Forma alternativa de tratar os erros, fazendo uso do observable EMPTY
    //Ele cria um Observable simples que não emite nenhum item para o Observer e que emite imediatamente 
    //uma notificação de "Complete" para encerrar o seu ciclo de vida. Por esse motivo é necessário 
    //recarregar a aplicação quando esse erro ocorre. Vimos que os métodos error 
    //e complete encerram o ciclo de vida do Observable. O mesmo ocorre com o catchError.
    catchError(() => {
      this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!'
      return EMPTY
    })*/
  )

  totalDeLivros$ = this.campoBusca.valueChanges
    .pipe(
        debounceTime(300),
        filter((valorDigitado) => valorDigitado.length >= 3),
        switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
        map(resultado => this.livrosResultado = resultado),
        catchError(erro => {
            console.log(erro)
            return of()
        })
    )
    
  // listaLivros: LivroVolumeInfo[]
  // subscription: Subscription
  // livro: Livro

  constructor(private service: LivroService) { }
  
  //Quando um evento acontece, o observable notificará todos os observers e cada observer 
  //puxará as informações de que precisa do observable.
  //O Observer é uma coleção de callbacks que sabe escutar os valores entregues pelo Observable.
  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({ //Assinar um observable é como chamar uma função, fornecendo retornos de chamada para onde os dados serão entregues.
  //     next: (retornoDoObservable) => this.listaLivros = this.livrosResultadoParaLivros(retornoDoObservable), //cada chave aqui representa um tipo de notificação do Observable
  //     error: (erroRetornadoDoObservable) => console.error(erroRetornadoDoObservable),
  //     complete: () => console.log('Observable completado') //a notificação do tipo complete permite notificar o fim do ciclo de vida do Observable
  //   });
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {

    return items.map((item) => {return new LivroVolumeInfo(item)})
  }
  
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}



