export const WS_END_POINT = process.env.REACT_APP_WS_END_POINT || 'http://localhost:3000';
export const MAX_SPACE_SUPPLY_TOTAL = process.env.REACT_APP_MAX_SPACE_SUPPLY_TOTAL
                                    ? Number(process.env.REACT_APP_MAX_SPACE_SUPPLY_TOTAL)
                                    : 12;
export const ETH_USD_PRICE = process.env.ETH_USD_PRICE
                           ? Number(process.env.ETH_USD_PRICE)
                           : 3000;
