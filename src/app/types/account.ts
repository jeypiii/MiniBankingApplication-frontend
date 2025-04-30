// TODO: get these types directly from backend
export enum AccountTypes {
    CHECKINGS = 1,
    SAVINGS = 2,
}

export type AccountType = {
    typeId: number,
    name: keyof typeof AccountTypes,
}

// AccountDto
export type Account = {
    accountId: number,
    accountNumber: number,
    userId: number,
    ownerName: string,
    accountType: AccountType,
    balance: Balance,
}

// AccountDetailsDto
export type AccountDetails = {
    accountId: number,
    accountNumber: number,
    user: unknown,  // TODO: add User type
    ownerName: string,
    accountType: AccountType,
    balance: Balance,
    creationTimestamp: Date,
    closureTimestamp: Date,
}

// BalanceDto
export type Balance = {
    // TODO: use class equivalent to BigDecimal
    currencyCode: string,
    depositBalance: string,
    totalBalance: string,
}