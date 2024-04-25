-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2024 at 04:34 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(15) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `phone`, `password`, `address`, `city`, `state`, `zip_code`, `price`) VALUES
(2, 'chris momo', 'cmomo@gmail.com', '0215222122', '$2y$10$wyk.E21/vKUS2N.1VVVqs.Re4JWyaxBweqkhyF5/GpPpU50Smgs2y', NULL, NULL, NULL, NULL, 0.00),
(3, 'Tami Jasmin', 'tjasminf@gmail.com', '0215247855', '$2y$10$Vrr1gYagB73y9O2GwUc9keHkmJTgxrQQVfYe9UJyDCxRv4aTcPRm2', NULL, NULL, NULL, NULL, 0.00),
(4, 'Mussah John', 'mjohn@gmail.com', '0215247855', '$2y$10$Dxdx.AWCJX1giTC8CMw7L.T.xSlMSrGlSWM0hJmjUIX9cECNkL4va', NULL, NULL, NULL, NULL, 0.00),
(5, 'Mustaffa Hajil', 'mhajil@gmail.com', '0215258965', '$2y$10$mEqgwquFxODud8QMsbBPsu2R5n56LHQtBHeFZfEBHCqYQe2p0klqu', NULL, NULL, NULL, NULL, 0.00),
(6, 'Mustaffa Hajil', 'mphiri@gmail.com', '0215258965', '$2y$10$XriBzH.e5FN/2kADwHuUeO2UCuDnfmCAhjMuTQTnOpMaAYad6K/mu', NULL, NULL, NULL, NULL, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL,
  `menu_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `menu_name`) VALUES
(2, 'Burger'),
(3, 'Khatte aloo'),
(4, 'Rice'),
(1, 'Sandwish');

-- --------------------------------------------------------

--
-- Table structure for table `menu_option`
--

CREATE TABLE `menu_option` (
  `option_id` int(11) NOT NULL,
  `option_name` varchar(100) NOT NULL,
  `menu_id` int(10) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `ingredients` varchar(250) DEFAULT NULL,
  `image_data` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_option`
--

INSERT INTO `menu_option` (`option_id`, `option_name`, `menu_id`, `category`, `price`, `ingredients`, `image_data`) VALUES
(1, 'Boiled chicken', 4, 'Rice', 23, 'Salt, Rice, water, chicken, Galick, cooking oil', 'One-pot-chicken-and-rice-62e986b.webp'),
(2, 'Vegetable', 4, 'Rice', 4, 'Green paper, cabbage, cooking oil, salt, anything', 'vegerice.JPG'),
(3, 'Vegetable ', 2, 'Burger', 15, 'Green paper, cabbage, cooking oil, salt, ban', 'chicken-bugger.PNG'),
(4, 'Crispy vegetable', 2, 'Burger', 15, 'Green paper, cabbage, cooking oil, salt, ban', 'Crispy.JPG'),
(5, 'Crispy vegetable', 3, 'Khatte aloo', 15, 'Green paper, cabbage, cooking oil, salt, ban', 'kate-aloo.jpeg'),
(6, 'Vegetable ', 1, 'Sandwish', 19, 'Green paper, cabbage, cooking oil, salt, ban', 'vegedelight.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `oder`
--

CREATE TABLE `oder` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `ordered_item` varchar(255) NOT NULL,
  `order_qty` int(10) NOT NULL,
  `order_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `oder`
--

INSERT INTO `oder` (`order_id`, `customer_id`, `customer_name`, `email`, `phone_number`, `ordered_item`, `order_qty`, `order_price`) VALUES
(1, 6, 'Mustaffa Hajil', 'mphiri@gmail.com', '0215258965', ' Vegetable ', 3, 15.00),
(2, 6, 'Mustaffa Hajil', 'mphiri@gmail.com', '0215258965', ' Boiled chicken', 4, 23.00),
(3, 5, 'Mustaffa Hajil', 'mhajil@gmail.com', '0215258965', 'Vegetable ', 1, 19.00),
(4, 5, 'Mustaffa Hajil', 'mhajil@gmail.com', '0215258965', ' Vegetable ', 2, 19.00),
(5, 4, 'Mussah John', 'mjohn@gmail.com', '0215247855', 'Vegetable ', 1, 15.00),
(6, 3, 'Tami Jasmin', 'tjasminf@gmail.com', '0215247855', ' Vegetable ', 1, 15.00),
(7, 3, 'Tami Jasmin', 'tjasminf@gmail.com', '0215247855', 'Vegetable', 1, 4.00),
(8, 2, 'chris momo', 'cmomo@gmail.com', '0215222122', 'Boiled chicken', 1, 23.00),
(9, 2, 'chris momo', 'cmomo@gmail.com', '0215222122', ' Boiled chicken', 5, 23.00),
(10, 2, 'chris momo', 'cmomo@gmail.com', '0215222122', ' Vegetable ', 6, 15.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`),
  ADD UNIQUE KEY `menu_name` (`menu_name`);

--
-- Indexes for table `menu_option`
--
ALTER TABLE `menu_option`
  ADD PRIMARY KEY (`option_id`);

--
-- Indexes for table `oder`
--
ALTER TABLE `oder`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu_option`
--
ALTER TABLE `menu_option`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `oder`
--
ALTER TABLE `oder`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
