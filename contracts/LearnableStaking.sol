pragma solidity 0.8.15;

import "./Learnable.sol";

contract LearnableStaking {

    Learnable public immutable stakingToken;
    LearnableReward public immutable rewardToken;

    mapping(address => Staker) public stakers;
    uint public constant epoch = 60;
    uint constant public apy = 2; 

    struct Staker {
        uint balance;
        uint reward;
        uint lastTimeUpdate;
    }

        constructor(address _stakingToken, address _rewardToken) {
        stakingToken = Learnable(_stakingToken);
        rewardToken = LearnableReward(_rewardToken);
    }

    function getReward() public view returns (uint) {
        return stakers[msg.sender].reward + (((block.timestamp - stakers[msg.sender].lastTimeUpdate)/epoch)*2*stakers[msg.sender].balance)/100;
    }

    function stakeFund(uint _ammount) external{
        require(_ammount>0 , "ammount of tokens to be staked can't be null");
        stakingToken.transferFrom(msg.sender, address(this), _ammount);
        if (stakers[msg.sender].balance != 0) {
            stakers[msg.sender].reward = getReward();

        }
        stakers[msg.sender].balance += _ammount;
        stakers[msg.sender].lastTimeUpdate = block.timestamp;
    }

    function claimReward(uint _ammount) external{
        stakers[msg.sender].reward = getReward()
        require(_ammount>0 , "ammount of tokens to be claimed can't be null");
        require(_ammount <= stakers[msg.sender].reward , "ammount of tokens to be claimed can't be superior to rewards' balance");

        stakers[msg.sender].reward -= _ammount;
        stakers[msg.sender].lastTimeUpdate = block.timestamp;
        stakingToken.transferFrom(msg.sender, address(this), _ammount);
    }

    function withdrawFund(uint _ammount) external{
        require(_ammount>0 , "ammount of tokens to be withdrawn can't be null");
        require(_ammount <= stakers[msg.sender].balance , "ammount of tokens to be withdrawn can't be superior to deposit balance");

        stakers[msg.sender].reward = getReward(); 
        stakers[msg.sender].balance -= _ammount;
        stakers[msg.sender].lastTimeUpdate = block.timestamp;
        stakingToken.transferFrom(address(this), msg.sender, _ammount);

    }
}