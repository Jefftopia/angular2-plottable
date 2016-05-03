/// <reference path="../bower_components/svg-typewriter/svgtypewriter.d.ts" />
/// <reference path="../bower_components/plottable/plottable.d.ts" />
/// <reference path="../bower_components/d3/d3.d.ts" />

import { Component, OnInit, OnChanges, ElementRef,Input, SimpleChange } from 'angular2/core';
import { 
    AxisReducer, 
    ScaleReducer, 
    PlotReducer, 
    IAxisConfig,
    AttributeReducer,
    TableManager
 } from './util/data';

type Scale = Plottable.Scales.Category|Plottable.Scales.Color|Plottable.Scales.Linear|Plottable.Scales.ModifiedLog|Plottable.Scales.Time|Plottable.Scales.InterpolatedColor;

type Plot = Plottable.Plots.Area<any>|Plottable.Plots.Bar<any,any>|Plottable.Plots.ClusteredBar<any,any>|Plottable.Plots.Line<any>|Plottable.Plots.Pie|Plottable.Plots.Rectangle<any,any>|Plottable.Plots.Scatter<any,any>|Plottable.Plots.Segment<any,any>|Plottable.Plots.StackedArea<any>;

/*
        [attr.data]
        [attr.x-axis]
        [attr.x-axis-position]
        [attr.y-axis]
        [attr.y-axis-position]
        [attr.x-scale]
        [attr.y-scale]
*/

@Component({
    selector: 'chart',
    providers: [ScaleReducer, AxisReducer, PlotReducer, AttributeReducer, TableManager],
    directives: [],
    template: `
    <div>
        <button (click)="render()">Render</button> 
        <button (click)="redraw()">Redraw</button>
    </div>
    <div>
    </div>
    `
})
export class ChartComponent implements OnInit, OnChanges {
    
    @Input('type') plot: string;
    
    @Input() data: any[];
        
    @Input('x-axis') xAxis: string;
    
    @Input('x-axis-position') xAxisPosition: string;
    
    @Input('x-scale') xScale: string;
    
    @Input('y-axis') yAxis: string;
    
    @Input('y-axis-position') yAxisPosition: string;
    
    @Input('y-scale') yScale: string;
    
    protected _el: ElementRef;    
    
    protected _plot: Plot;
    
    protected _dataset: Plottable.Dataset;
    
    protected _yAxis: Plottable.Axis<any>;
    
    protected _xAxis: Plottable.Axis<any>;  
    
    protected _xScale: Scale;
    
    protected _yScale: Scale;
    
    protected _svg: any;
    
    protected _axisReducer: AxisReducer;
    
    protected _scaleReducer: ScaleReducer;
    
    protected _plotReducer: PlotReducer;
    
    protected _table: Plottable.Components.Table;
        
    protected _attrReducer: AttributeReducer;
    
    protected _tableManager: TableManager;
   
    constructor(
        el: ElementRef, 
        axisReducer: AxisReducer, 
        scaleReducer: ScaleReducer,
        plotReducer: PlotReducer,
        attrReducer: AttributeReducer,
        tableManager: TableManager
    ) { 
        this._el = el;
        this._axisReducer = axisReducer;
        this._scaleReducer = scaleReducer;
        this._plotReducer = plotReducer;
        this._attrReducer = attrReducer;
        this._tableManager = tableManager;
    }
    
    ngOnInit(): void {
        
        this._svg = d3.select(this._el.nativeElement).append('svg');
        
        this._dataset = new Plottable.Dataset(this.data); 
        
        // this._plot = this._plotReducer.reduce(this.plot);
        
    }
    
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
        
        for (let prop of Object.keys(changes)) {
            
            let data = this._attrReducer.reduce(changes[prop].currentValue);
            
            if (data == null)
                continue;
            
            let _prop = '_'+prop;
            let params = [changes[prop].currentValue];
            
            if (data.reducer === 'axisReducer') {
                if (prop === 'xAxis') {
                    params.push(this._xScale ? this._xScale : this._scaleReducer.reduce(this.xScale));
                    params.push(this.xAxisPosition);
                } else if (prop === 'yAxis') {
                    params.push(this._yScale ? this._yScale : this._scaleReducer.reduce(this.yScale));
                    params.push(this.yAxisPosition);
                }
            }
            
            console.log(_prop);
            
            this[_prop] = this._attrReducer.execute('_'+data.reducer, data.func, params);
            
         }
        
    }
    
    private generateData(points: number, step: number, slope: number): any {
        
        let msPerDay: number = 86400000;
        
        let data: any = [];
        
        for(var i = 0; i < points * step; i += step) {
            data.push({x: new Date(i * msPerDay), y: i * slope});
        }
  
        return data;
        
    }
    
    protected remove(item: Plottable.Component): this {
        this._table.remove(item);
        return this;
    }
    
    protected add(item: Plottable.Component, row: number, col: number): this {
        this._table.add(item, row, col);
        return this;
    }
    
    public redraw(previous: Plottable.Component, newVal: Plottable.Component): this {
        let idx = this._tableManager.indexOf(previous);
        this.remove(previous).add(newVal, parseInt(idx[0]), parseInt(idx[1]));
        return this;
    }
    
    protected removeDataset(): this {
        this._plot.removeDataset(this._dataset);
        return this;
    }
    
    protected addDataset(): this {
        this._plot.addDataset(this._dataset);
        return this;
    }
        
    public render(): void {
        
        //todo data manager...
        (<any>this._plot).x(function(d: any) { return d.x; }, (<any>this._xScale));
        (<any>this._plot).y(function(d: any) { return d.y; }, (<any>this._yScale));

        //todo layout manager...see ViewChild (?)
        let dat: any = [
            [this._yAxis, this._plot],
            [null, this._xAxis]
        ];
        
        this._tableManager.buildTable(dat);
        this._table = this._tableManager.getTable();

        this._table.renderTo(this._svg);
                
    }
    
}
