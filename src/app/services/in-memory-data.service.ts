import { Injectable } from '@angular/core';
//importa um modolo que simula um rest api, é utilizado quando o back-end não está concluído, ou seja, para testes, contém operações basicas do CRUD
import { InMemoryDbService } from 'angular-in-memory-web-api';
//importa a interface hero
import { Hero } from '../hero';

//declara um injetor dentro no seletor root(arquivo principal do componente principal), ou seja, torna esse arquivo a serviço do app-component
//nesse caso ele vai injetar dependencia no arquivo principal pois n contem constructor
@Injectable({
  providedIn: 'root',
})
//exporta uma classe deixando-a pública para outros arquivos poderem usar, cria uma database interno que será implementado no MemoryDbService
export class InMemoryDataService implements InMemoryDbService {
  //metódo que cria um database
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice ' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    //retorna o vetor estático
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}