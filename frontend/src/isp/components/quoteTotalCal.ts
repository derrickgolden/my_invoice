import { QuoteDetailsArg } from "./type";

export const quoteTotalCal = (arr: QuoteDetailsArg[]) =>{
    var total = 0;
    const details = arr.map((obj, i) =>{
        const sub_total = Number(obj.qty) * Number(obj.u_price);
        total += sub_total;
        return {...obj, sub_total};
    })
    return {details, total};
}

export const quoteTableKeys=  ["descr", "u_price", "qty"]
