import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'poke-empty-state',
  standalone: false,
  templateUrl: './poke-empty-state.html',
  styleUrl: './poke-empty-state.scss',
})
export class PokeEmptyState {
  @Input() public searchTerm: string = '';
  @Input() public activeType: string = 'all';

  @Output() public clearFilters: EventEmitter<void> = new EventEmitter<void>();

  public clear(): void {
    this.clearFilters.emit();
  }
}
