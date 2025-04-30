import { Balance } from './account'
// TODO: get these types directly from backend
export enum TransactionTypes {
    BALANCE_CHECK = 1,
    FUND_TRANSFER = 2,
}

export type TransactionType = {
    typeId: number,
    name: keyof typeof TransactionTypes,
}

// TransactionDto
export type Transaction = {
    transactionId: number,
    transactionType: TransactionType,
    sourceAccountId: number,
    targetAccountId: number,
    affectedBalance: Balance;
    creationTimeStamp: Date,
    closureTimeStamp: Date,
}
