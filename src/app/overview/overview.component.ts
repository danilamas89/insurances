import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsService } from '../services/details.service';
import { InsuranceAPIService } from '../services/insuranceAPI.service';
import { Subscription } from 'rxjs';
import { Details } from '../models/Details.model';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  
  detailsForm : FormGroup;
  cantonCtrl = new FormControl();
  insuranceAPISubscription : Subscription;
  insuranceList : any[];
  isReady : boolean;
  details: Details;
  lowestPrice: number = 0;
  test : number = 0;
  showDetails: number[] = [];
  showSettingsBar: boolean;
  settingsLabel: string = "Afficher les paramètres";
 
  constructor(private detailsService : DetailsService, 
              private insuranceAPIService : InsuranceAPIService,
              private router : Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isReady = false;
    this.showSettingsBar = false;
    this.details = this.detailsService.getDetails();    
    if (this.details === undefined) {this.router.navigate(['main']);} 
    else {
      this.insuranceAPIService.setInsurancesDetails(
        this.detailsService.details.canton, this.detailsService.details.medicalFees, this.detailsService.details.yob, this.detailsService.details.accident, this.detailsService.details.freeDocElection);
        this.initForm();
    }
    this.insuranceAPISubscription = this.insuranceAPIService.insurancesSubject.subscribe(
      (insuranceList: any[]) => {
        this.insuranceList = insuranceList;
        this.setInsuranceList();
        this.isReady = true;
      }
    );
    this.insuranceAPIService.getInsurancesAPI();
  }


  initForm() {
    this.detailsForm = this.formBuilder.group({
      yob: [this.details.yob, Validators.compose([Validators.required, Validators.min(1900), Validators.max(2022)])],
      canton: this.cantonCtrl,
      medicalFees: [this.details.medicalFees, Validators.compose([Validators.required, Validators.min(0)])],
      freeDocElection: [''],
      accident:['']
    });
  }


  setInsuranceList() {
    //console.log(this.insuranceList[0]);
    this.lowestPrice = this.insuranceList[0].totalFees;
    for (let i = 0; i < this.insuranceList.length; i++) {
      this.showDetails[i] = 0;
    }
    
  }


  getDifference(price: number) {
    return price - this.lowestPrice;
  }

  setShowDetails(id: number) {
    if (this.showDetails[id] == 0) {
      this.showDetails[id] = 1
    } else {
      this.showDetails[id] = 0;
    }
  }

  getShowDetails(id: number) {
    return this.showDetails[id];
  }

  getMedicalFees() {
    return this.details.medicalFees;
  }


  onUpdate() {
    this.isReady = false;
    this.setShowSettings();
    this.detailsService.setDetails(
      new Details(this.detailsForm.get('yob').value, this.detailsForm.get('canton').value, this.detailsForm.get('medicalFees').value, this.detailsForm.get('freeDocElection').value, this.detailsForm.get('accident').value)
    );
    this.insuranceAPIService.setInsurancesDetails(this.detailsService.details.canton, this.detailsService.details.medicalFees, this.detailsService.details.yob, this.detailsService.details.accident, this.detailsService.details.freeDocElection);
    this.insuranceAPIService.getInsurancesAPI();
    this.setInsuranceList();
  }

  getShowSettingBar() {
    return this.showSettingsBar;
  }

  setShowSettings() {
    if (this.showSettingsBar == false) {
      this.showSettingsBar = true;
      this.settingsLabel = "Masquer les paramètres"
    } 
    else {
      this.showSettingsBar = false;
      this.settingsLabel = "Afficher les paramètres"}
  }


  ngOnDestroy() {
    this.insuranceAPISubscription.unsubscribe();
  }



}