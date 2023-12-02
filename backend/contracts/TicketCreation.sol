// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Correct import statement

contract TicketCreation is ERC721, Ownable {

    uint256 public totalConcerts;
    uint256 public totalSupply;

    struct Concert {
        uint256 id;
        string name;
        string date;
        string time;
        string location;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
    }
    mapping(uint256 => Concert) concerts;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
     mapping(uint256 => mapping(address => bool)) public hasBought;

    constructor(string memory _name, string memory _symbol, address initialOwner) ERC721(_name, _symbol)
        Ownable(initialOwner) {}

    function list(
        string memory _name,
        string memory _date,
        string memory _time,
        string memory _location,
        uint256 _cost,
        uint256 _maxTickets
    ) public onlyOwner {
        totalConcerts++;
        concerts[totalConcerts] = Concert(totalConcerts, _name, _date, _time, _location, _cost, _maxTickets, _maxTickets);
    }

    function getConcert(uint256 _id) public view returns (Concert memory) {
        return concerts[_id];
    }

    function mint(uint _id, uint256 _seat) public payable {
        require(_id != 0);
        require(_id <= totalConcerts);
        require(msg.value >= concerts[_id].cost);
        require(seatTaken[_id][_seat] == address(0));
        require(_seat <= concerts[_id].maxTickets);

        concerts[_id].tickets -= 1;
        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);
        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function getAllSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "No funds available for withdrawal");
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
    
}
