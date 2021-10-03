export interface NFT {
  identifier: string;
  collection: string;
  timestamp: Date;
  attributes: string;
  nonce: number;
  type: string;
  name: string;
  creator: string;
  royalties: null;
  uris: string[];
}
