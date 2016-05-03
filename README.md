##Purpose

This project aims to marry Plottable JS with Angular 2. 

**Plottable JS**
Plottable JS is an emerging library of reusable chart components 
that adds a level of sophistication and abstration on top of D3. It's an important tool for rapidly creating 
attractive, interactive, and *flexible* charts - something most charting libraries miss.

**Angular 2**
Angular 2 is the bleeding-edge successor to the well-known Angular MVC development framework. Angular 2 is faster, leaner,
more flexible, than it's predecessor with the added benefit of being authored in TypeScript.

###Angular 2 + Plottable
I hope by now the benefit of marrying these two libraries is clear: Plottable provides the logic to create charts, 
and Angular 2 provides Components, the mature successor to Directives. Intersecting Component architecure with reusable and
 extendable charts can allow is to create a library of charting web-components.
 
##Getting Started

This project uses a number of utilities for build. 

The project is authored in TypeScript. Dependencies are managed via JSPM, which also builds a bundled JS 
file after the TypeScript compiler completes. Gulp manages running the compile step, minifying the JS, running the JSPM 
bundler, and sending the output to the `dist` directory, along with the flattened html `templates` directory.

The tooling web is a bit of a mess insofar as it is disparate, but I'm not sure what good alternaties are.

>TODO
To get started, simply run `npm install`, then `npm start`.
...
or `gulp`.

##Development
PR's are welcome.