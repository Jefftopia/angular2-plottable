import {Component} from 'angular2/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent, Hero } from './hero-detail.component';

@Component({
    selector: 'my-app',
    directives: [HeroDetailComponent],
    providers: [HeroService],
    styles:[`
        .selected {
            background-color: #CFD8DC !important;
            color: white;
        }
        .heroes {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 10em;
        }
        .heroes li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0em;
            height: 1.6em;
            border-radius: 4px;
        }
        .heroes li.selected:hover {
            color: white;
        }
        .heroes li:hover {
            color: #607D8B;
            background-color: #EEE;
            left: .1em;
        }
        .heroes .text {
            position: relative;
            top: -3px;
        }
        .heroes .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0em 0.7em;
            background-color: #607D8B;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0px 0px 4px;
        }
    `],
    template:`
    <h1>{{title}}</h1>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>    
    <ul class="heroes">
        <li *ngFor="#hero of heroes" 
            (click)="onSelect(hero)"
            [class.selected]="hero === selectedHero">
        <span class="badge">{{ hero.id }}</span> {{ hero.name }}
        </li>    
    </ul>
    `
})
export class AppComponent {
    
  public title: string = 'Tour of Heroes';
  
  public heroes: Hero[];
  
  public selectedHero: Hero;
  
  private heroService: HeroService; 
  
  constructor(heroService: HeroService) {
      
      this.heroService = heroService;
        
      this.getHeroes();
      
  }
  
  public getHeroes(): void {
      
      this.heroes = this.heroService.getHeroes();
      
  }
  
  protected onSelect(hero: Hero): void {
      
      this.selectedHero = hero;
      
  }
  
}