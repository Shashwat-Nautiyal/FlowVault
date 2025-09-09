import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'FlowVault',
  projectId: 'flowvault-arbitrum-mvp', // You'll need to get this from WalletConnect
  chains: [arbitrumSepolia],
  ssr: false,
});
