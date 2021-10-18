import { Injectable } from "@angular/core";
import { Details } from '../models/Details.model';

@Injectable()

export class DetailsService {

    details : Details;
    constructor() {}

    setDetails(details: Details) {
        this.details = details;
    }

    getDetails() {
        return this.details;
    }
 
}