import {Injectable, Inject} from '@angular/core';
import {CookieService, CookieOptionsArgs} from 'angular2-cookie/core';

@Injectable()
export class UmrCookieService {
    constructor(private _cookieService: CookieService) { }

    getAllCookies() {      
        return this._cookieService.getAll();
    }

    getCookie(key: string) {
        return this._cookieService.get(key);
    }

    setCookie(key: string, value: string, options?: CookieOptionsArgs) {
        if (options) {
            this._cookieService.put(key, value, options);
        } else {
            this._cookieService.put(key, value);
        }
    }

    getDeserializedObject(key: string): Object {
        return this._cookieService.getObject(key);
    }

    setSerializedObject(key: string, value: Object, options?: CookieOptionsArgs) {
        if (options) {
            this._cookieService.putObject(key, value, options);
        } else {
            this._cookieService.putObject(key, value);
        }
    }

    removeCookie(key: string, options?: CookieOptionsArgs) {
        if (options) {
            this._cookieService.remove(key, options);
        } else {
            this._cookieService.remove(key);
        }
    }

    removeAllCookies() {
        this._cookieService.removeAll();
    }
}