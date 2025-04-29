// TODO: get this directly from backend
export enum AccountTypes {
    CHECKINGS = 1,
    SAVINGS = 2,
}

export type AccountType = {
    typeId: number,
    name: keyof typeof AccountTypes,
}

export type Account = {
    accountId: number,
    userId: number,
    ownerName: string,
    accountType: AccountType,
}

export type Balance = {
    // TODO: use class equivalent to BigDecimal
    depositBalance: string,
    totalBalance: string,
}