import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details } from '../models/Details.model';
import { DetailsService } from '../services/details.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  detailsForm : FormGroup;
  cantonCtrl = new FormControl();

  constructor(private formBuilder: FormBuilder,
              private detailsService : DetailsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.detailsForm = this.formBuilder.group({
      yob: ['', Validators.compose([Validators.required, Validators.min(1900), Validators.max(2022)])],
      canton: this.cantonCtrl,
      medicalFees: ['', Validators.compose([Validators.required, Validators.min(0)])],
      freeDocElection: [''],
      accident:['']
    });
  }

  onSubmit() {
    this.detailsService.setDetails(
      new Details(this.detailsForm.get('yob').value, this.detailsForm.get('canton').value, this.detailsForm.get('medicalFees').value, this.detailsForm.get('freeDocElection').value, this.detailsForm.get('accident').value)
    );
    this.router.navigate(['/overview']);
  }


}
