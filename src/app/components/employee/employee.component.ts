import { Component } from '@angular/core';
import { ApiResponse, ChildDept, Employee } from '../../model/master';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { ParentDept } from '../../model/master';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  EmployeeObj : Employee = new Employee();
  parentDeptId: number | null = null;
  masterService = inject(MasterService);
  ParentDeptsList : ParentDept[] = [];
  ChildDeptsList : ChildDept[] = [];
  EmployeeList : Employee[] = [];

  ngOnInit(): void {
    this.loadEmployees();
    this.loadParentDepts();
  }

  loadParentDepts() {
    this.masterService.getDepartment().subscribe((res: ApiResponse) => {
       this.ParentDeptsList = res.data;
        console.log(res.data);
    });

  }

    getAllChildDepartment() {
    this.masterService.getAllChildDepartment().subscribe((res: ApiResponse) => {
       this.ChildDeptsList = res.data;
        console.log(res.data);
    });

  }

    loadEmployees() {
    this.masterService.getAllEmployees().subscribe((res: Employee[]) => {
      this.EmployeeList = res;
      console.log('All Employees:', res);
    });
  }

  onDeptChange() {
    if (this.parentDeptId === null) {
      this.ChildDeptsList = [];
      this.EmployeeObj.deptId = null;
      return;
    }

    this.masterService.getChildDepartment(this.parentDeptId).subscribe((res: ApiResponse) => {
      if (res.result) {
        this.ChildDeptsList = res.data;
        console.log(res.data);
      } else {
        console.error(res.message);
      }
    });
  }

  onSaveEmployee() {
        console.log("Employee Object:", this.EmployeeObj);
console.log("JSON:", JSON.stringify(this.EmployeeObj));
this.masterService.createNewEmployee(this.EmployeeObj).subscribe({
  next: (res) => {
    console.log('Réponse backend:', res);
  },
  error: (err) => {
    console.error('Erreur backend:', err);
  }
});
  }

    onUpdate() {
    this.masterService.update(this.EmployeeObj).subscribe((res: Employee) => {
      console.log('Employee updated successfully:', res);
      this.loadEmployees(); // Refresh the employee list after update
      this.EmployeeObj = new Employee(); // Reset the form after update
    });
  }


  onDelete(employeeId: number) {
    const confirmation = confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
    this.masterService.deleteEmployee(employeeId).subscribe((res: Employee[]) => {
        console.log('Employee deleted successfully:', res );
        this.loadEmployees(); // Refresh the employee list after deletion
    });
  }
  }

  onEdit(employee: Employee) {
    this.EmployeeObj = { ...employee }; // Create a copy of the employee object to avoid direct mutation
    this.getAllChildDepartment(); // Load child departments when editing an employee
  }





}
