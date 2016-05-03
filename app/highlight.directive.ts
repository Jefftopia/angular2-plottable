 import { Directive, ElementRef, Input } from 'angular2/core';
 
 namespace Shapes {
    
    @Directive({
    selector: '[my-highlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
    })
    export class HighlightDirective {
        
        @Input('my-highlight') color: string;
        
        @Input() set defaultColor(colorName: string) {
            
            this._defaultColor = colorName || this._defaultColor;
            
        }   
        
        public el: ElementRef;
        
        protected _defaultColor: string = 'yellow';
        
        constructor(el: ElementRef) {
            
            this.el = el; 
            
            }
        
        public onMouseEnter(): void {
            
            console.log(this.color);
            
            this.highlightColor(this.color || this._defaultColor);
            
        }
        
        public onMouseLeave(): void {
            
            this.highlightColor(null);
            
        }
        
        private highlightColor(color: string): void {
            
            this.el.nativeElement.style.backgroundColor = color;
            
        }
        
    }
    
 }