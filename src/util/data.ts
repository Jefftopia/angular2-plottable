/// <reference path="../../bower_components/d3/d3.d.ts" />
/// <reference path="../../bower_components/svg-typewriter/svgtypewriter.d.ts" />
/// <reference path="../../bower_components/plottable/plottable.d.ts" />

import {    
    Inject, 
    Injectable
 } from 'angular2/core';

export interface IAxisConfig {
    scale: any,
    position: string
}

@Injectable()
export class PlotReducer {
    
    public area = Plottable.Plots.Area;
    public bar = Plottable.Plots.Bar;
    public clusteredBar = Plottable.Plots.ClusteredBar;
    public line = Plottable.Plots.Line;
    public pie = Plottable.Plots.Pie;
    public rectangle = Plottable.Plots.Rectangle;
    public scatter = Plottable.Plots.Scatter;
    public segment = Plottable.Plots.Segment;
    public stackedArea = Plottable.Plots.StackedArea;
    
    public reduce(type: string) {
        return new (<any>this)[type]();
    }    
    
}

@Injectable()
export class AxisReducer {
    public time = Plottable.Axes.Time;
    public category = Plottable.Axes.Category;
    public numeric = Plottable.Axes.Numeric;    

    public reduce(type: string, scale: any, position: string) {
        return new (<any>this)[type](scale, position);
    }
    
} 

@Injectable()
export class ScaleReducer {
    
    public time = Plottable.Scales.Time;
    public linear = Plottable.Scales.Linear;
    public category = Plottable.Scales.Category;
    public color = Plottable.Scales.Color;
    public log = Plottable.Scales.ModifiedLog;   
    
    public reduce(type: string) {
        return new (<any>this)[type]();       
    }
    
}

/*
* manages plottable plot's table structure; 
not to be confused with data table 
*/
@Injectable()
export class TableManager {
    
    protected _table: { [rowIdx: number]: { [colIdx: number]: Plottable.Component } };

    constructor() {
        this._table = {};
    }
    
    public push(val: Plottable.Component, row?: number, col?: number): void {
        
        if (!this._table[row])
            this._table[row] = [];
            
        this._table[row][col] = val;
        
    }
       
    public buildTable(data: Array<any[]>): void {
        
        data.forEach( (row,i) => {
            
            row.forEach( (item,j) => {
                
              this.push(item, i, j);  
              
            });
            
        });
        
    }

    public getTable(): Plottable.Components.Table {
        
        let table: Array<any[]> = [];
        
        for (let row of Object.keys(this._table)) {
            
            table[row] = [];
            
            for (let col of Object.keys(this._table[row])) {
                
                table[row][col] = this._table[row][col];
                
            }
            
        }
        
        console.log(table);
        
        return new Plottable.Components.Table(table);
        
    }
    
    public indexOf(component: Plottable.Component): string[] {
    
        for (let row of Object.keys(this._table)) {
            
            for (let col of Object.keys(this._table[row])) {
                
                if (this._table[row][col] === component)
                    return [row, col];
                
            }
            
        }
        
    }
    
}

@Injectable()
export class AttributeReducer {
        
    protected _plotReducer: PlotReducer;    
    protected _scaleReducer: ScaleReducer;
    protected _axisReducer: AxisReducer;    
        
    constructor(
        plotReducer: PlotReducer,
        scaleReducer: ScaleReducer,
        axisReducer: AxisReducer
        ) {
        this._plotReducer = plotReducer;
        this._axisReducer = axisReducer;
        this._scaleReducer = scaleReducer;
    }
    
    public reduce(val: any) {
        switch (true) {
            case this.funcExists(this._plotReducer[val]):
                return {
                    reducer: 'plotReducer',
                    func: val
                };
                break;
            case this.funcExists(this._axisReducer[val]):
                return {
                    reducer: 'axisReducer',
                    func: val
                };
                break;
            case this.funcExists(this._scaleReducer[val]):
                return {
                    reducer: 'scaleReducer',
                    func: val
                };
                break;
            default:
                break;
        }
    }
    
    public execute(reducer: string, func: string, params: Object) {
        return this[reducer].reduce.apply(this[reducer], params);
    }
    
    private funcExists(func: Function): Boolean {
        if (func == null)
            return false;
            
        return typeof(Function) === typeof(func);
    }
    
}
