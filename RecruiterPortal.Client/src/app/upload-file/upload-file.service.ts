import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { resourceServerUrl } from '../common/constants/auth-keys';


@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    
    private fileListURI: string = `${resourceServerUrl}/api/upload-file/list`;  
    private uploadFileURI: string = `${resourceServerUrl}/api/upload-file/upload`;
    private deleteFileURI: string = `${resourceServerUrl}/api/upload-file/delete/`;  

    constructor(private http: HttpClient) {
    }

    getUserFile(): Observable<HttpResponse<any>> {
        return this.http.get(this.fileListURI, { observe: 'response' });
    }

    getUserFileByFileType(fileType: any): Observable<HttpResponse<any>> {
        return this.http.get(this.fileListURI + "/" + fileType, { observe: 'response' });
    }

    onUploadFile(uploadFile: any): Observable<HttpResponse<any>> {
        return this.http.post(this.uploadFileURI, uploadFile, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
    deleteFile(fileId): Observable<HttpResponse<any>> {
        return this.http.delete(this.deleteFileURI + fileId, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json'), observe: 'response', responseType: 'text'
        });
    }
}
