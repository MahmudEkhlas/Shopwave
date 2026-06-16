import {format_currency} from "../../script/utils/money.js";

describe('test suite : formatCurrency', () =>{
    it('convert cents into dollars',() =>{
        expect(format_currency(2095)).toEqual('20.95');
    });
    it('works with zero', () =>{
        expect(format_currency(0)).toEqual('0.00');
    });
    it('rounds up to nearest cent', () =>{
        expect(format_currency(2000.5)).toEqual('20.01');
    });
});