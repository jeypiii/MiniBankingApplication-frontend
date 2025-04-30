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

// AccountDto
export type Balance = {
    // TODO: use class equivalent to BigDecimal
    depositBalance: string,
    totalBalance: string,
}