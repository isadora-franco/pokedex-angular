import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'poke-explorer-panel',
  standalone: false,
  templateUrl: './poke-explorer-panel.html',
  styleUrl: './poke-explorer-panel.scss',
})
export class PokeExplorerPanel {
  @Input() public total: number = 0;
  @Input() public visible: number = 0;
  @Input() public captured: number = 0;
  @Input() public types: string[] = [];
  @Input() public activeType: string = 'all';

  @Output() public typeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public randomPokemon: EventEmitter<void> = new EventEmitter<void>();
  @Output() public clearFilters: EventEmitter<void> = new EventEmitter<void>();

  public selectType(type: string): void {
    this.typeChange.emit(type);
  }

  public surprise(): void {
    this.randomPokemon.emit();
  }

  public clear(): void {
    this.clearFilters.emit();
  }
}
