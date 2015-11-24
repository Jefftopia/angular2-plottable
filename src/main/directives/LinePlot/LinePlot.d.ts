/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />
import { Host } from "angular2/angular2";
export declare class LinePlot {
    xScale: Plottable.Scales.Category;
    yScale: Plottable.Scales.Linear;
    plot: Plottable.Plots.Line;
    data: any[];
    dataSet: any;
    elementRef: Host;
    constructor(elementRef: Host);
    render(): void;
}
