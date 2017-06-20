import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {WorkbenchFilter}      from './workbench-filter';
import {URLSearchParams}   from '@angular/http';
import {Tag}               from '../tags/tag';
import {Systemunit}        from '../systemunits/systemunit';
import {User}              from '../users/user';
import {WorkbenchFilterService} from './workbench-filter.service';
import {CaseService}       from '../cases/case.service';
import {TagService}        from '../tags/tag.service';
import {SystemunitService} from '../systemunits/systemunit.service';
import {UserService}       from '../users/user.service';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {APP_SETTINGS}      from '../app.settings';
import {APP_UTILITIES}     from '../app.utilities';
import {IMyOptions} from 'mydatepicker';

@Component({
    selector: 'workbench-filter',
    templateUrl: 'workbench-filter.component.html',
    providers: [WorkbenchFilterService, CaseService, TagService, SystemunitService, UserService]
})

export class WorkbenchFilterComponent implements OnInit {
    @Output() onFilter = new EventEmitter<string>();

    //private _case_property_fields = ["status", "case_number", "case_reference", "request_date_after", "request_date_before", "distance_from", "distance_to", "analyst", "qc_reviewer", "cbrs_unit", "tags", "street", "city", "priority", "on_hold", "invalid"];
    myWorkbenchFilter = new WorkbenchFilter();
    selectedTag: number;
    myWorkbenchFreeText = {fiscal_year: undefined, freetext: undefined};
    myStatuses: string[] = APP_SETTINGS.STATUSES;
    myCaseIDs = [];
    myTags: Tag[];
    mySystemunits: Systemunit[];
    myUsers: User[] = [];
    form: FormGroup;
    private _myWorkbenchFilter_fields = Object.keys(this.myWorkbenchFilter);
    private _workbenchFilterControls;
    workbenchfiltergroup: FormGroup;
    private _workbenchFreeText_fields = Object.keys(this.myWorkbenchFreeText);
    private _workbenchFreeTextControls;
    workbenchfreetextgroup: FormGroup;
    cleared: boolean = false;

    active = true;
    filternotready: Boolean = true;
    private _errorMessage: string;

    private _makeControls(fields) {
        let controls = {};
        for (let i = 0, j = fields.length; i < j; i++) {
            controls[fields[i]] = new FormControl("");
        }
        return controls;
    }

    private _updateControls(fields, controls, values): void {
        for (let i = 0, j = fields.length; i < j; i++) {
            let field = fields[i];
            if (field.slice(-4) == "date" && values[field] != null) {
                let thisDate = new Date(values[field]);
                controls[field].setValue({date: {year: thisDate.getFullYear(), month: thisDate.getMonth() + 1, day: thisDate.getDate()}});
            }
            else {
                controls[field].setValue(values[field]);
            }
        }
    }

    constructor (fb: FormBuilder,
                 private _workbenchFilterService: WorkbenchFilterService,
                 private _caseService: CaseService,
                 private _tagService: TagService,
                 private _systemunitService: SystemunitService,
                 private _userService: UserService
    ) {
        this._workbenchFilterControls = this._makeControls(this._myWorkbenchFilter_fields);
        this.workbenchfiltergroup = new FormGroup(this._workbenchFilterControls);
        this._workbenchFreeTextControls = this._makeControls(this._workbenchFreeText_fields);
        this.workbenchfreetextgroup = new FormGroup(this._workbenchFreeTextControls);

        this.form = fb.group({
            workbenchfiltergroup: this.workbenchfiltergroup,
            workbenchfreetextgroup: this.workbenchfreetextgroup
        });

        // get values for the select inputs
        this._getCaseIDs();
        this._getUsers();
        this._getSystemunits();
        this._getTags();
        this.myStatuses.push('Open');
    }

    ngOnInit() {
        // if (this._workbenchFilterService.getFilter()) {
        //     console.log(this._workbenchFilterService.getFilter());
        //     this.myWorkbenchFilter = this._workbenchFilterService.getFilter();
        // }
        if (sessionStorage.getItem("filterUrlSearchParams")) {
            for (let prop in this.myWorkbenchFilter) {
                if (sessionStorage.getItem(prop)) {
                    this.myWorkbenchFilter[prop] = sessionStorage.getItem(prop);
                }
            }
        }
        if (!this.myWorkbenchFilter.status) {this.myWorkbenchFilter.status = "Open";}
        this.selectedTag = typeof this.myWorkbenchFilter.tags !== 'undefined' && this.myWorkbenchFilter.tags.length > 0 ? this.myWorkbenchFilter.tags[0] : null;
        setTimeout(() => this._updateControls(this._myWorkbenchFilter_fields, this._workbenchFilterControls, this.myWorkbenchFilter), 0);
        this.filternotready = false;
    }

