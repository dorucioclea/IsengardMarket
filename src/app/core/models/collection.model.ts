export interface Collection{
    collection: string;
    type: string;
    name: string;
    ticker: string;
    owner: string;
    timepstamp: Date;
    canFreeze: boolean;
}