import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe('Async Test Examples',()=>{

    it('async test example with jasmin done()',(done:DoneFn)=>{

         let flag = false;

         setTimeout(()=>{
            console.log('running assertions'); 
            flag = true;
            expect(flag).toBeTruthy();
            done();

         },1000);

    });

    it('async test example - setTimeout', fakeAsync(()=>{
        let flag = false;

        setTimeout(()=>{},100);

         setTimeout(()=>{
            flag = true;
         },1000);

         // tick(1000);

         flush(); // execute all timeouts

         expect(flag).toBeTruthy();

    }));

    it('Async test example - plain Promise', fakeAsync(()=>{
        let flag = false;
        console.log('Creating promise');

        queueMicrotask(()=>{
            console.log('my microtask');
        });

        Promise.resolve().then(()=>{
            console.log('Promise evaluated successfully');
            flag = true;
            return Promise.resolve(flag);
        }).then((flag:boolean)=>{
            console.log(`fulfilled flag->${flag}`);
        });

        flushMicrotasks();

        console.log('Runnig test assertions');
        expect(flag).toBeTruthy();
    }));

    it('Async test eample - Promise+setTimeout', fakeAsync(()=>{

        let counter = 0;

        Promise.resolve().then(()=>{
            counter+=10;

            setTimeout(()=>{
                counter+=1;
            },1000)
        });

        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(11);
    }));

    it('Async test example - Observable', fakeAsync(()=>{

        let flag = false;
        console.log('creating observabl');

        const test$ = of(flag).pipe(delay(1000));

        test$.subscribe(()=>{
            flag = true;
        });

        tick(1000);
        expect(flag).toBeTruthy();
    }));

});