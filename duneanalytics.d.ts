declare module '@duneanalytics/hooks' {
    export interface DuneProviderProps {
      duneApiKey: string;
      children: React.ReactNode;
    }
  
    export function DuneProvider(props: DuneProviderProps): JSX.Element;
    export function useTransactions(address: string, options: any): any;
  }