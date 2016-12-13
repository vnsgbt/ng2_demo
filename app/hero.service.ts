import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes'
    private headers = new Headers({'Content-Type':'application/json'})
    
    constructor(private http: Http){}
    
    getHeroes(): Promise<Hero[]> {
        // return Promise.resolve(HEROES)
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(resp => resp.json().data as Hero[])
            .catch(this.handleError)
    }
    private handleError(err: any): Promise<any> {
        console.error('Error: ', err)
        return Promise.reject(err.message || err)
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes())
    }
    getHero(id: number): Promise<Hero> {
        let url = `${this.heroesUrl}/${id}`
        // return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id))
        return this.http.get(url)
            .toPromise()
            .then(resp => resp.json().data as Hero)
            .catch(this.handleError)
    }
    update(hero: Hero): Promise<Hero> {
        let url = `${this.heroesUrl}/${hero.id}`
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(()=>hero)
            .catch(this.handleError)
    }
}
