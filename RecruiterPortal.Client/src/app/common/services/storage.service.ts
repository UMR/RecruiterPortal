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

    setIsRecruiter(data: boolean) {
        sessionStorage.setItem("recruiter", JSON.stringify(data));
    }

    setIsSupervisor(data: boolean) {
        sessionStorage.setItem("supervisor", JSON.stringify(data));
    }

    setIsManager(data: boolean) {
        sessionStorage.setItem("manager", JSON.stringify(data));
    }

    get getIsRecruiter(): boolean {
        const data = sessionStorage.getItem("recruiter");
        if (data) {
            return true;
        }
        return false;
    }
    get getIsSupervisor(): boolean {
        const data = sessionStorage.getItem("supervisor");
        if (data) {
            return true;
        }
        return false;
    }
    get getIsManager(): boolean {
        const data = sessionStorage.getItem("manager");
        if (data) {
            return true;
        }
        return false;
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
