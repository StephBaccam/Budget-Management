import { Component, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { doc } from '@angular/fire/firestore';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent implements OnInit {
  private auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();
  user$ = user(this.auth);
  constructor(private sharedService: SharedService, private router: Router) {
    
  }

  ngOnInit(): void {
    console.log("Auth comp initiated")
  }

  SignInWithGoogle() {
    console.log("SignInWithGoogle Clicked");
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("Result : ", result)
      console.log(this.user$);
      this.sharedService.updateIsLoggedIn(true);
      this.user$.subscribe((res) => {
        this.sharedService.updateUser(res);
      })
      return credential;
    })
  }
}
