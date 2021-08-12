export interface IWsClient {
  walletAddress: string,
  isWatchingSpaceDetail: boolean,
  spaceId?: string,
  clientId: string
};

export interface IWsClients {
  [index: string]: IWsClient;
};
