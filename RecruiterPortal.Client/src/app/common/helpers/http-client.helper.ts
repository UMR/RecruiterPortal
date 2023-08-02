import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authorizationServerUrl, pathMatch, scopes } from '../constants/auth-keys';

const accessTokenUrl = `${authorizationServerUrl + pathMatch}/connect/token`;
const accessTokenBody = `grant_type=password&username={0}&password={1}&scope=${scopes.join('+')}`;

const accessTokenRevokeUrl = `${authorizationServerUrl + pathMatch}/connect/revocation`;
const refreshTokenRevokeBody = 'token={0}&token_type_hint=refresh_token';

const accessTokenFromRefreshTokenBody = 'grant_type=refresh_token&refresh_token={0}';

function getheaders(): HttpHeaders {
    let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic V2ViVU1SUmVjcnVpdG1lbnRCYXNpY0NsaWVudDo4YnJNTkxxbGJ2ZE84WGZra0FxTWgvZXNrcnBCakxKblVZM0hLQWVvZTYwPQ=='
    });
    return headers;
}

// oldQueryParam will be removed for static connection string
export function getToken(http: HttpClient, userID: string, password: string, oldQueryParam: string): any {
    const body = accessTokenBody.replace('{0}', userID).replace('{1}', password);
  return http.post(accessTokenUrl + "?old=" + oldQueryParam , body, { headers: getheaders() });
}

export function revokeToken(http: HttpClient, refreshToken: string): any {
    const body = refreshTokenRevokeBody.replace('{0}', refreshToken);
    return http.post(accessTokenRevokeUrl, body, { headers: getheaders() });
}

export function getTokenFromRefreshToken(http: HttpClient, refreshToken: string): any {
    const body = accessTokenFromRefreshTokenBody.replace('{0}', refreshToken);
    return http.post(accessTokenUrl, body, { headers: getheaders() });
}
