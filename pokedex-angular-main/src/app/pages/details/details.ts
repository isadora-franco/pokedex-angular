import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApi } from '../../service/poke-api';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  private readonly urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any[] = [];
  public isLoading: boolean = false;
  public apiError: boolean = false;
  public isShiny: boolean = false;
  public isCaptured: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApi,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id') || '1';
      this.getPokemon(id);
    });
  }

  public get pokemonData(): any {
    return this.pokemon[0] || {};
  }

  public get pokemonSpecies(): any {
    return this.pokemon[1] || {};
  }

  public get pokemonId(): number {
    return this.pokemonData.id || 0;
  }

  public get pokemonSprite(): string {
    const sprites = this.pokemonData.sprites || {};

    if (this.isShiny) {
      return sprites.other?.['official-artwork']?.front_shiny
        || sprites.front_shiny
        || this.defaultSprite;
    }

    return sprites.other?.dream_world?.front_default
      || sprites.other?.['official-artwork']?.front_default
      || sprites.front_default
      || this.defaultSprite;
  }

  public get pokemonTypes(): any[] {
    return this.pokemonData.types || [];
  }

  public get pokemonStats(): any[] {
    return this.pokemonData.stats || [];
  }

  public get pokemonAbilities(): string {
    const abilities = this.pokemonData.abilities || [];

    return abilities
      .map((item: any) => item.ability.name.replace('-', ' '))
      .join(', ');
  }

  public get flavorText(): string {
    const entries = this.pokemonSpecies.flavor_text_entries || [];
    const entry = entries.find((item: any) => item.language.name === 'en') || entries[0];

    return entry?.flavor_text
      ?.replace(/\f/g, ' ')
      ?.replace(/\n/g, ' ')
      || 'Dados de campo indisponíveis para este Pokémon.';
  }

  public get formattedHeight(): string {
    return `${((this.pokemonData.height || 0) / 10).toFixed(1)} m`;
  }

  public get formattedWeight(): string {
    return `${((this.pokemonData.weight || 0) / 10).toFixed(1)} kg`;
  }

  private get defaultSprite(): string {
    return 'assets/pokemon.png';
  }

  public toggleShiny(): void {
    this.isShiny = !this.isShiny;
  }

  public toggleCaptured(): void {
    const capturedIds = this.getCapturedIds();

    if (this.isCaptured) {
      this.saveCapturedIds(capturedIds.filter(id => id !== this.pokemonId));
    } else {
      this.saveCapturedIds([...capturedIds, this.pokemonId]);
    }

    this.isCaptured = !this.isCaptured;
  }

  public goToPokemon(direction: number): void {
    const nextId = this.pokemonId + direction;

    if (nextId >= 1 && nextId <= 151) {
      this.router.navigate(['/details', nextId]);
    }
  }

  public getPokemonColor(): string {
    const type = this.pokemonTypes[0]?.type?.name || 'normal';
    return `var(--type-${type})`;
  }

  public formatStatName(statName: string): string {
    return statName.replace('-', ' ');
  }

  public getStatPercent(value: number): number {
    return Math.min(100, Math.round((value / 150) * 100));
  }

  public getPokemon(id: string): void {
    this.isLoading = false;
    this.apiError = false;
    this.isShiny = false;

    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.isCaptured = this.getCapturedIds().includes(this.pokemonId);
        this.isLoading = true;
        this.cdr.detectChanges();
      },
      () => {
        this.apiError = true;
      }
    );
  }

  private getCapturedIds(): number[] {
    const saved = localStorage.getItem('capturedPokemons');
    return saved ? JSON.parse(saved) : [];
  }

  private saveCapturedIds(ids: number[]): void {
    localStorage.setItem('capturedPokemons', JSON.stringify(ids));
  }
}
