import { Injectable } from 'angular2/core';
import { HEROES } from './mock-heroes'; 

@Injectable()
export class HeroService {
    
    public getHeroes() {
        
        return HEROES; 
        
    }
    
}