import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Structure du formulaire de connexion
  contactForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isSubmitted = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      const email = this.contactForm.get('email')?.value;
      const password = this.contactForm.get('password')?.value;

      if (email && password) { // Vérifiez si email et password sont définis
          this.authService.login(email, password)
            .then(() => {
              // Redirection vers la page du tableau de bord après une connexion réussie
              // Vous pouvez utiliser le routeur Angular pour cela.
              console.log('Connexion réussie');
            })
            .catch((error) => {
              console.error('Erreur de connexion :', error);
              // Gérer les erreurs d'authentification ici, par exemple, afficher un message d'erreur.
            });
          }
    }
  }

  // Méthode appelée lorsque le bouton "Login avec Google" est cliqué
  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => {
        // Gestion de la réussite de la connexion avec Google ici (redirection, etc.)
      })
      .catch((error) => {
        // Gestion des erreurs ici
        console.error('Erreur de connexion avec Google :', error);
      });
  }
}

