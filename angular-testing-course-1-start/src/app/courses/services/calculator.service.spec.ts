import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calculator Service', () => {

    let calcService: CalculatorService;
    let loggerSpy: any;

    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });

        calcService = TestBed.inject(CalculatorService);
    });

    it('should add 2 numbers', () => {

        const rs = calcService.add(2, 3);

        expect(rs).toBe(5);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should substruct 2 numbers', () => {

        const rs = calcService.subtract(5, 2);

        expect(rs).toBe(3, 'unexpected subtraction result');

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});