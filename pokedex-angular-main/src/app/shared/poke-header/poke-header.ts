import { Component, OnInit } from '@angular/core';
import { ETheme } from '../enums/ETheme.enum';

@Component({
  selector: 'poke-header',
  standalone: false,
  templateUrl: './poke-header.html',
  styleUrl: './poke-header.scss',
})
export class PokeHeader implements OnInit {
    public icon: string = ETheme.ICON_MOON;
    public textTheme: string = ETheme.TEXT_MOON;

    constructor() {}

    ngOnInit(): void {}

  public toggle() {
    const theme = document.body.classList.toggle('light-theme');

    if (theme) {
      this.textTheme = ETheme.TEXT_MOON;
      return (this.icon = ETheme.ICON_MOON);
    }

    this.textTheme = ETheme.TEXT_SUN;
    return (this.icon = ETheme.ICON_SUN);
  }
}

