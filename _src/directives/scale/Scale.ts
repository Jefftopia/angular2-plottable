/// <reference path="../../../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../../../bower_components/plottable/plottable.d.ts" />

import { Directive, Inject } from "angular2/angular2";

// color scale params: Category10"/"Category20"/"Category20b"/"Category20c

export enum plottableScaleType {
	category = 0,
	color = 1,
	linear = 2,
	ModifiedLog = 3,
	time = 4,	
	//not implemented
	interpolatedColor = 5
}

export interface IAPScale {
	type: plottableScaleType,
	params?: string[]
}

@Directive({
	selector: 'scale'
})
export class Scale<D, R> {

	scale: Plottable.Scales.Category|Plottable.Scales.Color|Plottable.Scales.Linear|Plottable.Scales.ModifiedLog|Plottable.Scales.Time|Plottable.Scales.InterpolatedColor;
	
	scaleType: plottableScaleType;
	
	constructor(options: IAPScale) {
		
		this.scaleType = options.type;
		
		switch (options.type) {
			case 0:
				this.scale = new Plottable.Scales.Category();
				break;
			case 1:
				this.scale = new Plottable.Scales.Color();
				break;
			case 2:
				this.scale = new Plottable.Scales.Linear();
				break;
			case 3:
				this.scale = new Plottable.Scales.ModifiedLog(1);
				break;
			case 4:
				this.scale = new Plottable.Scales.Time();
				break;
			case 5:
				this.scale = new Plottable.Scales.InterpolatedColor();
			default:
				this.scale = new Plottable.Scales.Category();
 
		}
		
	}
	
}