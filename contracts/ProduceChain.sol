// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";

contract ProduceChain {
    struct ProduceEntry {
        string produceId;
        address farmer;
        uint256 timestamp;
        string hash;
        string status;
        address currentHolder;
        uint256 price;
        bool isSold;
    }

    struct HistoryEntry {
        string produceId;
        address actor;
        string action;
        uint256 timestamp;
        string details;
    }

    mapping(string => ProduceEntry) public produce;
    mapping(string => HistoryEntry[]) public history;

    event ProduceRegistered(
        string indexed produceId,
        address indexed farmer,
        uint256 timestamp,
        string hash
    );

    event StatusUpdated(
        string indexed produceId,
        address indexed distributor,
        uint256 timestamp,
        string newStatus
    );

    event RetailEntry(
        string indexed produceId,
        address indexed retailer,
        uint256 price,
        uint256 timestamp
    );

    function registerProduce(
        string memory produceId,
        address farmer,
        uint256 timestamp,
        string memory hash
    ) public {
        require(produce[produceId].farmer == address(0), "Produce already registered");
        
        produce[produceId] = ProduceEntry({
            produceId: produceId,
            farmer: farmer,
            timestamp: timestamp,
            hash: hash,
            status: "Registered",
            currentHolder: farmer,
            price: 0,
            isSold: false
        });

        history[produceId].push(HistoryEntry({
            produceId: produceId,
            actor: farmer,
            action: "Registered",
            timestamp: timestamp,
            details: string.concat("Produce registered with hash: ", hash)
        }));

        emit ProduceRegistered(produceId, farmer, timestamp, hash);
    }

    function updateStatus(
        string memory produceId,
        address distributor,
        uint256 timestamp,
        string memory newStatus
    ) public {
        require(produce[produceId].farmer != address(0), "Produce not registered");
        require(bytes(newStatus).length > 0, "Status cannot be empty");

        produce[produceId].status = newStatus;
        produce[produceId].currentHolder = distributor;

        history[produceId].push(HistoryEntry({
            produceId: produceId,
            actor: distributor,
            action: "Status Update",
            timestamp: timestamp,
            details: string.concat("Status updated to: ", newStatus)
        }));

        emit StatusUpdated(produceId, distributor, timestamp, newStatus);
    }

    function retailEntry(
        string memory produceId,
        address retailer,
        uint256 price,
        uint256 timestamp
    ) public {
        require(produce[produceId].farmer != address(0), "Produce not registered");
        require(price > 0, "Price must be greater than 0");

        produce[produceId].price = price;
        produce[produceId].currentHolder = retailer;
        produce[produceId].isSold = true;
        produce[produceId].status = "Sold";

        history[produceId].push(HistoryEntry({
            produceId: produceId,
            actor: retailer,
            action: "Retail Sale",
            timestamp: timestamp,
            details: string.concat("Sold at retail price: ", Strings.toString(price), " wei")
        }));

        emit RetailEntry(produceId, retailer, price, timestamp);
    }

    function getProduce(string memory produceId) public view returns (ProduceEntry memory) {
        return produce[produceId];
    }

    function getHistory(string memory produceId) public view returns (HistoryEntry[] memory) {
        return history[produceId];
    }

    function getHistoryLength(string memory produceId) public view returns (uint256) {
        return history[produceId].length;
    }
}