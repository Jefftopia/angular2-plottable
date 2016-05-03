import { Directive, Input, TemplateRef, ViewContainerRef } from 'angular2/core';    
       
namespace Shapes {
     
    @Directive({
        selector: '[myUnless]'
    })
    export class UnlessDirective {
        
        private templateRef: TemplateRef;
        
        private viewContainer: ViewContainerRef;    
        
        @Input() set myUnless(condition: boolean) {
            
            if (!condition) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
            
        }
        
        constructor(templateRef: TemplateRef, viewContainer: ViewContainerRef) {
            
            this.templateRef = templateRef;
            
            this.viewContainer = viewContainer;

        }
        
    }
     
 }