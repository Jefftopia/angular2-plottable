/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />
import { ElementRef } from 'angular2/angular2';
export declare class LinePlot<X> {
    xScale: Plottable.Scales.Category;
    yScale: Plottable.Scales.Linear;
    plot: Plottable.Plots.Line<X>;
    data: any[];
    dataSet: any;
    elementRef: ElementRef;
    constructor(elementRef: ElementRef, data: any);
    render(): void;
}
