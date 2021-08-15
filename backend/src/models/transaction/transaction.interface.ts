export interface ITransaction {
  type: string,
  spaceIndex: string,
  amount?: number,
  from: string,
  to?: string,
  createdAt: number,
  txn: string
};

export interface IOverallStats {
  numberOfSales: number,
  totalLifeTimeValueOfAllSales: number,
  largestSales: ITransaction[],
  recentTransactions: ITransaction[]
}
