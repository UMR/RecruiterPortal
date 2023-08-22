import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { EditApplicantInfoModel } from './edit-applicant-info.model';
import { resourceServerUrl } from '../../../../common/constants/auth-keys';
import { StorageService } from '../../../../common/services/storage.service';

@Injectable()
export class EditApplicantInfoService {

    private applicantInfoDetailsURI: string = `${resourceServerUrl}/api/applicant-info/details/`;
    private applicantInfoUpdateURI: string = `${resourceServerUrl}/api/applicant-info/update`;
    private zipcodeCityStateURI: string = `${resourceServerUrl}/api/applicant-info/zipcode-city-state/`;
    private countryNameURI: string = `${resourceServerUrl}/api/applicant-info/country-name/`;
    private getEmploymentApplicantionByApplicantIdURI: string = `${resourceServerUrl}/api/applicant-info/file/`;

    constructor(private http: HttpClient, private storageService: StorageService) { }

    getApplicantInfo(): Observable<HttpResponse<any>> {
        return this.http.get(this.applicantInfoDetailsURI + this.storageService.getApplicantId, { observe: 'response' });
    }

    getEmploymentApplicantionFile(applicantId: number): Observable<HttpResponse<any>> {
        let headerOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        })
        return this.http.get(this.getEmploymentApplicantionByApplicantIdURI + this.storageService.getApplicantId, { headers: headerOptions, responseType: 'blob' as 'blob', observe: 'response' });
        //return this.http.get(this.getEmploymentApplicantionByApplicantIdURI + this.storageService.getApplicantId, { observe: 'response' });
    }

    updateApplicantInfo(editApplicantInfoModel: EditApplicantInfoModel): Observable<HttpResponse<any>> {
        return this.http.put(this.applicantInfoUpdateURI, editApplicantInfoModel, { observe: 'response', responseType: 'text' });
    }

    getZipCodeCityStateByZipCode(zipCode: string = ""): Observable<HttpResponse<any>> {
        if (zipCode != "") {
            return this.http.get(encodeURI(this.zipcodeCityStateURI + zipCode), { observe: 'response' });
        }
        else {
            return this.http.get(encodeURI(this.zipcodeCityStateURI + "all"), { observe: 'response' });
        }
    }

    getPositionByPositionName(posotion: string): Observable<HttpResponse<any>> {
        const URI: string = `${resourceServerUrl}/api/employment/position?text=${posotion}`;
        return this.http.get(encodeURI(URI), { observe: 'response' });
    }

    getCountryName(countryName): Observable<HttpResponse<any>> {
        const URI: string = `${resourceServerUrl}/api/applicant-info/country-name?text=${countryName}`;
        return this.http.get(encodeURI(URI), { observe: 'response' });
    }
}
