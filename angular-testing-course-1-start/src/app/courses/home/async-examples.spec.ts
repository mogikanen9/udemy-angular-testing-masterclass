import { fakeAsync, flush, tick } from "@angular/core/testing";

fdescribe('Async Test Examples',()=>{

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

    fit('Async test example - plain Promise', ()=>{
        let flag = false;
        console.log('Creating promise');

        setTimeout(()=>{
            console.log('set timeout');
        });

        queueMicrotask(()=>{
            console.log('my microtask');
        });

        Promise.resolve().then(()=>{
            console.log('Promise evaluated successfully');
            flag = true;
        })
        console.log('Runnig test assertions');
        expect(flag).toBeTruthy();
    });

});