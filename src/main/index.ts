/// <reference path="../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/angular2/http.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/angular2/router.d.ts" />
/// <reference path="directives/LinePlot/LinePlot.ts" />

import { Component, View, bootstrap, CORE_DIRECTIVES, provide, ViewChild } from 'angular2/angular2';
import { LinePlot } from "./directives/LinePlot/LinePlot";

namespace app {
        
    @Component({
        selector: 'plottable-app',
        directives: [LinePlot],
        templateUrl: 'PlotRoot.html'
    })
//    @RouteConfig([
//        { path: '/', component: MatchesView, as: 'Matches' },
//        { path: '/matches', component: MatchesView, as: 'Matches' },
//        { path: '/match-details:matchId', component: MatchDetailsView, as: 'MatchDetails'}
//    ])
    export class RootPlotDemoComponent {
    
        linePlot: LinePlot;
        
        constructor(linePlot: LinePlot) {
            
            this.linePlot = linePlot;
            
            console.log('New Root');
                                    
        }
           
    }
            
}

bootstrap(app.RootPlotDemoComponent, [LinePlot]);