    private _getCaseIDs() {
        this._caseService.getCases(new URLSearchParams('view=caseid'))
            .subscribe(
                cases => {
                    this.myCaseIDs.length = 0;
                    for (let i = 0, j = cases.length; i < j; i++) {
                        if (cases[i].duplicate) {
                            this.myCaseIDs.push(cases[i]);
                        }
                    }
                    this.myCaseIDs.sort(APP_UTILITIES.dynamicSort('id'));
                },
                error => this._errorMessage = <any>error);
    }

    private _getTags() {
        this._tagService.getTags()
            .subscribe(
                tags => {
                    this.myTags = tags;
                },
                error => this._errorMessage = <any>error);
    }

    private _getSystemunits() {
        this._systemunitService.getSystemunits()
            .subscribe(
                systemunits => {
                    this.mySystemunits = systemunits.sort(APP_UTILITIES.dynamicSort('system_unit_number'));
                },
                error => this._errorMessage = <any>error);
    }

    private _getUsers() {
        this._userService.getUsers(new URLSearchParams('used_users=True'))
            .subscribe(
                users => {
                    this.myUsers = users;//.sort(APP_UTILITIES.dynamicSort('username'));
                    console.log(this.myUsers);
                },
                error => this._errorMessage = <any>error);
    }

    myDatePickerOptions: IMyOptions = {
        dateFormat: 'mm/dd/yyyy',
    };

    defaultFilter() {
        this.myWorkbenchFilter = new WorkbenchFilter();
        this._updateControls(this._myWorkbenchFilter_fields, this._workbenchFilterControls, this.myWorkbenchFilter);
        this._updateControls(this._workbenchFreeText_fields, this._workbenchFreeTextControls, this.myWorkbenchFreeText);
        //this._workbenchFreeTextControls["fiscal_year"].setValue("");
        //this._workbenchFreeTextControls["freetext"].setValue("");
        this._workbenchFilterService.deleteFilter();
        this._workbenchFilterService.deleteUrlSearchParams();
    }

    clearFilter() {
        this.cleared = true;
        this.filternotready = true;
        let wbf = new WorkbenchFilter();
        this._updateControls(this._myWorkbenchFilter_fields, this._workbenchFilterControls, wbf);
        this._updateControls(this._workbenchFreeText_fields, this._workbenchFreeTextControls, this.myWorkbenchFreeText);
        this._workbenchFilterService.deleteFilter();
        this._workbenchFilterService.deleteUrlSearchParams();
        this.filternotready = false;
    }

    onSubmit(form) {
        // check each FormControl for changes
        if (form.dirty || this.cleared) {
            this.filternotready = true;
            let wbf = {};
            let urlSearchParams = 'view=workbench';
            // the following check is a hack because the Status field is set to Open by default,
            // meaning it doesn't make the form dirty because the field may not have changed value
            if (form.controls.workbenchfiltergroup.controls['status'].value == 'Open') {
                urlSearchParams += '&status=Open';
            }
            for (let i = 0, j = this._myWorkbenchFilter_fields.length; i < j; i++) {
                let field = form.controls.workbenchfiltergroup.controls[this._myWorkbenchFilter_fields[i]];
                if (field.dirty && field.value != null && field.value != '') {
                    if (this._myWorkbenchFilter_fields[i] == "request_date_after" || this._myWorkbenchFilter_fields[i] == "request_date_after") {
                        field.value = ("0" + field.value.year).slice(-4) + "-" + ("0" + field.value.month).slice(-2) + "-" + ("0" + field.value.day).slice(-2);
                    }
                    wbf[this._myWorkbenchFilter_fields[i]] = field.value;
                    urlSearchParams += '&' + this._myWorkbenchFilter_fields[i]  + '=' + field.value;
                }
            }
            for (let i = 0, j = this._workbenchFreeText_fields.length; i < j; i++) {
                let field = form.controls.workbenchfreetextgroup.controls[this._workbenchFreeText_fields[i]];
                if (field.dirty && field.value != null && field.value != '') {
                    wbf[this._workbenchFreeText_fields[i]] = field.value;
                    urlSearchParams += '&' + this._workbenchFreeText_fields[i]  + '=' + field.value;
                }
            }
            this.filternotready = false;
            this._workbenchFilterService.setFilter(wbf);
            this._workbenchFilterService.setUrlSearchParams(urlSearchParams);
            this.onFilter.emit(urlSearchParams);
        }
        this.cleared = false;

        // reset the form
        //this.active = false;
        //setTimeout(()=> { this.filternotready = false; this.active=true; }, 1000);
    }
}
