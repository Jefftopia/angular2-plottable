/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />
export declare enum plottableScaleType {
    category = 0,
    color = 1,
    linear = 2,
    ModifiedLog = 3,
    time = 4,
    interpolatedColor = 5,
}
export interface IAPScale {
    type: plottableScaleType;
    params?: string[];
}
export declare class Scale<D, R> {
    scale: Plottable.Scales.Category | Plottable.Scales.Color | Plottable.Scales.Linear | Plottable.Scales.ModifiedLog | Plottable.Scales.Time | Plottable.Scales.InterpolatedColor;
    scaleType: plottableScaleType;
    constructor(options: IAPScale);
}
