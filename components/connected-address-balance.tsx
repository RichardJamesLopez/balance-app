import { useAccount } from "wagmi";
import { Address, Balance } from "@/components/scaffold-eth";

export const ConnectedAddressBalance = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div>
      <h2>Your Ethereum Balance</h2>
      Address: <Address address={connectedAddress} />
      Balance: <Balance address={connectedAddress} />
    </div>
  );
};
/*
Make sure you have:
The scaffold-eth components directory in your project at the root level
Your tsconfig.json configured to resolve the ~~ path alias to your root directory
If you're missing these components, you might need to create a new project using the Scaffold-ETH 2 CLI:
*/