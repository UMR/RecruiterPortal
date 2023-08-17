import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { Observable } from 'rxjs';
import { StorageService } from '../../../common/services/storage.service';

@Injectable()
export class EmploymentService {

    private getEmploymentsByUserIdURI: string = `${resourceServerUrl}/api/employment/get-emploments-by-userid`;        
    private deleteEmploymentByIdURI: string = `${resourceServerUrl}/api/employment/delete-employment-by-id`;   

    constructor(private httpClient: HttpClient, private storageService: StorageService) {

    }

    getEmploymentsByUserId() {
        return this.httpClient.get(`${this.getEmploymentsByUserIdURI}/${this.storageService.getApplicantId}`);
    }

    deleteEmplomentById(id: any) {
        return this.httpClient.delete(`${this.deleteEmploymentByIdURI}/${id}`);
    }

}
