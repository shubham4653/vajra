// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RateLimitToken is ERC20, Ownable {
    mapping(address => uint256) public lastRequestTime;
    uint256 public requestCost = 1 * 10**18; // 1 Token per request
    uint256 public timeLimit = 60; // 60 seconds cooldown

    constructor() ERC20("RateLimitToken", "RLT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // Mint 1 million tokens to owner
    }

    function requestAccess() external {
        require(balanceOf(msg.sender) >= requestCost, "Not enough tokens");
        require(block.timestamp >= lastRequestTime[msg.sender] + timeLimit, "Cooldown active");
        
        _burn(msg.sender, requestCost);
        lastRequestTime[msg.sender] = block.timestamp;
    }

    function setRequestCost(uint256 _cost) external onlyOwner {
        requestCost = _cost;
    }
    
    function setTimeLimit(uint256 _timeLimit) external onlyOwner {
        timeLimit = _timeLimit;
    }
}