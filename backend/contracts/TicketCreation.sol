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

    constructor(string memory _name, string memory _symbol, address initialOwner) ERC721(_name, _symbol)
        Ownable(initialOwner) {}
}
