import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {UserNameModel} from '../../models/new/userName.model';
import {UserNamePassword} from '../../models/new/userNamePassword.model';
import {UserNamePermiso} from '../../models/new/userNamePermiso.model';
import {ConfigService} from '../config.service';
import {Config} from '../../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendSessionService {

  readonly rootUrl = '/sima-backend/api/session/';

  private headers: HttpHeaders;
  private loggedInStatus = false;
  config: Config;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.headers = new HttpHeaders();
    // this.getConf();
    this.config = configService.get();
  }

  login(userNamePassword: UserNamePassword) {
    console.log('appId: ' + this.config.appId);
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'login', userNamePassword, {headers: this.headers});
  }

  isLoggedIn(userNameModel: UserNameModel): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isloggedin', userNameModel, {headers: this.headers});
  }

  logout(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'logout', userNameModel, {headers: this.headers});
  }

  getUser(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'user', userNameModel, {headers: this.headers});
  }

  getTokenAppId(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', userNameModel, {headers: this.headers});
  }

  isAuthorized(userNamePermiso: UserNamePermiso): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isauthorized', userNamePermiso, {headers: this.headers});
  }

  setLoggedInStatus(loggedInStatus: boolean) {
    this.loggedInStatus = loggedInStatus;
  }

  get isLoggedInStatus() {
    return this.loggedInStatus;
  }

  getConf() {
    this.configService.getConfig()
      .subscribe((data: Config) => {
        this.config = data;
        localStorage.setItem('appId', this.config.appId);
      });

  }
}
