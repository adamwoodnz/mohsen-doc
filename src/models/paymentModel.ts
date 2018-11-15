export interface PaymentModel {
    amount: string;
    card: string;
    expiry: string;
    postCode: string;
    note?: string;
}
