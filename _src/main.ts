/// <reference path="../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />

import 'reflect-metadata';
import 'es6-shim';

import { Component, View, Directive, Inject, bootstrap, CORE_DIRECTIVES, provide, ViewChild, ElementRef } from 'angular2/angular2';

namespace ap {
    
    const data = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 },
            { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 5 }];
    
    @Directive({
        selector: 'type',
        inputs: [
            'text: data'
        ]
    })
    export class Test {
        
        constructor() {
            
            console.log('New Type directive');
            
            console.log('type directive this', this);
            
        }
        
    }
    
    @Component({
        selector: 'ap-demo',
        templateUrl: './src/apDemo.html',    
        directives: [Test]
    })    
    export class Core {
        
        elementRef: ElementRef;
        
        constructor(@Inject(ElementRef) elementRef: ElementRef) {
            
            console.log('New Core');
            
            this.elementRef = elementRef;
            
            console.log('core this', this);
            
            console.log('elementRef', this.elementRef);
            
        }    
        
    }
    
}

bootstrap(ap.Core, []);