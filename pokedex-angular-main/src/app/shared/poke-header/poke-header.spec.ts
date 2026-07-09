import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeHeader } from './poke-header';

describe('PokeHeader', () => {
  let component: PokeHeader;
  let fixture: ComponentFixture<PokeHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
