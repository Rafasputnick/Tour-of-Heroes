//arquivo de serviços do hero em geral

//importação do decorator injectable
import { Injectable } from '@angular/core';
//importação pattern observabe e operaçãoes de cathError e tap da bib rxjs que é uma biblioteca em js baseada em reactive x, programação reativa
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
//padroes para usar http em angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
//importação interface hero
import { Hero } from '../hero';
//importação do serviço de mensagens
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })

export class HeroService 
{
  constructor
  (
    private http: HttpClient,
    private messageService: MessageService
  ){}
  
  //aplica o metedo de mensagens
  private log(message: string) 
  {
    this.messageService.add(`HeroService: ${message}`);
  }

   // URL to web api
  private heroesUrl = 'api/heroes'; 
 
  //metódo que pega o observable de hero
  public getHeroes():Observable <Hero[]> 
  {
    return this.http.get <Hero[]> (this.heroesUrl)
    .pipe
    (
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  //pega hero pelo id
  public getHero(id:number):Observable <Hero> 
  {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe
    (
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //dedclara o httpOptions
  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
  //faz update do hero no server
  public updateHero(hero: Hero): Observable<any> 
  {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe
    (
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  //posta um novo hero no server
  public addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  //deleta um hero no server
  public deleteHero(hero: Hero | number): Observable<Hero> 
  {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  //encontra hero pela lupa
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) 
    {
      return of([]);
    }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) 
          :
          this.log(`no heroes matching "${term}"`)),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  //error compilado no server
  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error:any):Observable<T> => 
    {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}