import React, { useState } from "react";
import { Box, Button } from '@material-ui/core';

function App() {
  let [tronAddress, setTronAddress] = useState("");
  let [blockChainName, setBlockChainName] = useState("");
  let [ethereumAddress, setEthereumAddress] = useState("");
  let [solanaAddress, setSolanaAddress] = useState("");

  function gettronweb() {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      tronAddress = window.tronWeb.defaultAddress.base58;
      setTronAddress(tronAddress);
    }
  }

  function getethereumweb() {
    if(window.ethereum){
      window.ethereum.request({ method: 'eth_requestAccounts' });
      ethereumAddress = window.ethereum.selectedAddress;
      setEthereumAddress(ethereumAddress);
      let chainId = window.ethereum.chainId;
      if(chainId === "0x13881"){
        blockChainName = "Polygon Matic";
        setBlockChainName(blockChainName);
      }
      else if(chainId === "0x61"){
        blockChainName = "Binance";
        setBlockChainName(blockChainName);
      }
      else if(chainId === "0x1"){
        blockChainName = "Ethereum Main Net";
        setBlockChainName(blockChainName);
      }
      else if(chainId === "0x3"){
        blockChainName = "Ropsten Test Net";
        setBlockChainName(blockChainName);
      }
      else if(chainId === "0x4"){
        blockChainName = "Rinkeby Test Net";
        setBlockChainName(blockChainName);
      }
    }
  }

  function getsolanaweb(){
    window.solana.connect();
    window.solana.request({ method: "connect" })
    window.solana.on("connect", () => console.log("connected!"))
    if(window.solana.publicKey != null)
    {
      solanaAddress = window.solana.publicKey.toString();
      setSolanaAddress(solanaAddress);
    }
  }
    return (
      <Box p={3}  display="flex" flexDirection="column" alignItems="center">
        <Box m={4}>
          <Button style={{margin:"4px"}}  variant="contained" color="primary" onClick={gettronweb}>Connect to TronLink</Button>
          <Button style={{margin:"4px"}} variant="contained" color="primary" onClick={getethereumweb}>Connect to MetaMask</Button>
          <Button style={{margin:"4px"}} variant="contained" color="primary" onClick={getsolanaweb}>Connect to Solana</Button>
        </Box>
        <Box>
          <h3> Tron Address: {tronAddress}</h3>
          <h3> MetaMask Address({blockChainName}): {ethereumAddress}</h3>
          <h3> Solana Address: {solanaAddress}</h3>
        </Box>
      </Box>
    );
}

export default App;
