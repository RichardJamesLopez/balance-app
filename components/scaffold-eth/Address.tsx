import { useEnsName } from 'wagmi';

export const Address = ({ address }: { address?: `0x${string}` }) => {
  const { data: ensName } = useEnsName({ address });
  return <span>{ensName ?? address?.slice(0, 6)}...{address?.slice(-4)}</span>;
}; 