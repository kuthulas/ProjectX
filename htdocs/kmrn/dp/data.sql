INSERT INTO `css` (`transaction`, `name`, `description`) VALUES

('AddCustomer', 'InterSiteRoutingCSS', ''),
('AddReseller', '#Name#-CSS', 'blah', ''),
('AddProvider', '#Name#-CSS', 'blah', '')




INSERT INTO `pt` (`transaction`, `name`, `description`) VALUES
('AddCustomer', 'InterSiteRoutingPT', ''),
('AddLocation', 'Site#LID#', '',),
('AddReseller', '#Name#-PT', 'blah', ''),
('AddProvider', '#Name#-PT', 'blah', ''),
('AddLocation', 'AllowInterna#LID#', ''),


INSERT INTO `csspt` (`transaction`, `name`, `routePartitionName`, `index`) VALUES
('AddCustomer', 'InterSiteRoutingCSS', 'InterSiteRoutingPT', '1'),

INSERT INTO `tp` (`transaction`, `description`, `pattern`, `usage`, `routePartitionName`, `callingSearchSpaceName`) VALUES.
('AddLocation','','#SLC##EXT#', '', 'InterSiteRoutingPT', 'IncomingToSite-CSS#LID#'),
('AddLocation','','#EXT#', '', 'AllowInternal#LID#', 'IncomingToSite-CSS#LID#')