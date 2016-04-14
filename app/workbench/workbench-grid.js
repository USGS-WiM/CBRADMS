System.register(['angular2/core', '../grid/grid', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, grid_1, router_1;
    var WorkbenchGrid;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            WorkbenchGrid = (function (_super) {
                __extends(WorkbenchGrid, _super);
                function WorkbenchGrid(_router) {
                    _super.call(this);
                    this._router = _router;
                }
                WorkbenchGrid.prototype.onClick = function (row) {
                    this._router.navigate(['WorkbenchDetail', { id: row.id }]);
                };
                WorkbenchGrid = __decorate([
                    core_1.Component({
                        selector: 'grid',
                        inputs: ['rows: rows', 'columns: columns'],
                        templateUrl: 'app/workbench/workbench-list.component.html',
                        styles: ['.gridHeader {cursor:pointer;}']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], WorkbenchGrid);
                return WorkbenchGrid;
            }(grid_1.Grid));
            exports_1("WorkbenchGrid", WorkbenchGrid);
        }
    }
});
//# sourceMappingURL=workbench-grid.js.map