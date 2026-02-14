// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AuditLog {

    struct LogEntry {
        string eventName;
        uint256 timestamp;
    }

    // txnId => array of LogEntry
    mapping(string => LogEntry[]) private logs;

    event AuditWritten(
        string indexed txnId,
        string eventName,
        uint256 timestamp
    );

    function writeLog(string memory txnId, string memory eventName) public {
        LogEntry memory entry = LogEntry({
            eventName: eventName,
            timestamp: block.timestamp
        });

        logs[txnId].push(entry);

        emit AuditWritten(txnId, eventName, block.timestamp);
    }

    function getLogs(string memory txnId) 
        public 
        view 
        returns (LogEntry[] memory) 
    {
        return logs[txnId];
    }
}
