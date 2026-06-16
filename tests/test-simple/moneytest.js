import { format_currency } from "../../script/utils/money.js";

if(format_currency(20998) === '209.98'){
    console.log('passed');
}
else console.log('Failed');