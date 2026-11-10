import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NewLeaveComponent } from './components/new-leave/new-leave.component';
import { EarnedLeaveComponent } from './components/earned-leave/earned-leave.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path:'',
        component : LayoutComponent,
        children : [
            {
                path : 'dashboard',
                component : DashboardComponent
            },
                        {
                path : 'employee',
                component : EmployeeComponent
            },
                        {
                path : 'leave-request',
                component : NewLeaveComponent
            },
            {
                path : 'earned-leave',
                component : EarnedLeaveComponent
            }
        ]
    }
];
