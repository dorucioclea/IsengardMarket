export interface NFTCollection {
  collection: string;
  name: string;
  ticker: string;
  issuer: string;
  timestamp: number;
  canUpgrade: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canPause: boolean;
  canFreeze: boolean;
  canWipe: boolean;
  canAddSpecialRoles: boolean;
  canTransferNFTCreateRole: boolean;
  NFTCreateStopped: boolean;
}
