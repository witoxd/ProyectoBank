export interface AmortizationI {
    id: number;
    LoansID: number;
    date: Date;
    amount: number;
    state: boolean;
}