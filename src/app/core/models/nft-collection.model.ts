export interface NFTCollection {
  collection: string;
  name: string;
  ticker: string;
  issuer?: string;
  timeStamp: number;
  canUpgrade: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canPause: boolean;
  canFreeze: boolean;
  canWipe: boolean;
  canAddSpecialRoles: boolean;
  canTransferNFTCreateRole: boolean;
  nftCreateStopped: boolean;
  creator: string;
  releaseDate: Date;
  uri: string
}
