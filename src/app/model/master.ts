export class Employee{
    employeeId: number;
    employeeName: string;
    contactNo : string;
    emailId : string;
    deptId : number | null;
    password : string;
    gender : string;
    role : string;

    constructor(){
        this.employeeId = 0;
        this.employeeName = '';
        this.contactNo = '';
        this.emailId = '';
        this.deptId = 0;
        this.password = '';
        this.gender = '';
        this.role = 'Employee';
    }


}

export interface ParentDept{
        departmentId : number;
        departmentName : string;
        departmentLogo : string;
        
}
export interface ChildDept{
        childDeptId : number;
        parentDeptId : number;
        departmentName : string;
        
}

export interface ApiResponse {
    result: boolean;
    message: string;
    data: any;
}

export interface LeaveType {
    leaveTypeId: number;
    typeName: string;
}

export interface EarnedLeave {
    earnedLeaveId: number;
    employeeId: number;
    totalEarnedLeaves: number;
    totalSickEarnedLeaves: number;
    lastUpdatedDate: string;
    employeeName: string;
}   

export interface LeaveRequest {
    leaveId: number;
    employeeId: number;
    leaveTypeId: number;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    requestDate: string;
}