import { Component } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.css'
})
export class SignupDialogComponent {
  formulaireInscription: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.formulaireInscription = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SignUpWithEmailAndPassword() {
    console.log("Sign Up Info : ", this.formulaireInscription.value)
    let snackBarData = {
      message: 'Erreur inconnu',
      cssClass: ''
    };
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.formulaireInscription.value.email, this.formulaireInscription.value.password)
    .then((userCredential) => {
      // Signed up 
      console.log("User created", userCredential.user)
      snackBarData.message = 'Inscription réussi!'
      snackBarData.cssClass = 'green-snackbar'
      this.dialogRef.close(snackBarData)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Erreur code : ", errorCode);
      console.log("Erreur message : ", errorMessage);
      snackBarData.cssClass = 'red-snackbar'
      switch(error.code) {
        case "auth/weak-password":
          snackBarData.message = 'Mot de passe faible, veuillez saisir au moins 6 caractères'
          break;
        case "auth/email-already-in-use":
          snackBarData.message = 'Adresse email déjà utilisée'
          break;
        case "auth/invalid-email":
          snackBarData.message = "Email non valide"
          break;
        default:
          snackBarData.message = "Erreur non pris en charge, veuillez contacter l'administrateur"
          console.log("Erreur dans la gestion du code d'erreur firebase")
          break;
      }

      this.dialogRef.close(snackBarData) 
    });
  }
}
