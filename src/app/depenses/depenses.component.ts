import { Component, OnInit } from '@angular/core';
import { Depense, depenses } from '../depense';
import { GestionDepenseService } from '../gestion-depense.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  constructor(private depenseService: GestionDepenseService) { }

  depenses: Depense[] = [];
  
  ngOnInit(): void {
    this.depenses = this.depenseService.getDepenses();
  }

}
