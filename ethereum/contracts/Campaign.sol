// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract CampaignFactory {
    address[] public deployedCampaings;

    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaings.push(address(newCampaign));
    }

    function getDeployedCampaings() public view returns (address[] memory) {
        return deployedCampaings;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    uint256 numRequests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(uint256 => Request) public requests;
    uint256 public approversCount;

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = payable(recipient);
        r.complete = false;
        r.approvalCount = 0;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!requests[index].complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256 campaignMinimunContribution,
            uint256 campaignBalance,
            uint256 campaignNumRequests,
            uint256 campaignAproversCount,
            address campaignManager
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256 count) {
        return numRequests;
    }
}
