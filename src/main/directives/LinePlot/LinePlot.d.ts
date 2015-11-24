/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />
import { HostViewRef } from "angular2/angular2";
export declare class LinePlot {
    xScale: Plottable.Scales.Category;
    yScale: Plottable.Scales.Linear;
    plot: Plottable.Plots.Line;
    data: any[];
    dataSet: any;
    elementRef: HostViewRef;
    constructor(elementRef: HostViewRef);
    render(): void;
}
