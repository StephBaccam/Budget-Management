import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSoldeComponent } from './config-solde.component';

describe('ConfigSoldeComponent', () => {
  let component: ConfigSoldeComponent;
  let fixture: ComponentFixture<ConfigSoldeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigSoldeComponent]
    });
    fixture = TestBed.createComponent(ConfigSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
