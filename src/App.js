import './App.css';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserProvider } from 'ethers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateAcc from './components/CreateAcc';
import Dashboard from './components/dashboard/Dashboard';

function getLibrary(provider) {
  return new BrowserProvider(provider);
}

function App() {
  return (
    <Web3ReactProvider 
      getLibrary={getLibrary}
      connectorStorageKey="web3ReactConnectors"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAcc />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
