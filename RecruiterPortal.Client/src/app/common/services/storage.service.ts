import { Injectable } from '@angular/core';
import { applicantId } from '../constants/auth-keys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {  

  constructor() {
  }

  setApplicantId(data: string) {
    sessionStorage.setItem(applicantId, JSON.stringify(data));
  }

  get getApplicantId(): number {
    const data = sessionStorage.getItem(applicantId);
    if (data) {
      return +data;
    }
    return null;
  }

  removeApplicantId() {
    sessionStorage.removeItem(applicantId);
  }


  /**
   * DYNAMIC SESSION DATA
   */
  storeDataToSession(data: any, key: string) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  getDataFromSession(key: string): any {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }
  removeSessionData(key: string) {
    sessionStorage.removeItem(key);
  }
}
