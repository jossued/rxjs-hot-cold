import { defer, mergeMap, Observable, Observer, of } from "rxjs";

const generateRandomNumbers = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

const getRandomNumbersCold = (): Observable<number[]> => {
    return of(1).pipe(
        mergeMap(()=>of(generateRandomNumbers(5)))
    )
}
const getRandomNumbersCold2 = (): Observable<number[]> => {
    return defer(()=>of(generateRandomNumbers(5)));
}
const getRandomNumbersHot = (): Observable<number[]> => {
    return of(generateRandomNumbers(5));
}

const observer  = (observable: string): Observer<any> => ({
    next: (value) => console.log(value, observable),
    complete: () => console.log("complete"),
    error: (error) => console.error(error),
})

const subscribeNTimes = (observable: Observable<any>, n: number, name: string) => {
    for (let i = 0; i < n; i++) {
        observable.subscribe(observer(name));
      }
}

const main = () => {
    const n = 3;

    const cold1$  = getRandomNumbersCold();
    const cold2$  = getRandomNumbersCold2();
    const hot$  = getRandomNumbersHot();

    subscribeNTimes(cold1$, n, "c1");
    subscribeNTimes(cold2$, n, "c2");
    subscribeNTimes(hot$, n, "h");
}

main();