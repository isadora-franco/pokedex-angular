import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { PokeHeader } from './poke-header/poke-header';
import { PokeSearch } from './poke-search/poke-search';
import { PokeList } from './poke-list/poke-list';
import { PokeExplorerPanel } from './poke-explorer-panel/poke-explorer-panel';
import { PokeEmptyState } from './poke-empty-state/poke-empty-state';

@NgModule({
  declarations: [
    PokeHeader,
    PokeSearch,
    PokeList,
    PokeExplorerPanel,
    PokeEmptyState,
  ],
  exports: [
    PokeHeader,
    PokeSearch,
    PokeList,
    PokeExplorerPanel,
    PokeEmptyState,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }