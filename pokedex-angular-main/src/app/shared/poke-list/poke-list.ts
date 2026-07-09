import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApi } from '../../service/poke-api';

@Component({
  selector: 'poke-list',
  standalone: false,
  templateUrl: './poke-list.html',
  styleUrl: './poke-list.scss',
})
export class PokeList implements OnInit {
  private setAllPokemons: any[] = [];

  public getAllPokemons: any[] = [];
  public apiError: boolean = false;
  public isLoading: boolean = true;
  public searchTerm: string = '';
  public activeType: string = 'all';
  public capturedIds: number[] = [];

  constructor(
    private pokeApiService: PokeApi,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCapturedPokemons();

    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.apiError = true;
        this.isLoading = false;
      }
    );
  }

  public get allTypes(): string[] {
    const types = this.setAllPokemons.flatMap((pokemon: any) => {
      return pokemon.status?.types.map((value: any) => value.type.name) || [];
    });

    return Array.from(new Set(types)).sort();
  }

  public get totalCount(): number {
    return this.setAllPokemons.length;
  }

  public get capturedCount(): number {
    return this.capturedIds.length;
  }

  public getSearch(value: string): void {
    this.searchTerm = value.trim().toLowerCase();
    this.applyFilters();
  }

  public setTypeFilter(type: string): void {
    this.activeType = type;
    this.applyFilters();
  }

  public resetFilters(): void {
    this.searchTerm = '';
    this.activeType = 'all';
    this.getAllPokemons = this.setAllPokemons;
  }

  public surpriseMe(): void {
    const list = this.getAllPokemons.length ? this.getAllPokemons : this.setAllPokemons;
    const pokemon = list[Math.floor(Math.random() * list.length)];

    if (pokemon?.status?.id) {
      this.router.navigate(['/details', pokemon.status.id]);
    }
  }

  public getPokemonImage(pokemon: any): string {
    return pokemon.status?.sprites?.other?.dream_world?.front_default
      || pokemon.status?.sprites?.other?.['official-artwork']?.front_default
      || pokemon.status?.sprites?.front_default
      || 'assets/pokemon.png';
  }

  public isCaptured(id: number): boolean {
    return this.capturedIds.includes(id);
  }

  public toggleCaptured(event: MouseEvent, id: number): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isCaptured(id)) {
      this.capturedIds = this.capturedIds.filter(capturedId => capturedId !== id);
    } else {
      this.capturedIds = [...this.capturedIds, id];
    }

    localStorage.setItem('capturedPokemons', JSON.stringify(this.capturedIds));
  }

  public getCardDelay(index: number): string {
    return `${Math.min(index, 12) * 45}ms`;
  }

  private applyFilters(): void {
    const filtered = this.setAllPokemons.filter((pokemon: any) => {
      const hasName = pokemon.name.toLowerCase().includes(this.searchTerm);
      const hasType = this.activeType === 'all'
        || pokemon.status?.types.some((value: any) => value.type.name === this.activeType);

      return hasName && hasType;
    });

    this.getAllPokemons = filtered;
  }

  private loadCapturedPokemons(): void {
    const saved = localStorage.getItem('capturedPokemons');

    if (saved) {
      this.capturedIds = JSON.parse(saved);
    }
  }
}
