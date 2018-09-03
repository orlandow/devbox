import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientState } from '../reducer/patient';

import { select, Store } from '@ngrx/store';
import { AppState } from '../reducer';

import { PatientService } from '../patient.service';

import { SET } from '../reducer/patient';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

    patients: Observable<PatientState>;
    currentPage: number;

    constructor(public patientService: PatientService, private store: Store<AppState>) {
        this.patients = store.pipe(select("counter"));
        this.currentPage = 0;
    }

    ngOnInit() {
        // this.patientService.getPatients();
    }

    getPagesCount(patientsCount: number): number {
        return Math.ceil(patientsCount / 10);
    }

    getPagesList(patientsCount: number) {
        const pagesCount = this.getPagesCount(patientsCount);
        const list = Array(pagesCount).keys();
        return Array.from(list);
    }

    setPage(page): void {
        this.patientService.getPatients('', page);
        this.currentPage = page;
    }
}