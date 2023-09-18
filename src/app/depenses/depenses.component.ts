import { Component } from '@angular/core';
import { depenses } from '../depense';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent{

  depenses = [...depenses];
}
