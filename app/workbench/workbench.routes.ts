import {RouterConfig} from '@angular/router';
import {AuthenticationGuard}    from '../authentication/authentication.guard';
import {WorkbenchComponent} from './workbench.component';
import {WorkbenchDetailComponent} from './workbench-detail.component';
import {WorkbenchListComponent} from './workbench-list.component';

export const WorkbenchRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: 'workbench',
        terminal: true
    },
    {
        path: 'workbench',
        component: WorkbenchComponent,
        children: [
            {
                path: ':id',
                component: WorkbenchDetailComponent,
                canActivate: [AuthenticationGuard]
            },
            {
                path: '',
                component: WorkbenchListComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
];