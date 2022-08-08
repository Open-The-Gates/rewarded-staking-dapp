pragma solidity 0.8.15;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract Learnable is ERC20 {
    constructor() ERC20("Learnable", "LRNB") {
        _mint(msg.sender, 10**6 * 10**uint(decimals()));
    }
}

contract LearnableReward is ERC20 {
    constructor() ERC20("Learnable Rewards", "LRNR") {
        _mint(msg.sender, 10**6 * 10**uint(decimals()));
    }
}