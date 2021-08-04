export interface IWsClient {
  walletAddress: string,
  isWatchingSpaceDetail: boolean,
  spaceId?: string
};

export interface IWsClients {
  [index: string]: IWsClient;
};
