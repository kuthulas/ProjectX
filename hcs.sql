-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2013 at 11:11 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hcs`
--

-- --------------------------------------------------------

--
-- Table structure for table `css`
--

CREATE TABLE IF NOT EXISTS `css` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `action` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `css`
--

INSERT INTO `css` (`transaction`, `name`, `description`, `action`) VALUES
('AddCustomer', 'InterSiteRoutingCSS', '', 'AddCSS'),
('AddReseller', '#Name#-CSS', '', 'AddCSS'),
('AddProvider', '#Name#-CSS', '', 'AddCSS');

-- --------------------------------------------------------

--
-- Table structure for table `csspt`
--

CREATE TABLE IF NOT EXISTS `csspt` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `routePartitionName` varchar(1000) DEFAULT NULL,
  `index` varchar(1000) DEFAULT NULL,
  `action` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `csspt`
--

INSERT INTO `csspt` (`transaction`, `name`, `routePartitionName`, `index`, `action`) VALUES
('AddCustomer', 'InterSiteRoutingCSS', 'InterSiteRoutingPT', '1', 'AddCSSPT');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `Name` varchar(1000) DEFAULT NULL,
  `CC` varchar(1000) DEFAULT NULL,
  `p2` varchar(1000) DEFAULT NULL,
  `p3` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cxnz`
--

CREATE TABLE IF NOT EXISTS `cxnz` (
  `src` varchar(1000) NOT NULL,
  `tgt` varchar(1000) NOT NULL,
  `type` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE IF NOT EXISTS `division` (
  `Type` varchar(1000) DEFAULT NULL,
  `p1` varchar(1000) DEFAULT NULL,
  `p2` varchar(1000) DEFAULT NULL,
  `p3` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inv`
--

CREATE TABLE IF NOT EXISTS `inv` (
  `tag` varchar(1000) NOT NULL,
  `tid` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `Type` varchar(1000) DEFAULT NULL,
  `SLCEXT` varchar(1000) DEFAULT NULL,
  `LID` varchar(1000) DEFAULT NULL,
  `p3` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE IF NOT EXISTS `model` (
  `requestkey` varchar(1000) DEFAULT NULL,
  `instruction` varchar(1000) DEFAULT NULL,
  `application` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `field1` varchar(100) NOT NULL,
  `field2` varchar(100) NOT NULL,
  `field3` varchar(100) NOT NULL,
  `field4` varchar(100) NOT NULL,
  `sequence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`requestkey`, `instruction`, `application`, `name`, `field1`, `field2`, `field3`, `field4`, `sequence`) VALUES
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'RouteSelPT-#CC#', '', '', '', '', 1),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkIntl-#CC#', '', '', '', '', 2),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkNatl-#CC#', '', '', '', '', 3),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkMobl-#CC#', '', '', '', '', 4),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkMobl-#CC#', '', '', '', '', 5),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkPRS-#CC#', '', '', '', '', 6),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkFPH-#CC#', '', '', '', '', 7),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkPCS-#CC#', '', '', '', '', 8),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkSVC-#CC#', '', '', '', '', 9),
('AddProviderCountryIPPBXs', 'AddPartition', 'CUCM', 'BlkSPR-#CC#', '', '', '', '', 10),
('AddCustomer', 'AddCSS', 'CUCM', 'InterSiteRoutingCSS', '', '', '', '', 1),
('AddCustomer', 'AddPartition', 'CUCM', 'InterSiteRoutingPT', '', '', '', '', 2),
('AddCustomer', 'AssocCSSPT', 'CUCM', 'InterSiteRoutingCSS', 'InterSiteRoutingPT', '', '', '', 3),
('AddLocation', 'AddPartition', 'CUCM', 'Site#LID#', '', '', '', '', 1),
('AddLocation', 'AddTP', 'CUCM', '#SLC##EXT#', 'InterSiteRoutingPT', 'IncomingToSite-CSS#LID#', '', '', 4),
('AddReseller', 'AddPartition', 'CUCM', '#Name#-PT', 'blah', '', '', '', 0),
('AddReseller', 'AddCSS', 'CUCM', '#Name#-CSS', 'blah', '', '', '', 0),
('AddProvider', 'AddPartition', 'CUCM', '#Name#-PT', 'blah', '', '', '', 0),
('AddProvider', 'AddCSS', 'CUCM', '#Name#-CSS', 'blah', '', '', '', 0),
('AddLocation', 'AddCSS', 'CUCM', 'Internal-CSS#LID#', '', '', '', '', 3),
('AddLocation', 'AddPartition', 'CUCM', 'AllowInterna#LID#', '', '', '', '', 2),
('AddLocation', 'AddTP', 'CUCM', '#EXT#', 'AllowInternal#LID#', 'IncomingToSite-CSS#LID#', '', '', 5),
('RegisterPhone', 'RegisterPhone', 'CUCM', '#LINE1#', 'Site<LID>', 'Internal-CSS<LID>', '', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

CREATE TABLE IF NOT EXISTS `provider` (
  `Name` varchar(1000) DEFAULT NULL,
  `CC` varchar(1000) DEFAULT NULL,
  `Dialplan` varchar(1000) DEFAULT NULL,
  `Other` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pt`
--

CREATE TABLE IF NOT EXISTS `pt` (
  `transaction` varchar(100) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `action` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pt`
--

INSERT INTO `pt` (`transaction`, `name`, `description`, `action`) VALUES
('AddCustomer', 'InterSiteRoutingPT', '', 'AddPT'),
('AddLocation', 'Site#LID#', '', 'AddPT'),
('AddReseller', '#Name#-PT', '', 'AddPT'),
('AddProvider', '#Name#-PT', '', 'AddPT'),
('AddLocation', 'AllowInterna#LID#', '', 'AddPT');

-- --------------------------------------------------------

--
-- Table structure for table `reseller`
--

CREATE TABLE IF NOT EXISTS `reseller` (
  `Name` varchar(1000) DEFAULT NULL,
  `CC` varchar(1000) DEFAULT NULL,
  `Service` varchar(1000) DEFAULT NULL,
  `Number` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tp`
--

CREATE TABLE IF NOT EXISTS `tp` (
  `transaction` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `pattern` varchar(1000) DEFAULT NULL,
  `usage` varchar(1000) DEFAULT NULL,
  `routePartitionName` varchar(1000) DEFAULT NULL,
  `callingSearchSpaceName` varchar(1000) DEFAULT NULL,
  `action` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tp`
--

INSERT INTO `tp` (`transaction`, `description`, `pattern`, `usage`, `routePartitionName`, `callingSearchSpaceName`, `action`) VALUES
('AddLocation', '', '#SLC##EXT#', '', 'InterSiteRoutingPT', 'IncomingToSite-CSS#LID#', 'AddTP'),
('AddLocation', '', '#EXT#', '', 'AllowInternal#LID#', 'IncomingToSite-CSS#LID#', 'AddTP');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
