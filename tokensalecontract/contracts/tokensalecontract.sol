// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSale is Ownable {
    IERC20 public token;
    uint256 public rate = 100; // 1 ETH = 100 tokens

    constructor(address _token, address _owner) Ownable(_owner) {
        token = IERC20(_token);
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 tokensToBuy = msg.value * rate;

        // Ensure owner has approved the contract to spend tokens on their behalf
        uint256 allowance = token.allowance(owner(), address(this));
        require(allowance >= tokensToBuy, "Token allowance too low");

        // Ensure owner has enough token balance
        uint256 ownerBalance = token.balanceOf(owner());
        require(ownerBalance >= tokensToBuy, "Not enough tokens in reserve");

        // Transfer tokens from owner to buyer
        bool success = token.transferFrom(owner(), msg.sender, tokensToBuy);
        require(success, "Token transfer failed");
    }

    // Allow owner to withdraw collected ETH
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}