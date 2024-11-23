export interface LoanI {
    id:number;
    UserID: number;
    date_loan: Date;
    type_loanID: number;
    amount_loan: number;
    interests: number;
    state: boolean;
    nombreTipoPrestamo: string
}