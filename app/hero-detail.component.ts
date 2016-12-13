import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'
import 'rxjs/add/operator/switchMap'

import { HeroService } from './hero.service'
import { Hero } from './hero'

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'partial/hero-detail.component.html',
  styleUrls: ['partial/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero
    
    constructor(
      private heroService: HeroService,
      private route: ActivatedRoute,
      private location: Location 
    ){}

    ngOnInit() {
      this.route.params
      .switchMap((params: Params)=> this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero)
    }

    goBack() {
      this.location.back()
    }

    save() {
      this.heroService.update(this.hero)
        .then(()=>this.goBack())
    }
}
