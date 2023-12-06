import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Solde } from '../fake-data/solde';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedIdDocSoldeSource = new BehaviorSubject<string>('default');
  private sharedSoldeSource = new BehaviorSubject<Solde>({solde: 0, user: '', id:''})
  private sharedIsLoggedInSource = new BehaviorSubject<boolean>(false)
  private sharedUserSource = new BehaviorSubject<any>({})

  sharedIdDocSolde$ = this.sharedIdDocSoldeSource.asObservable();
  sharedSolde$ = this.sharedSoldeSource.asObservable();
  sharedIsLoggedIn$ = this.sharedIsLoggedInSource.asObservable();
  sharedUser$ = this.sharedUserSource.asObservable();

  updateIdDocSolde(newValue: string) {
    console.log("Shared Service Called with new Value of IdDocSolde : ", newValue)
    this.sharedIdDocSoldeSource.next(newValue);
  }

  updateSolde(newSolde: Solde) {
    console.log("Shared Service Called with new Value of Solde : ", newSolde)
    this.sharedSoldeSource.next(newSolde)
  }

  updateIsLoggedIn(newValue: boolean) {
    console.log("Shared Service Called with new Value of IsLoggedIn : ", newValue)
    this.sharedIsLoggedInSource.next(newValue)
  }

  updateUser(newValue: any) {
    console.log("Shared Service Called with new Value of User : ", newValue)
    this.sharedUserSource.next(newValue);
  }
}
