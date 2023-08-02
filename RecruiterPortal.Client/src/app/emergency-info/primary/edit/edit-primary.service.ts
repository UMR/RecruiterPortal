import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { resourceServerUrl } from '../../../common/constants/auth-keys';
import { Observable } from 'rxjs';

@Injectable()
export class PrimaryEditService {
    private emrPrimaryInfoURI: string = `${resourceServerUrl}/api/emergency-info/primary`;
    private getPrimaryInfoURI: string = `${resourceServerUrl}/api/emergency-info/all`;


    constructor(private httpClient: HttpClient) {

    }

    insertEmrInfo(emrInfo: EmergencyInfoModel): Observable<HttpResponse<any>> {
        return this.httpClient.post(this.emrPrimaryInfoURI, emrInfo, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
    emrInfo() {
        return this.httpClient.get(this.getPrimaryInfoURI);
    }
}
