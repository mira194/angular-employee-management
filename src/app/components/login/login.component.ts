import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Objet contenant les informations saisies
  // par l'utilisateur dans le formulaire
  loginObj: any = {
    userName: '',
    password: ''
  };

  // Injection du service permettant les requêtes HTTP
  http = inject(HttpClient);

  // Injection du service permettant la navigation
  // entre les pages Angular
  router = inject(Router);


  // Méthode appelée lorsque l'utilisateur clique sur Login
  onLogin() {

    // Envoi du username et password au backend
    this.http.post(
      "https://projectapi.gerasim.in/api/EmployeeManagement/login",
      this.loginObj
    )

    // Attendre la réponse du backend
    .subscribe((res: any) => {

      // Vérifier si la connexion est réussie
      if (res.result) {

        // Sauvegarder les informations de l'utilisateur
        // dans le navigateur
        localStorage.setItem(
          'leaveUser',
          JSON.stringify(res.data)
        );

        // Rediriger vers le Dashboard
        this.router.navigateByUrl('/dashboard');

      } else {

        // Afficher le message d'erreur du backend
        alert(res.message);

      }
    });
  }
}