import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router = inject(Router);

  loggedUserData : any
  constructor(){
    const userData = localStorage.getItem('leaveUser');
    if(userData){
      this.loggedUserData = JSON.parse(userData);
    }
  }

  onLogOff(){
    localStorage.removeItem('leaveUser');
    this.router.navigateByUrl('/login');
  }
}
