import { Component, OnInit } from '@angular/core';
import { Hero } from './hero'
import { HeroService } from './hero.service';
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'partial/heroes.component.html',
  styleUrls: ['partial/heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes'
  selectedHero: Hero
  heroes: Hero[]

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }
  
  ngOnInit(): void {
    this.getHeroes()
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
 // this.heroService.getHeroesSlowly().then(
    this.heroService.getHeroes().then(
      heroes => this.heroes = heroes 
    )
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id ])
  }
}
