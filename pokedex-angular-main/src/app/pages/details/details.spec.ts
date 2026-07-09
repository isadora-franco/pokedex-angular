import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { Details } from './details';
import { PokeApi } from '../../service/poke-api';

const pokemonMock = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: [{ type: { name: 'grass' } }],
  stats: [{ base_stat: 45, stat: { name: 'hp' } }],
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: {
    front_default: 'assets/pokemon.png',
    other: {
      dream_world: { front_default: 'assets/pokemon.png' },
      'official-artwork': { front_default: 'assets/pokemon.png', front_shiny: 'assets/pokemon.png' }
    }
  }
};

const speciesMock = {
  flavor_text_entries: [
    { flavor_text: 'A strange seed was planted on its back at birth.', language: { name: 'en' } }
  ]
};

const pokeApiMock = {
  apiGetPokemon: (url: string) => of(url.includes('pokemon-species') ? speciesMock : pokemonMock)
};

const activatedRouteMock = {
  paramMap: of(convertToParamMap({ id: '1' }))
};

const routerMock = {
  navigate: () => Promise.resolve(true)
};

describe('Details', () => {
  let component: Details;
  let fixture: ComponentFixture<Details>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Details],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PokeApi, useValue: pokeApiMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Details);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
