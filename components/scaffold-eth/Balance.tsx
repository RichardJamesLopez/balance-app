'use client'

import { useBalance } from 'wagmi'

export const Balance = ({ address }: { address?: `0x${string}` }) => {
  const { data } = useBalance({ address });
  return <span>{data?.formatted ?? '0'} {data?.symbol}</span>;
}; 