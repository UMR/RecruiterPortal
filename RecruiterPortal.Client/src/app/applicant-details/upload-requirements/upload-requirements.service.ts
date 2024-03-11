import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../../common/constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class UploadRequirementsService {

    private fileListURI: string = `${resourceServerUrl}/api/upload-file/list/`;
    private uploadFileURI: string = `${resourceServerUrl}/api/upload-file/upload`;
    private deleteFileURI: string = `${resourceServerUrl}/api/upload-file/delete/`;
    private getUserFileByIdURI: string = `${resourceServerUrl}/api/upload-file/get`;
    private updateEmpClass: string = `${resourceServerUrl}/api/applicant-info/update-emplyment-class/`;
    private getEmpClass: string = `${resourceServerUrl}/api/applicant-info/get-emplyment-class/`;


    constructor(private http: HttpClient) {
    }

    getUserFile(): Observable<HttpResponse<any>> {
        return this.http.get(this.fileListURI, { observe: 'response' });
    }

    getUserFileByFileType(userId: any, fileType: any): Observable<HttpResponse<any>> {
        return this.http.get(this.fileListURI + userId + '/' + fileType, { observe: 'response' });
    }

    updateEmpolymentClass(aplicantId: any, empClass: any): Observable<HttpResponse<any>> {
        return this.http.get(this.updateEmpClass + empClass, { observe: 'response' });
    }

    getEmpolymentClass(appId): Observable<HttpResponse<any>> {
        return this.http.get(this.getEmpClass + appId, { observe: 'response' });
    }

    onUploadFile(uploadFile: any): Observable<HttpResponse<any>> {
        return this.http.post(this.uploadFileURI, uploadFile, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }

    getFileById(id: any): Observable<HttpResponse<any>> {
        return this.http.get(this.getUserFileByIdURI + "/" + id, { observe: 'response' });
    }

    deleteFile(fileId): Observable<HttpResponse<any>> {
        return this.http.delete(this.deleteFileURI + fileId, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
