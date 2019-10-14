import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {
  private REST_API_SERVER = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(){
    return this.httpClient.get(this.REST_API_SERVER + 'userdetails');
  }

  getSampleChildrenData(): Observable<Test[]> {
    return of([
      {
        test: 'testdataxsw1',
        dataFor: 'child1'
      },
      {
        test: 'testdata2',
        dataFor: 'child2'
      }
    ]);
  }


}

export interface Test {
  test: string;
  dataFor: string;
}
