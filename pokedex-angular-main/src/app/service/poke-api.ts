import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokeApi {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      switchMap(res => {
        const allPokemons = res.results.map((resPokemons: any) => {
          return this.apiGetPokemon(resPokemons.url).pipe(
            map(status => {
              resPokemons.status = status;
              return resPokemons;
            })
          );
        });

        return forkJoin(allPokemons).pipe(
          map(() => res)
        );
      })
    )
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.http.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
}