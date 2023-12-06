import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';
import { Auth, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  constructor(private sharedService: SharedService, private router: Router) { }
  ngOnInit(): void {
    this.sharedService.sharedIsLoggedIn$.subscribe((val) => {
      console.log("isLoggedIn in appcomponent", val)
      this.isLoggedIn = val;

      if (!this.isLoggedIn) {
        console.log("Not Logged In")
        this.router.navigate(['/login'])
      }
      else {
        console.log("Logged In")
        this.router.navigate([''])
      }
    })

    this.user$.subscribe(val => console.log("Val in user$", val))
  }
  SignOut() {
    signOut(this.auth).then(() => {
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
  title = 'tricount-applike';
}
