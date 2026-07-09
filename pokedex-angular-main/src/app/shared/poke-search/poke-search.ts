import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'poke-search',
  standalone: false,
  templateUrl: './poke-search.html',
  styleUrl: './poke-search.scss',
})
export class PokeSearch {
  @Input() public value: string = '';
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter<string>();

  public search(value: string): void {
    this.emmitSearch.emit(value);
  }
}
