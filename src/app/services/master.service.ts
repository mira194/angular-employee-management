import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, EarnedLeave, Employee } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  ApiUrl : string = "https://projectapi.gerasim.in/api/EmployeeManagement";
  loggedUserData : any
  constructor(private http: HttpClient) {    

        const userData = localStorage.getItem('leaveUser');
        if(userData){
          this.loggedUserData = JSON.parse(userData);
        }
      
   }

   getDepartment() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ApiUrl + '/GetParentDepartment');
   }

   getChildDepartment(parentDeptId: number) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.ApiUrl + '/GetChildDepartmentByParentId?deptId=' + parentDeptId);
   }
   createNewEmployee(obj: Employee) : Observable<Employee> {
    return this.http.post<Employee>(this.ApiUrl + '/CreateEmployee', obj);
   }
    getAllEmployees() : Observable<Employee[]> {
     return this.http.get<Employee[]>(this.ApiUrl + '/GetAllEmployees');
    }

    getAllChildDepartment() : Observable<ApiResponse> {
     return this.http.get<ApiResponse>(this.ApiUrl + '/GetAllChildDepartment');
    }

    deleteEmployee(employeeId: number) : Observable<Employee[]> {
    return this.http.delete<Employee[]>(this.ApiUrl + '/DeleteEmployee/' + employeeId);
    }

    update( obj: Employee) : Observable<Employee> {
    return this.http.put<Employee>(this.ApiUrl + '/UpdateEmployee/' + obj.employeeId, obj);
    }

    addEarnedLeave( obj: EarnedLeave) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.ApiUrl + '/AddNewEarnedLeave', obj);
    }

    getAllEarnedLeaves() : Observable< ApiResponse> {
    return this.http.get<ApiResponse>(this.ApiUrl + '/GetAllEarnedLeaves');
    }
}
