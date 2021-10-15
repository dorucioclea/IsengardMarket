export interface NFT {
  identifier: string;
  collection: string;
  timestamp: Date;
  attributes: string;
  nonce: number;
  type: NFTType;
  name: string;
  creator: string;
  royalties: number;
  uris: string[];
  url: string;
  tags: [string];
  metadata: Metadata;
  owner: string;
}

export interface IsengardNFT extends NFT {
  createdAt: Date;
  minted:boolean;
}

export enum NFTType{
  NonFungibleESDT,
  FungibleESDT
}

export interface Metadata {
  description: string;
  fileType: string;
  fileUri: string;
  fileName: string;
}
