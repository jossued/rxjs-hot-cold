import { Observable, Observer } from "rxjs";

export const observer  = (observable?: string): Observer<any> => ({
    next: (value) => console.log(value, observable),
    complete: () => console.log("complete"),
    error: (error) => console.error(error),
})

export const subscribeNTimes = (observable: Observable<any>, n: number, name: string): void => {
    for (let i = 0; i < n; i++) {
        observable.subscribe(observer(name));
      }
}

export const subscribeObservableFunctionsNTimes = (observableFunctions: (() => Observable<any>)[], n: number):void => {
    observableFunctions.forEach((obs$, index) => subscribeNTimes(obs$(), n, obs$.name));
}