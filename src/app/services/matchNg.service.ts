import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class matchNgService{

    private matchSource:any = new BehaviorSubject('');
    matchshared = this.matchSource.asObservable();

    changeMatch(message:any){
        this.matchSource.next(message);
    }
}