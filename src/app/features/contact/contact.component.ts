import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/fake-data/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  formulaire: FormGroup;
  user: any;
  feedback: Feedback = {
    id: "Default ID",
    message: "Default Message",
    user: "Default User"
  };
  loggedIn: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) {
    this.formulaire = this.formBuilder.group({
      message: ['', Validators.required]
    })
    
   }
  ngOnInit(): void {
    this.sharedService.sharedUser$.subscribe((val) => {
      if(Object.keys(val).length !== 0) {
        this.user = val;
      this.loggedIn = true;
      }
      
    })
  }

   envoyerFeedback() {
    this.feedback.message = this.formulaire.value.message;
    this.feedback.user = this.user.email;
    this.feedbackService.create(this.feedback).then(() => {
      this.clearFeedback();
      this.snackBar.open('Message envoyé! Merci de votre retour', "Fermer", {duration: 3000, panelClass: ['green-snackbar']})
    })
    .catch(e => {
      this.snackBar.open("Erreur lors de l'envoi du message", "Fermer", {duration: 3000, panelClass: ['red-snackbar']})
    })

    
   }

   clearFeedback() {
    this.formulaire.reset();
    Object.keys(this.formulaire.controls).forEach(key => {
      this.formulaire.get(key)?.setErrors(null);
    })
   }
}
