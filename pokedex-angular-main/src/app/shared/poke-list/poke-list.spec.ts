import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { PokeList } from './poke-list';
import { PokeApi } from '../../service/poke-api';

const pokeApiMock = {
  apiListAllPokemons: of({ results: [] })
};

const routerMock = {
  navigate: () => Promise.resolve(true)
};

describe('PokeList', () => {
  let component: PokeList;
  let fixture: ComponentFixture<PokeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeList],
      providers: [
        { provide: PokeApi, useValue: pokeApiMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
