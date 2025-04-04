import './App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserProvider } from 'ethers';
import Login from './components/Login';

function getLibrary(provider) {
  return new BrowserProvider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Login />
    </Web3ReactProvider>
  );
}

export default App;
