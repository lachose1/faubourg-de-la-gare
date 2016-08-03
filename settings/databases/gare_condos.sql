-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 02, 2016 at 10:41 AM
-- Server version: 5.5.45-cll-lve
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gare_condos`
--

-- --------------------------------------------------------

--
-- Table structure for table `condos`
--

CREATE TABLE IF NOT EXISTS `condos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sold` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `condos`
--

INSERT INTO `condos` (`id`, `name`, `sold`) VALUES
(1, '101', 0),
(2, '102', 0),
(3, '103', 0),
(4, '104', 0),
(5, '201', 0),
(6, '202', 0),
(7, '203', 0),
(8, '204', 0),
(9, '301', 0),
(10, '302', 0),
(11, '303', 0),
(12, '304', 0),
(13, '401', 0),
(14, '402', 0),
(15, '403', 0),
(16, '404', 0),
(17, '501', 0),
(18, '502', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
