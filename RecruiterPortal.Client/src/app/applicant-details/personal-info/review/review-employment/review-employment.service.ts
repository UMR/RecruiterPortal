import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { StorageService } from '../../../../common/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ReviewEmploymentService {

    constructor(private httpClient: HttpClient, private storageService: StorageService) {

    }

    getEmploymentsByUserId() {
        const URI: string = `${resourceServerUrl}/api/employment/get-emploments-by-userid`;
        return this.httpClient.get(`${URI}/${this.storageService.getApplicantId}`);
    }
}
