export interface QuoteDetailsArg {
    descr: string;
    u_price: number;
    sub_total: number;
    qty: number;
}

export interface QuotationProps{
    quoteDetails: QuoteDetailsArg[];
    totalPrice: number;
    quoteDate: {
        q_date: string;
        v_date: string;
        q_no: string;
    }
    compDetails: {
        sender: {
            name: string;
            country: string;
            phone: string;
        };
        receiver: {
            name: string;
            country: string;
            phone: string;
        };
        note: string;
    };
    difLogo: string | null;
}