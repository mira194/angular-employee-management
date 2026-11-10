import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { inject } from '@angular/core';
import { ApiResponse, Employee } from '../../model/master';
import { Observable } from 'rxjs';
import { EarnedLeave } from '../../model/master';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, AsyncPipe , DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

  
  mastersrv : MasterService = inject(MasterService);
  employee$ : Observable<Employee[]> = new Observable<Employee[]>();
  earnedLeaves  : EarnedLeave[] = [];

  form : FormGroup = new FormGroup({})

  constructor(){
    this.employee$ = this.mastersrv.getAllEmployees();
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getData();
  }
 initializeForm(){
  this.form = new FormGroup({
    earnedLeaveId : new FormControl(0),
    employeeId : new FormControl(0),
    totalEarnedLeaves : new FormControl(0),
    totalSickEarnedLeaves : new FormControl(0),
    lastUpdatedDate : new FormControl(new Date().toISOString().substring(0, 10)),
  })
}

  getData(){
    const formValue = this.form.value; // Get the form values  
    this.mastersrv.getAllEarnedLeaves().subscribe((res: ApiResponse) => {
      this.earnedLeaves = res.data ;
    })
  }

  onSave(){
    const formValue = this.form.value; // Get the form values  
    this.mastersrv.addEarnedLeave(formValue).subscribe((res: ApiResponse) => {
      if(res){
        alert("Earned Leave Added Successfully");
      }
    })
  }



}
