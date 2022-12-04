// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDcoin is ERC20 {
    constructor() ERC20("USDCtestnet", "USDCt") {
        _mint(msg.sender, 500 ether);
    }
}
