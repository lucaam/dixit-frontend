import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class webUserNgService{

    private webUserSource:any = new BehaviorSubject('');
    webUsershared = this.webUserSource.asObservable();

    changeWebUser(message:any){
        this.webUserSource.next(message);
    }
}