export interface NFT {
  identifier: string;
  collection: string;
  timestamp: Date;
  attributes: string;
  nonce: number;
  type: NFTType | string;
  name: string;
  thumbnailUrl?: string,
  creator: string;
  royalties: number;
  uris: string[];
  url: string;
  tags: string[];
  metadata: Metadata;
  fileType?: string;
  fileUri?: string;
  fileName?: string;
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
