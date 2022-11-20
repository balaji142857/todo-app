import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


   findElementByProp<T>(arr: any[], propName: string, propValue: any)  { 
    if (!arr || arr.length == 0 ) {
      return null;
    }
    return  arr.find(item => item[propName] === propValue);    
  }

}
