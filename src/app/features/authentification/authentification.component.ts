import { Component, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  user$ = user(this.auth);
  formulaireLogin: FormGroup;

  constructor(private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    this.formulaireLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log("Auth comp initiated")
  }

  OpenSignUpDialog() {
    console.log("OpenSignUpDialog Clicked");
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result !== undefined) {
        this.snackBar.open(result.message, 'Fermer', {duration: 3000, panelClass: [result.cssClass]});
      }
      else {
        this.snackBar.open("Inscription annulée", 'Fermer', { duration: 3000 });
      }
    });
  }

  SignInWithEmailAndPassword() {
    console.log("SignInWithEmailAndPassword Clicked");
    console.log("User Login Info : ", this.formulaireLogin.value)
    signInWithEmailAndPassword(this.auth, this.formulaireLogin.value.email, this.formulaireLogin.value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Signed In! User : ", user)
        this.sharedService.updateIsLoggedIn(true);
        this.user$.subscribe((res) => {
          this.sharedService.updateUser(res);
        })
        this.snackBar.open('Authentification réussi!', 'Fermer', {duration: 3000, panelClass: ['green-snackbar']})
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error while trying to log in : ", errorCode + errorMessage)
        switch(errorCode) {
          case 'auth/invalid-email':
            this.snackBar.open("Adresse Email invalide", 'Fermer', {duration: 3000, panelClass: ['red-snackbar']})
            break;
          case 'auth/invalid-login-credentials':
            this.snackBar.open("Identifiant erroné", 'Fermer', {duration: 3000, panelClass: ['red-snackbar']})
            break;
          default:
            this.snackBar.open("Erreur lors de l'authentification", 'Fermer', {duration: 3000, panelClass: ['red-snackbar']})
            break;
        }
      });

  }

  SignInWithGoogle() {
    console.log("SignInWithGoogle Clicked");
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("Result : ", result)
      console.log(this.user$);
      this.sharedService.updateIsLoggedIn(true);
      this.user$.subscribe((res) => {
        this.sharedService.updateUser(res);
      })
      this.snackBar.open('Authentification réussi!', 'Fermer', {duration: 3000, panelClass: ['green-snackbar']})
    })
    .catch((error) => { //Pratically never called but just in case
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error while trying to log in : ", errorCode + errorMessage)
    })
  }
}
