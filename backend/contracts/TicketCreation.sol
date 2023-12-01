// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Correct import statement

contract TicketCreation is ERC721, Ownable {
    //address public owner;
    /*
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }
    */
    uint256 public totalConcerts;

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
    
}
