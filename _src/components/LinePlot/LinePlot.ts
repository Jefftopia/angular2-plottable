/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />
/// <reference path-"../../directives/scale/Scale.ts" />

import { Component, ElementRef, Inject } from 'angular2/angular2';
import { Scale } from '../../directives/scale/Scale';

@Component({
    selector: 'line-plot',
    templateUrl: 'LinePlot.html',
    directives: [Scale]
})    
export class LinePlot<X> {

    xScale: Plottable.Scales.Category;
    
    yScale: Plottable.Scales.Linear;
    
    plot: Plottable.Plots.Line<X>;
    
    data: any[];
    
    dataSet: any;
    
    elementRef: ElementRef;
    
    constructor(@Inject(ElementRef) elementRef: ElementRef, data: any) {
        
        console.log('new lineplot');
        
        this.elementRef = elementRef;
        
        console.log(elementRef);
        
        this.xScale = new Plottable.Scales.Category();
        
        this.yScale = new Plottable.Scales.Linear();
        
        this.dataSet = new Plottable.Dataset(data)
        
        this.plot = new Plottable.Plots.Line();
        
        this.plot.addDataset(this.dataSet);
        
        this.plot.x(function(d) { return d.x; }, this.xScale);
        
        this.plot.y(function(d) { return d.y; }, this.yScale);
                        
        this.render();
        
    }
    
    render(): void {
        
        console.log(this.elementRef.nativeElement);
        
        this.plot.renderTo(this.elementRef.nativeElement);
        
    }
    
}