import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { InsuranceAPI } from '../models/InsuranceAPI.models';

@Injectable()

export class InsuranceAPIService {
    constructor(private httpClient: HttpClient) {}
    insurancesSubject = new Subject<InsuranceAPI[]>();
    insurances : any[];
    canton: string;
    fees: number;
    yob: number;
    accident: number;
    freeDocElection: number;
    
    emitInsurancesSubject() {
        this.insurancesSubject.next(this.insurances.slice());
      }

    setInsurancesDetails(canton, fees, yob, accident, freeDocElection) {
        this.canton = canton;
        this.fees = fees;
        this.yob = yob;
        if (accident == false) {this.accident = 0;}
        else {this.accident = 1;}        
        if (freeDocElection == false) {this.freeDocElection = 0;}
        else {this.freeDocElection = 1;}
    }

    getInsurancesAPI() {
        let url = 'https://daniel-lamas.ch/assurances/api/get.php?canton='+ this.canton +'&fees='+this.fees+'&yob='+this.yob+'&accident='+ this.accident+'&freeDocElection='+ this.freeDocElection;
        this.httpClient
          .get<any[]>(url)
          .subscribe(
            (response) => {
              this.insurances = response;
              this.emitInsurancesSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    } 
}

