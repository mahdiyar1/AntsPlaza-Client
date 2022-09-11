export interface Order {
    id: string;
    trader: number;
    strategy: number;
    symbol: string;
    status: string;
    side: string;
    position: string;
    average: number;
    averagePriceFeeIncluded: number;
    amount: number;
    cost: number;
    costFeeAdjusted: number;
    fee: number;
}