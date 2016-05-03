import { Component, EventEmitter, OnInit, OnChanges, Input, ElementRef, Inject, SimpleChange } from 'angular2/core';
import { IAxisConfig, AxisReducer, ScaleReducer, PlotReducer } from '../util/data';

type Scale = Plottable.Scales.Category|Plottable.Scales.Color|Plottable.Scales.Linear|Plottable.Scales.ModifiedLog|Plottable.Scales.Time|Plottable.Scales.InterpolatedColor;

type Plot = Plottable.Plots.Area<any>|Plottable.Plots.Bar<any,any>|Plottable.Plots.ClusteredBar<any,any>|Plottable.Plots.Line<any>|Plottable.Plots.Pie|Plottable.Plots.Rectangle<any,any>|Plottable.Plots.Scatter<any,any>|Plottable.Plots.Segment<any,any>|Plottable.Plots.StackedArea<any>;

abstract class _Plot implements OnInit {
    
    @Input() data: any[];
    
    @Input('type') type: string;    
    
    protected _el: ElementRef;    
    
    protected _plot: Plot;
    
    protected _dataset: Plottable.Dataset;
    
    protected _svg: any;
    
    protected _plotReducer: PlotReducer;
    
    constructor(@Inject(ElementRef) el: ElementRef, @Inject(PlotReducer) plotReducer) {
        this._el = el;
        this._plotReducer = plotReducer;
    }
    
    ngOnInit(): void {
        this._dataset = new Plottable.Dataset(this.data);
    }
    
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
        
    }
    
    public redraw(): void {
        this.destroyEach();
        this.renderEach();
    }
    
    protected renderEach(): void {
        this._plot.render();        
    }
    
    protected destroyEach(): void {
        this._plot.destroy();    
    }
    
}

export interface IXYPlotConfig {
    el: ElementRef,
    axisService: AxisReducer,
    scaleService: ScaleReducer
}

abstract class XYPlot<X,Y> extends _Plot {
    
    @Input('x-axis') xAxis: string;
    
    @Input('x-axis-config') xAxisConfig: IAxisConfig;
    
    @Input('y-axis') yAxis: string;
    
    @Input('y-axis-config') xScale: string;
    
    @Input('y-scale') yScale: string;
    
    @Input('y-axis-config') yAxisConfig: IAxisConfig;
                
    protected _yAxis: Plottable.Axis<any>;
    
    protected _xAxis: Plottable.Axis<any>;  
    
    protected _xScale: Scale;
    
    protected _yScale: Scale;
        
    protected _axisReducer: AxisReducer;
    
    protected _scaleReducer: ScaleReducer;
    
    constructor(
        @Inject(ElementRef) el: ElementRef, 
        @Inject(AxisReducer) axisReducer, 
        @Inject(ScaleReducer) scaleReducer,
        @Inject(PlotReducer) plotReducer
    ) {
        super(el, plotReducer);
        this._axisReducer = axisReducer;
        this._scaleReducer = scaleReducer;
    }
    
    ngOnInit(): void {
        
    }
    
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
        
    }
    
}

export class LineChart<X> extends XYPlot<X, number> {
    
}