export interface ITransaction {
  type: string,
  spaceIndex: string,
  amount?: number,
  from: string,
  to?: string,
  createdAt: number,
  txn: string
};
