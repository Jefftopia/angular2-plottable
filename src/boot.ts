import { bootstrap } from 'angular2/platform/browser';
import { provide, Component, OnInit } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { ChartComponent } from './demo.component';

@Component({
    selector: 'root',
    directives: [ChartComponent, FORM_DIRECTIVES],
    template: `
    <div>
        <label>
            Change X Scale
            <select>
                <option>linear<option>
                <option>log</option>
                <option>time</option>
                <option>color</option>
                <option>category</option>
            </select>
        </label>
        <label>
            Change X Axis
            <select>
                <option>category</option>
                <option>numeric</option>
                <option>time</option>
            </select>
        </label>
        <button (click)="changeXScale()">Change xScale</button>
    </div>
    <chart
        [type]="type"
        [data]="data"
        [x-axis]="xAxis"
        [x-axis-position]="xAxisPosition"
        [y-axis]="yAxis"
        [y-axis-position]="yAxisPosition"
        [x-scale]="xScale"
        [y-scale]="yScale"
        >
    </chart>
    `
})
export class Root implements OnInit {
    
    public type: string;    
    
    public data: any[];
    
    public xAxis: string;
    
    public xAxisPosition: string;
    
    public yAxis: string;
    
    public xScale: string;
    
    public yScale: string;
    
    public yAxisPosition: string;    
    
    constructor() {
        console.log('create root');
    }
    
    ngOnInit(): void {
        
        this.xAxis = 'numeric';
        this.yAxis = 'numeric';
                
        this.xAxisPosition = 'bottom'        
        this.yAxisPosition = 'left';
        
        this.type = "line";
        
        this.xScale = 'linear';
        this.yScale = "linear";        
        
        this.data = [
            { "x": 0, "y": 1 },
            { "x": 1, "y": 2 },
            { "x": 2, "y": 4 },
            { "x": 3, "y": 8 },
            { "x": 4, "y": 16 }
        ];                
        
    }
    
    public changeXScale(): void {
        this.xScale = 'log';
    }
    
}

bootstrap(Root);