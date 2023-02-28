import { defer, mergeMap, Observable, Observer, of } from "rxjs";
import { subscribeNTimes, subscribeObservableFunctionsNTimes } from "../utils/utils";

const ARRAY_LEN = 5;

const generateRandomIntNumbers = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

const getRandomNumbersCold = (): Observable<number[]> => {
    return of(1).pipe(
        mergeMap(()=>of(generateRandomIntNumbers(ARRAY_LEN)))
    )
}
const getRandomNumbersCold2 = (): Observable<number[]> => {
    return defer(()=>of(generateRandomIntNumbers(ARRAY_LEN)));
}
const getRandomNumbersHot = (): Observable<number[]> => {
    return of(generateRandomIntNumbers(ARRAY_LEN));
}

export const executeRandomNumbersObservables = (n = 3) => {
    const observablesToSubscribe: (() => Observable<any>)[] = [getRandomNumbersCold, getRandomNumbersCold2, getRandomNumbersHot];

    subscribeObservableFunctionsNTimes(observablesToSubscribe, n);
}