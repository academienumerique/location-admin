import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Structure du formulaire d'inscription
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isSubmitted = false;
  errorMessage = ''; // Ajoutez une propriété pour afficher les messages d'erreur

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      if (email && password) {
        this.authService.register(email, password)
          .then(() => {
            // Redirection vers la page de connexion après une inscription réussie
            this.router.navigate(['/login']);
            console.log('Inscription réussie');
          })
          .catch((error) => {
            console.error('Erreur d\'inscription :', error);
            // Vérifiez si l'erreur est due à une adresse e-mail déjà utilisée
            if (error.code === 'auth/email-already-in-use') {
              this.errorMessage = 'Cette adresse e-mail est déjà utilisée par un autre compte.';
            } else {
              this.errorMessage = 'Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer plus tard.';
            }
          });
      }
    }
  }

  // Fonction pour rediriger vers la page de connexion
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
