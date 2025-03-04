declare module 'evm' {
  type Address = string;
  type Hash = string;
  type BlockNumber = number;
  
  export type Transaction = {
    hash: Hash;
    from: Address;
    to: Address;
    blockNumber: BlockNumber;
  }
}
