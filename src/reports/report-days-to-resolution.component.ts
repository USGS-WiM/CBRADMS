import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportCase} from './report-case';
import {ReportCaseService} from './report-case.service';
import {Column} from '../grid/column';
import {APP_UTILITIES} from '../app.utilities';
import * as FileSaver from 'file-saver';


@Component({
    templateUrl: 'report-detail.component.html'
})
export class ReportDaysToResolutionComponent implements OnInit {

    paginated = true;
    allow_filter = false;
    private _params: any;
    page_size = 100;
    private _prevPage: string;
    private _nextPage: string;
    reportcases: ReportCase[];
    columns: Column[];
    notready: Boolean = true;
    private _errorMessage: string;

    constructor (
        private _route: ActivatedRoute,
        private _reportCaseService: ReportCaseService,
    ) {}

    ngOnInit() {
        this._params = this._route.queryParams
            .subscribe(params => {
                this._getReportCases();
                this._getColumns();
            });
    }

    prevPage() {
        if (this._prevPage == null) {
            APP_UTILITIES.showToast('Info', 'This is the first page.');
        } else {
            this.notready = true;
            let prevPageNum;
            let ndxStart = this._prevPage.indexOf('page=');
            if (ndxStart === -1) {
                const urlSearchParams = {report: 'daystoresolution'};
                this._getReportCases(urlSearchParams);
            } else {
                ndxStart += 5;
                const ndxEnd = this._prevPage.indexOf('&', ndxStart);
                ndxEnd === -1 ? prevPageNum = this._prevPage.slice(ndxStart) : prevPageNum = this._prevPage.slice(ndxStart, ndxEnd);
                const urlSearchParams = {page: prevPageNum, report: 'daystoresolution'};
                this._getReportCases(urlSearchParams);
            }
        }
    }

    nextPage() {
        if (this._nextPage == null) {
            APP_UTILITIES.showToast('Info', 'This is the last page.');
        } else {
            this.notready = true;
            let nextPageNum;
            const ndxStart = this._nextPage.indexOf('page=') + 5;
            const ndxEnd = this._nextPage.indexOf('&', ndxStart);
            ndxEnd === -1 ? nextPageNum = this._nextPage.slice(ndxStart) : nextPageNum = this._nextPage.slice(ndxStart, ndxEnd);
            const urlSearchParams = {page: nextPageNum, report: 'daystoresolution'};
            this._getReportCases(urlSearchParams);
        }
    }

    exportToCSV(unit?: number) {
        this.notready = true;
        const urlSearchParams = 'report=daystoresolution&format=csv&page_size=' + this.page_size;
        this._getReportCasesCSV(urlSearchParams);
    }

    private _getReportCasesCSV(urlSearchParams?) {
        const self = this;
        this._reportCaseService.getReportCasesCSV(urlSearchParams)
            .then(function(data) {
                const blob = new Blob([data[0]], { type: 'text/csv' });
                FileSaver.saveAs(blob, data[1]);
                self.notready = false;
            });
    }

    private _getReportCases(newUrlSearchParams?) {
        const urlSearchParams = newUrlSearchParams ? newUrlSearchParams : {report: 'daystoresolution'};
        this._reportCaseService.getReportCases(urlSearchParams)
            .subscribe(
                (reportcases: any) => {
                    if (Number(reportcases.count) > 0) {
                        APP_UTILITIES.showToast('Info', reportcases.count + ' case(s) found.');
                        const max_records = Math.ceil(Number(reportcases.count) / 100) * 100;
                        this.page_size < 100 ? this.page_size = 100 : this.page_size = max_records;
                        this._prevPage = reportcases.previous;
                        this._nextPage = reportcases.next;
                        this.reportcases = reportcases.results;
                        this._sortAndShow();
                    } else {
                        APP_UTILITIES.showToast('Info', 'No cases found.');
                        this.notready = false;
                    }
                },
                error => this._errorMessage = <any>error
            );
    }

    private _getColumns() {
        this.columns = [
            new Column('id', 'Case ID'),
            new Column('case_reference', 'Case Reference'),
            new Column('request_date',  'Request Date'),
            new Column('close_date', 'Close Date'),
            new Column('close_days', 'Days to Close'),
        ];
    }

    private _sortAndShow() {
        this.reportcases.sort(APP_UTILITIES.dynamicSort('-close_days'));
        this.notready = false;
    }

    printCases() {
        window.print();
    }
}
