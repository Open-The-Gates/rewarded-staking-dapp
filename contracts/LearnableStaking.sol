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
        if (stakers[msg.sender].balance == 0) {
            return 0;
        }

        require(stakers[msg.sender].lastTimeUpdate > 0, "lastTimeUpdate has not been initialised");
        return stakers[msg.sender].reward + (((block.timestamp - stakers[msg.sender].lastTimeUpdate)/epoch)*2*stakers[msg.sender].balance)/100;
    }

    modifier updateRewardAndLastTimeUpdate() {
        stakers[msg.sender].reward = getReward();
        stakers[msg.sender].lastTimeUpdate = block.timestamp;
        _;
    }

    modifier checkPositiveAmount(uint _amount) {
        require(_amount>0, "amount of tokens can't be null");
        _;
    }

    modifier initialiseLastTimeUpdate() {
        if (stakers[msg.sender].lastTimeUpdate == 0) {
           stakers[msg.sender].lastTimeUpdate = block.timestamp;
        }
        _;
    }

    function stakeFund(uint _amount) external checkPositiveAmount(_amount) updateRewardAndLastTimeUpdate{
        require(stakingToken.approve(msg.sender, _amount), "could not approve transfer")
        require(stakingToken.transferFrom(msg.sender, address(this), _amount),"could not transfer staking funds");
        stakers[msg.sender].balance += _amount;
    }

    function claimReward(uint _amount) external checkPositiveAmount(_amount) updateRewardAndLastTimeUpdate{
        require(_amount <= stakers[msg.sender].reward, "amount of tokens to be claimed can't exceed rewards' balance");

        stakers[msg.sender].reward -= _amount;
        require(rewardToken.approve(msg.sender, _amount), "could not approve withdrawal")
        rewardToken.transferFrom(msg.sender, address(this), _amount);
    }

    function withdrawFund(uint _amount) external checkPositiveAmount(_amount) updateRewardAndLastTimeUpdate{
        require(_amount <= stakers[msg.sender].balance, "amount of tokens to be withdrawn can't exceed deposit balance");

        stakers[msg.sender].balance -= _amount;
        require(stakingToken.approve(msg.sender, _amount), "could not approve withdrawal")
        stakingToken.transferFrom(address(this), msg.sender, _amount, "transfer failed");
    }
}
