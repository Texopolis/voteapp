pragma solidity >=0.4.22 <0.9.0;

contract Vote {

    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }

    mapping (uint => Candidate) public candidateLookup;
    mapping (address => bool) public voters;

    event voterEvent(uint indexed id);

    uint public candidatesCount;

    constructor () {
        addCandidate("Joey Sonstein2");
        addCandidate("Sarah Marshal2");
    }

    function addCandidate (string memory _name) private{
        candidatesCount++;
        candidateLookup[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function getCandidates () external view returns (string[] memory, uint[] memory){
        string[] memory names = new string[](candidatesCount);
        uint[] memory voteCounts = new uint[](candidatesCount);
        for (uint i = 0; i < candidatesCount; i++){
            names[i]= candidateLookup[i].name;
            voteCounts[i]= candidateLookup[i].voteCount;
        }
        return (names, voteCounts);
    }

    function vote (uint _candidateId) external {
        require (!voters[msg.sender]);
        require (_candidateId >= 0 && _candidateId <= candidatesCount-1);
        candidateLookup[_candidateId].voteCount++;
        emit voterEvent(_candidateId);
        //record voter has voted
        // voters[msg.sender]= true;
    }
    
}