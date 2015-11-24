/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />

import { Directive, Host } from "angular2/angular2";

@Directive({
    selector: 'line-plot',
    providers: [Host]
})    
export class LinePlot {

    xScale: Plottable.Scales.Category;
    
    yScale: Plottable.Scales.Linear;
    
    plot: Plottable.Plots.Line;
    
    data: any[];
    
    dataSet: any;
    
    elementRef: Host;
    
    constructor(elementRef: Host) {
        
        console.log('new lineplot');
        
        this.elementRef = Host;
        
        console.log(elementRef);
        
        this.xScale = new Plottable.Scales.Category();
        
        this.yScale = new Plottable.Scales.Linear();
        
        this.data = [{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 2 },
            { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 5 }];
        
        this.dataSet = new Plottable.Dataset(this.data)
        
        this.plot = new Plottable.Plots.Line()
            .addDataset(new Plottable.Dataset(this.data))
            .x(function(d) { return d.x; }, this.xScale)
            .y(function(d) { return d.y; }, this.yScale)
        
        this.render();
        
    }
    
    render(): void {
        
        this.plot.renderTo("svg#line-plot");
        
    }
    
}