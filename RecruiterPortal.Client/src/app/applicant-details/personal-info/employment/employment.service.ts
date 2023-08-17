import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { StorageService } from '../../../common/services/storage.service';

@Injectable()
export class EmploymentService {
    private getEmploymentsByUserIdURI: string = `${resourceServerUrl}/api/employment/get-emploments-by-userid`;
    private getImportedEmploymentInfoURI: string = `${resourceServerUrl}/api/employment/get-imported-employment`;
    private deleteEmpInfoURI: string = `${resourceServerUrl}/api/employment/delete-imported-employment`;
    private deleteImportedEmpInfoURI: string = `${resourceServerUrl}/api/employment/delete-imported-employment`;

    constructor(private httpClient: HttpClient, private storageService: StorageService) {

    }

    getEmploymentsByUserId() {
        return this.httpClient.get(`${this.getEmploymentsByUserIdURI}/${this.storageService.getApplicantId}`);
    }

    getImportedEmploymentHistory() {
        return this.httpClient.get(`${this.getImportedEmploymentInfoURI}/${this.storageService.getApplicantId}`);
    }

    deleteEmpInfo(id: any) {
        return this.httpClient.delete(`${this.deleteEmpInfoURI}/${id}`);
    }

    deleteImportedEmpInfo(id: any) {
        return this.httpClient.delete(`${this.deleteImportedEmpInfoURI}/${id}`);
    }

}
