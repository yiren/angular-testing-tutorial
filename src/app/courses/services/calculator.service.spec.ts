import { CalculatorService } from "./calculator.service";
import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service";

describe('CalculatorService', ()=>{

  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(()=>{
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers:[
        CalculatorService,
        // 除了測試主要的Service，其他的dependency可以只用mock的
        {provide: LoggerService, useValue: loggerSpy}
      ],
    });

    calculator = TestBed.get(CalculatorService);
  })

  // spec 1
  it('should add two numbers', ()=>{

    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  // spec 2
  it('should substract two numbers', ()=>{
    const result = calculator.subtract(4, 2);
    expect(result).toBe(2);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
