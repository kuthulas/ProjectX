CREATE TABLE IF NOT EXISTS `CSS` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `PT` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `TP` (
  `transaction` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `pattern` varchar(1000) DEFAULT NULL,
  `usage` varchar(1000) DEFAULT NULL,
  `routePartitionName` varchar(1000) DEFAULT NULL,
  `callingSearchSpaceName` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `CSSPT` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `routePartitionName` varchar(1000) DEFAULT NULL,
  `index` varchar(1000) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;