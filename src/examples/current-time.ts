import { defer, merge, Observable, of, timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { subscribeObservableFunctionsNTimes } from "../utils/utils";

const getCurrentDateCold = defer(() => of(new Date()))

const getCurrentDateHot = of(new Date())

const getCurrentDateAfter2S = (): Observable<Date> => {
    console.log(new Date());

    return timer(2000)
        .pipe(switchMap(_ => merge(getCurrentDateCold, getCurrentDateHot)))
}

export const executeCurrentDateObservables = (n = 3) => {
    const observablesToSubscribe: (() => Observable<any>)[] = [getCurrentDateAfter2S];

    subscribeObservableFunctionsNTimes(observablesToSubscribe, n);
}