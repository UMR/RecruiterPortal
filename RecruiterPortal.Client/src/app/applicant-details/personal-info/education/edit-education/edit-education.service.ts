import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { EditEducationModel } from './edit-education.model';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { StorageService } from '../../../../common/services/storage.service';

@Injectable()
export class EditEducationService {

    private sendMessage$ = new BehaviorSubject<any>('');
    public getMessage$ = this.sendMessage$.asObservable();

    private educationInfoURI: string = `${resourceServerUrl}/api/education/info`;
    private educationURI: string = `${resourceServerUrl}/api/education`;
    private facilityTypeURI: string = `${resourceServerUrl}/api/education/facility_type`;
    private educationUpdateURI: string = `${resourceServerUrl}/api/education/update`;

    constructor(private http: HttpClient, private storageService: StorageService) { }

    getEducationInfo(): Observable<HttpResponse<any>> {
        return this.http.get(this.educationInfoURI + "/" + this.storageService.getApplicantId, { observe: 'response' });
    }

    insertEducation(empInfo: EditEducationModel): Observable<HttpResponse<any>> {

        return this.http.post(this.educationURI + "/save", empInfo, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getEduInfo(id: any): Observable<HttpResponse<any>> {
        return this.http.get(this.educationURI + "/" + id, { observe: 'response' });
    }

    updateEducation(eduModel: EditEducationModel): Observable<HttpResponse<any>> {
        return this.http.put(this.educationUpdateURI, eduModel, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    deleteEmpInfo(id: any) {
        return this.http.delete(this.educationURI + "/delete/" + id);
    }

    getFacilityType(): Observable<HttpResponse<any>> {
        return this.http.get(this.facilityTypeURI, {
            observe: 'response'
        });
    }


    updateMessage(msg) {
        this.sendMessage$.next(msg);
    }
}
