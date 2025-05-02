-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysqldbhost
-- Generation Time: May 02, 2025 at 04:38 PM
-- Server version: 10.4.28-MariaDB-1:10.4.28+maria~ubu2004
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `motorcycle_repair_shop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `pre_status` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `image_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `service_id`, `user_id`, `created_at`, `modified_at`, `address_id`, `status`, `pre_status`, `note`, `staff_id`, `image_url`) VALUES
(79, 7, 2, '2024-08-04 01:12:35', '2024-11-16 21:23:51', 135, 'done', 'accepted', 'sdfsdf', 12, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201433/repairshopp/uploads/tk8u9kw6t4yb5cejytoj.webp'),
(80, 1, 2, '2024-08-05 01:12:53', '2024-10-24 22:15:28', 143, 'done', 'accepted', '', 12, ''),
(81, 1, 2, '2024-08-06 01:13:09', '2024-10-20 15:30:34', 90, 'done', 'accepted', '', 1, ''),
(82, 1, 2, '2024-08-07 01:13:19', '2024-10-20 15:31:36', 91, 'done', 'accepted', '', 12, ''),
(83, 1, 2, '2024-08-08 01:16:47', '2024-10-20 15:30:36', 92, 'done', 'accepted', '', 13, ''),
(84, 1, 2, '2024-08-09 01:16:58', '2024-10-20 15:31:36', 93, 'done', 'accepted', '', 12, ''),
(85, 1, 2, '2024-08-04 01:17:08', '2024-08-04 11:43:57', 94, 'done', '', '', 1, ''),
(89, 1, 2, '2024-08-04 10:48:26', '2024-10-20 11:42:05', 98, 'accepted', 'accepted', '', 14, ''),
(105, 2, 2, '2024-10-07 22:32:12', '2024-10-07 22:32:12', 118, 'done', '', '', 16, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201433/repairshopp/uploads/tk8u9kw6t4yb5cejytoj.webp'),
(106, 1, 2, '2024-10-19 15:06:41', '2024-10-19 15:06:41', 120, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201436/repairshopp/uploads/ddz1p5ym7zjk9opqzpv0.webp'),
(107, 1, 2, '2024-10-19 15:07:47', '2024-10-19 15:07:47', 121, 'done', '', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201437/repairshopp/uploads/vlw5l38zbxyar9boehjw.webp'),
(108, 1, 2, '2024-10-19 15:08:39', '2024-10-19 15:08:39', 122, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201438/repairshopp/uploads/ppe6l9uqvjpvjecqsk4u.webp'),
(109, 1, 2, '2024-10-19 22:18:05', '2024-10-19 22:18:05', 123, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201439/repairshopp/uploads/sbgymqydyggxna6jqrhh.webp'),
(110, 1, 1, '2024-10-19 22:18:47', '2024-10-19 22:18:47', 124, 'done', '', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201440/repairshopp/uploads/nwpjoodaouzpowwmuqay.webp'),
(111, 1, 2, '2024-10-19 22:19:16', '2024-10-19 22:19:16', 125, 'done', '', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201441/repairshopp/uploads/fu3p59t2yxs0f5qmux6j.webp'),
(112, 1, 2, '2024-10-19 22:27:03', '2024-10-19 22:27:03', 126, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201442/repairshopp/uploads/flnk5swlhhcu42xycmrt.webp'),
(113, 1, 2, '2024-10-19 22:27:06', '2024-10-19 22:27:06', 127, 'done', '', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201443/repairshopp/uploads/lneyoiplc56mqgwpoqxx.webp'),
(114, 1, 2, '2024-10-19 22:53:45', '2024-10-19 22:53:45', 128, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201444/repairshopp/uploads/qfz57wcp13kvewcdkr2j.webp'),
(115, 1, 2, '2024-10-20 12:12:57', '2024-10-20 12:12:57', 129, 'done', '', '', 11, ''),
(116, 1, 2, '2024-10-20 12:21:48', '2024-10-20 12:37:04', 130, 'done', 'pending', '', 13, ''),
(120, 2, 2, '2024-10-20 15:33:33', '2024-10-24 14:48:36', 134, 'done', 'pending', '', 13, ''),
(121, 1, 2, '2024-10-20 22:26:19', '2024-10-20 22:26:19', 135, 'done', 'accepted', '', 13, ''),
(122, 1, 2, '2024-10-20 22:27:29', '2024-10-20 22:27:29', 136, 'done', '', '', 13, ''),
(123, 1, 2, '2024-10-20 22:28:28', '2024-10-20 22:28:28', 137, 'done', '', '', 11, ''),
(124, 1, 2, '2024-10-20 22:36:52', '2024-10-20 22:36:52', 138, 'done', '', '', 13, ''),
(125, 2, 2, '2024-10-20 22:36:58', '2024-10-20 22:36:58', 139, 'done', '', '', 12, ''),
(126, 1, 2, '2024-10-21 20:42:18', '2024-10-21 22:39:16', 140, 'done', 'pending', '', 11, ''),
(127, 1, 2, '2024-10-21 23:52:01', '2024-10-21 23:52:01', 141, 'done', '', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201446/repairshopp/uploads/swzxksvx5vwslqolzzdn.webp'),
(128, 1, 2, '2024-10-21 23:53:17', '2024-10-21 23:53:17', 142, 'done', '', '', NULL, ''),
(129, 1, 2, '2024-10-21 23:54:29', '2024-10-21 23:54:29', 143, 'done', '', '', 11, ''),
(130, 1, 2, '2024-10-22 00:28:00', '2024-10-22 00:28:00', 144, 'done', '', '', 13, ''),
(131, 1, 2, '2024-10-22 01:54:00', '2024-10-24 14:52:49', 145, 'done', 'pending', '', 11, ''),
(132, 1, 2, '2024-10-22 01:54:58', '2024-10-24 14:52:50', 146, 'done', 'pending', '', 16, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201447/repairshopp/uploads/wsdjig9zn85aa7tpvxxa.webp'),
(133, 1, 2, '2024-10-22 01:55:56', '2024-10-24 14:52:51', 147, 'done', 'pending', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201448/repairshopp/uploads/mjgrwnymvk4a3nv6tgyc.webp'),
(134, 2, 2, '2024-10-22 10:05:13', '2024-10-22 10:05:13', 148, 'done', '', '', 11, ''),
(135, 1, 2, '2024-10-23 23:59:34', '2024-10-23 23:59:34', 149, 'done', '', '', 12, ''),
(136, 1, 2, '2024-10-24 14:10:23', '2024-10-24 14:10:23', 150, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201449/repairshopp/uploads/iemput49ibtmoypflgu7.webp'),
(137, 1, 2, '2024-10-25 00:39:34', '2024-10-25 00:39:34', 151, 'done', '', '', 1, ''),
(138, 10, 2, '2024-10-27 20:55:42', '2024-10-27 20:55:42', 153, 'done', '', '', 1, ''),
(139, 1, 2, '2024-11-01 16:13:54', '2024-11-01 16:13:54', 154, 'done', '', '', 1, ''),
(140, 1, 2, '2024-11-01 16:22:35', '2024-11-01 16:22:35', 155, 'done', '', '', 11, ''),
(141, 1, 2, '2024-11-01 16:23:33', '2024-11-01 16:23:33', 156, 'done', '', '', 13, ''),
(142, 1, 2, '2024-11-01 16:32:55', '2024-11-01 16:32:55', 157, 'done', '', '', 12, ''),
(143, 1, 2, '2024-11-01 23:14:02', '2024-11-01 23:14:02', 158, 'done', '', '', 1, ''),
(144, 1, 2, '2024-11-01 23:14:37', '2024-11-01 23:14:37', 159, 'done', '', '', 12, ''),
(145, 23, 2, '2024-11-03 11:12:52', '2024-11-03 11:12:52', 160, 'done', '', '', 1, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201458/repairshopp/uploads/cdyphv3h2dshqvi3gane.webp'),
(146, 1, 2, '2024-11-03 14:14:30', '2024-11-03 14:14:30', 161, 'done', '', '', 11, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201459/repairshopp/uploads/xc9u1fr8zwhvody1q63n.webp'),
(147, 7, 38, '2024-11-03 19:03:09', '2024-11-03 19:03:09', 162, 'done', 'accepted', '', 1, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201490/repairshopp/uploads/khvrbdibkwyxs55dr94k.webp'),
(148, 1, 2, '2024-11-03 19:06:01', '2024-11-03 19:06:01', 163, 'done', 'accepted', '', 1, ''),
(149, 1, 2, '2024-11-03 20:41:19', '2024-11-03 20:41:19', 164, 'done', '', NULL, 14, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201492/repairshopp/uploads/n2prg90fqagdyccqtpvb.webp'),
(150, 1, 2, '2024-11-03 20:43:11', '2024-11-03 20:43:11', 165, 'done', '', NULL, 1, ''),
(151, 2, 2, '2024-11-10 11:55:36', '2024-11-10 11:55:36', 166, 'done', 'accepted', '', 13, ''),
(152, 1, 2, '2024-11-10 11:55:44', '2024-11-10 11:55:44', 167, 'done', 'accepted', '', 13, ''),
(153, 12, 2, '2024-11-11 00:04:46', '2024-11-11 00:04:46', 168, 'done', '', NULL, 11, ''),
(154, 8, 2, '2024-11-13 01:30:03', '2024-11-13 01:30:03', 169, 'done', 'accepted', '', 14, ''),
(155, 7, 2, '2024-11-13 01:33:37', '2024-11-13 01:33:37', 170, 'done', '', NULL, 13, ''),
(156, 1, 2, '2024-11-13 11:34:42', '2024-11-13 11:34:42', 171, 'done', 'accepted', '', 12, ''),
(157, 1, 2, '2024-11-13 11:35:12', '2024-11-13 11:35:12', 172, 'done', 'done', '', 14, ''),
(158, 7, 2, '2024-11-13 11:55:01', '2024-11-13 11:55:01', 173, 'done', 'done', '', 12, ''),
(159, 2, 2, '2024-11-13 15:50:34', '2024-11-16 23:41:18', 174, 'done', 'pending', 'qua xa', 14, ''),
(160, 8, 2, '2024-11-13 15:53:32', '2024-11-16 23:40:57', 175, 'done', 'accepted', 'khoang cach qua xa', 1, ''),
(161, 7, 2, '2024-11-13 15:54:59', '2024-11-13 15:54:59', 176, 'done', 'done', '', 11, ''),
(162, 11, 2, '2024-11-13 15:55:15', '2024-11-13 15:55:15', 177, 'done', 'accepted', '', 14, ''),
(163, 1, 2, '2024-11-13 23:45:42', '2024-11-13 23:45:42', 178, 'done', 'accepted', '', 11, ''),
(164, 13, 2, '2024-11-13 23:51:11', '2024-11-14 23:41:23', 179, 'done', 'fixing', '', 12, ''),
(165, 1, 2, '2024-11-16 13:41:09', '2024-11-16 13:41:09', 180, 'done', 'accepted', ' ', 11, ''),
(166, 13, 2, '2024-11-17 12:22:48', '2024-11-17 12:24:02', 182, 'done', 'pending', NULL, 13, ''),
(167, 14, 2, '2024-11-17 12:24:17', '2024-11-17 12:24:17', 183, 'done', '', NULL, 13, ''),
(168, 20, 2, '2024-11-17 12:24:42', '2024-11-17 12:24:42', 184, 'done', '', NULL, 11, ''),
(169, 20, 2, '2024-11-17 12:25:20', '2024-11-17 12:25:20', 185, 'done', 'accepted', NULL, 11, ''),
(170, 1, 2, '2024-11-17 21:27:29', '2024-11-17 21:27:29', 186, 'done', '', NULL, 12, ''),
(171, 2, 2, '2024-11-17 21:58:26', '2024-11-17 21:58:26', 187, 'done', 'accepted', '', 12, ''),
(172, 2, 2, '2024-11-17 22:00:15', '2024-11-18 00:10:22', 188, 'done', 'pending', NULL, 14, ''),
(173, 2, 2, '2024-11-17 22:01:20', '2024-11-18 00:34:46', 189, 'done', 'pending', NULL, 12, ''),
(174, 2, 2, '2024-11-17 22:02:43', '2024-11-18 00:31:36', 190, 'done', 'fixing', '', 13, ''),
(175, 7, 2, '2024-11-23 21:55:45', '2024-11-23 21:55:45', 191, 'done', '', NULL, 14, ''),
(176, 7, 2, '2024-11-23 21:58:21', '2024-11-23 21:58:21', 192, 'done', '', NULL, 13, ''),
(177, 7, 2, '2024-11-23 22:01:16', '2024-11-23 22:01:16', 193, 'done', '', NULL, 12, ''),
(178, 7, 2, '2024-11-23 22:01:39', '2024-11-23 22:01:39', 194, 'done', '', NULL, 14, ''),
(179, 7, 2, '2024-11-23 22:03:45', '2024-11-23 22:03:45', 195, 'done', '', NULL, 12, ''),
(180, 1, 2, '2024-11-24 00:55:07', '2024-11-24 00:55:07', 196, 'done', 'accepted', NULL, 1, ''),
(181, 1, 2, '2024-11-24 13:10:51', '2024-11-24 13:10:51', 197, 'done', 'accepted', NULL, 11, ''),
(182, 7, 2, '2024-11-24 15:56:17', '2024-11-24 15:56:17', 198, 'done', 'fixing', NULL, 11, ''),
(240, 11, 2, '2024-11-29 23:34:26', '2024-11-29 23:34:26', 256, 'done', 'accepted', '', 1, ''),
(241, 12, 2, '2024-11-30 23:03:10', '2024-11-30 23:03:10', 257, 'done', 'accepted', '', 13, ''),
(242, 1, 2, '2024-12-01 00:11:12', '2024-12-01 00:11:12', 258, 'accepted', 'accepted', '', 13, ''),
(243, 20, 2, '2024-12-01 11:47:57', '2024-12-01 11:47:57', 259, 'done', 'accepted', '', 11, ''),
(299, 7, 2, '2024-12-09 18:49:30', '2024-12-09 18:49:30', 315, 'pending', '', NULL, 13, ''),
(300, 7, 2, '2024-12-09 18:51:03', '2024-12-09 18:51:03', 316, 'pending', '', NULL, 12, ''),
(301, 7, 2, '2024-12-09 18:51:17', '2024-12-09 18:51:17', 317, 'accepted', 'accepted', '', 14, ''),
(302, 7, 2, '2024-12-09 18:52:39', '2024-12-09 18:52:39', 318, 'accepted', '', NULL, 1, ''),
(303, 7, 2, '2024-12-09 18:54:06', '2024-12-09 18:54:06', 319, 'accepted', 'accepted', '', 12, ''),
(304, 7, 2, '2024-12-09 18:58:03', '2024-12-09 18:58:03', 320, 'accepted', 'accepted', '', 1, ''),
(305, 41, 2, '2024-12-09 21:25:10', '2024-12-09 21:25:10', 321, 'accepted', 'accepted', '', 13, 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201566/repairshopp/uploads/fdzacqsozk778ql9unuj.webp'),
(309, 7, 2, '2024-12-14 23:52:56', '2024-12-14 23:52:56', 325, 'pending', '', NULL, 1, ''),
(310, 1, 2, '2024-12-15 00:05:29', '2024-12-15 00:05:29', 326, 'accepted', 'accepted', '', 16, ''),
(311, 1, 2, '2024-12-15 00:24:51', '2024-12-15 00:24:51', 327, 'pending', '', NULL, 1, ''),
(312, 1, 2, '2024-12-15 00:52:37', '2024-12-15 00:52:37', 328, 'pending', '', NULL, 12, ''),
(313, 1, 2, '2024-12-15 00:59:07', '2024-12-15 00:59:07', 329, 'pending', '', NULL, 13, ''),
(314, 1, 2, '2024-12-15 01:21:19', '2024-12-15 01:21:19', 330, 'done', 'accepted', '', 11, ''),
(315, 1, 2, '2024-12-15 01:40:20', '2024-12-15 01:40:20', 331, 'done', '', NULL, 12, ''),
(316, 1, 2, '2024-12-15 01:59:28', '2024-12-15 01:59:28', 332, 'done', '', NULL, 13, ''),
(321, 1, 2, '2024-12-15 11:48:24', '2024-12-15 11:48:24', 337, 'fixing', 'accepted', '', 11, ''),
(322, 1, 2, '2024-12-15 11:48:44', '2024-12-15 11:48:44', 338, 'accepted', 'accepted', '', 1, ''),
(323, 1, 2, '2024-12-15 11:49:03', '2024-12-15 11:49:03', 339, 'accepted', 'accepted', '', 11, ''),
(324, 1, 2, '2024-12-15 17:02:54', '2024-12-15 17:02:54', 340, 'done', 'accepted', '', 12, ''),
(325, 1, 2, '2024-12-15 17:04:30', '2024-12-15 17:04:30', 341, 'accepted', 'accepted', '', 16, ''),
(326, 1, 2, '2024-12-15 17:10:01', '2024-12-15 17:10:01', 342, 'done', 'accepted', '', 11, ''),
(327, 1, 2, '2024-12-15 17:20:04', '2024-12-15 17:20:04', 343, 'fixing', 'accepted', '', 1, ''),
(328, 20, 2, '2024-12-17 14:31:23', '2024-12-17 14:31:23', 344, 'pending', '', NULL, NULL, ''),
(329, 20, 2, '2024-12-17 14:35:29', '2024-12-17 14:35:29', 345, 'pending', '', NULL, NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `bookings_items`
--

CREATE TABLE `bookings_items` (
  `id` int(11) NOT NULL,
  `booking_id` int(30) NOT NULL,
  `item_id` int(30) NOT NULL,
  `price` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings_items`
--

INSERT INTO `bookings_items` (`id`, `booking_id`, `item_id`, `price`, `count`) VALUES
(1, 79, 1, 115000, 1),
(2, 79, 3, 550000, 1),
(3, 105, 1, 115000, 1),
(4, 105, 2, 129000, 1),
(5, 105, 3, 550000, 1),
(6, 174, 1, 115000, 1),
(7, 174, 2, 129000, 1),
(8, 174, 8, 120000, 1),
(9, 179, 4, 420000, 1),
(10, 179, 5, 420000, 1),
(11, 179, 7, 820000, 1),
(12, 180, 1, 115000, 4),
(13, 180, 8, 120000, 1),
(14, 181, 1, 115000, 1),
(15, 181, 8, 120000, 1),
(16, 182, 5, 420000, 1),
(21, 241, 9, 220000, 1),
(22, 242, 1, 115000, 1),
(23, 243, 1, 115000, 1),
(24, 243, 2, 129000, 3),
(25, 243, 5, 420000, 1),
(54, 299, 4, 420000, 1),
(55, 300, 4, 420000, 1),
(56, 301, 4, 420000, 1),
(57, 302, 4, 420000, 1),
(58, 303, 4, 420000, 1),
(75, 304, 4, 420000, 3),
(99, 304, 2, 129000, 1),
(100, 304, 3, 550000, 1),
(101, 304, 1, 120000, 1),
(103, 309, 4, 420000, 2),
(104, 310, 1, 120000, 1),
(106, 311, 1, 120000, 2),
(115, 312, 1, 120000, 2),
(117, 313, 1, 120000, 2),
(119, 315, 1, 120000, 1),
(120, 316, 2, 129000, 1),
(121, 316, 1, 120000, 2),
(128, 321, 1, 130000, 1),
(129, 321, 2, 129000, 1),
(131, 322, 1, 130000, 1),
(132, 322, 2, 129000, 1),
(134, 323, 1, 130000, 1),
(135, 323, 2, 129000, 1),
(137, 324, 1, 130000, 2),
(140, 325, 1, 130000, 2),
(143, 326, 1, 130000, 1),
(144, 327, 1, 130000, 1),
(145, 327, 8, 120000, 1),
(149, 328, 3, 550000, 1),
(150, 328, 8, 120000, 1),
(152, 329, 3, 550000, 1),
(153, 329, 8, 120000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bookings_items_temp`
--

CREATE TABLE `bookings_items_temp` (
  `id` int(11) NOT NULL,
  `booking_id` int(30) DEFAULT NULL,
  `item_id` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings_items_temp`
--

INSERT INTO `bookings_items_temp` (`id`, `booking_id`, `item_id`) VALUES
(1, 79, 1),
(2, 105, 1),
(3, 105, 2),
(4, 105, 3),
(5, 79, 3),
(6, 79, 1),
(7, 174, 8),
(8, 174, 2),
(9, 174, 1),
(10, 179, 4),
(11, 179, 5),
(12, 179, 7),
(13, 180, 1),
(14, 180, 8),
(15, 180, 1),
(16, 180, 1),
(17, 180, 1),
(18, 181, 8),
(19, 181, 1),
(20, 186, 1),
(21, 186, 1),
(22, 236, 1),
(23, 236, 8),
(24, 239, 1),
(25, 182, 5),
(26, 241, 9),
(27, 242, 1),
(28, 243, 5),
(29, 243, 1),
(30, 243, 2),
(31, 243, 2),
(32, 243, 2),
(33, 250, 1),
(34, 256, 4),
(35, 256, 5),
(36, 257, 4),
(37, 257, 5),
(38, 258, 4),
(39, 258, 5),
(40, 259, 4),
(41, 259, 5),
(52, 278, 4),
(53, 278, 5),
(54, 279, 1),
(55, 279, 2),
(56, 280, 1),
(57, 280, 2),
(58, 281, 1),
(59, 281, 2),
(60, 282, 1),
(61, 282, 2),
(62, 283, 1),
(63, 283, 2),
(64, 286, 1),
(65, 290, 1),
(66, 296, 1),
(67, 296, 2),
(68, 297, 1),
(69, 297, 2),
(70, 298, 1),
(71, 299, 4),
(72, 300, 4),
(73, 301, 4),
(74, 302, 4),
(75, 303, 4),
(76, 304, 4);

-- --------------------------------------------------------

--
-- Table structure for table `goong_map_addresses`
--

CREATE TABLE `goong_map_addresses` (
  `id` int(11) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `place_id` varchar(255) NOT NULL,
  `address_name` mediumtext NOT NULL,
  `full_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `goong_map_addresses`
--

INSERT INTO `goong_map_addresses` (`id`, `latitude`, `longitude`, `place_id`, `address_name`, `full_address`) VALUES
(1, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(29, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(30, 1, 1, '1', 'tan thoi nhat 17', ''),
(31, 1, 1, '27391', 'tan thoi nhat 17', ''),
(32, 1, 1, '1', 'tan thoi nhat 17', ''),
(33, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(35, NULL, NULL, '1', 'hai thuong lan ong', ''),
(36, NULL, NULL, '1', 'hai thuong lan ong', ''),
(37, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(38, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(39, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(40, NULL, NULL, '1', 'hai thuong lan ong', ''),
(41, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(42, NULL, NULL, '1', 'hai thuong lan ong', ''),
(43, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(44, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(45, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(46, NULL, NULL, '1', 'hai thuong lan ong', ''),
(47, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(48, NULL, NULL, '8740', 'sdfsdf', ''),
(50, NULL, NULL, '6034', 'sdf', ''),
(51, NULL, NULL, '6034', 'sdf', ''),
(52, NULL, NULL, '6034', 'sdf', ''),
(53, NULL, NULL, '6034', 'sdf', ''),
(54, NULL, NULL, '6034', 'sdf', ''),
(55, NULL, NULL, '6034', 'sdf', ''),
(56, NULL, NULL, '6034', 'sdf', ''),
(57, NULL, NULL, '6034', 'sdf', ''),
(58, NULL, NULL, '6034', 'sdf', ''),
(59, NULL, NULL, '4876', 'sdf', ''),
(60, NULL, NULL, '8740', 'sdf', ''),
(61, 10.737114889000054, 106.61470337700007, 'gLe2lo7B73ZvwEs3YHaGhbVkXEN4waOGUUpbBaA9pq89hqlM5qneW_GK3cgm6d6TverRpAEtPoIFntbMmT2Wo5mHAIUG3tIqJYqZQRIbEP4ZjnENKsBAQhmG0SzuGEf3G', 'UBND Quận Bình Tân', '521 Kinh Dương Vương, An Lạc, Bình Tân, Hồ Chí Minh'),
(62, NULL, NULL, '6904', 'sdfsdf', ''),
(63, 10.7949989, 106.7218697, 'r_mrmWt8nAxlqlNcsESB8Em1bhinVKvyT4N7H7NqlZZngXY8f1TLgnrOBdlpLar_7c7hUF65QkbV77mItqZGrc2mBYRazgOb4fblPW5lpmfB8g1wPIA-JmX6rVK8kDuLZ', 'Landmark 81', 'Đường Nguyễn Hữu Cảnh, Vinhomes Central Park, Phường 22, Bình Thạnh, Hồ Chí Minh'),
(64, NULL, NULL, '6979', ' sdf', ''),
(65, NULL, NULL, '9223', 'sdasdfasdf', ''),
(66, NULL, NULL, '9223', 'sdasdfasdf', ''),
(67, NULL, NULL, '12409', 'duong truong chinh', ''),
(68, NULL, NULL, '5515', 'dfsdf', ''),
(69, NULL, NULL, '6940', 'tan thohi nhat 17', ''),
(70, NULL, NULL, '7570', 'sdf', ''),
(71, NULL, NULL, '5632', ' đường Hồng Lạc', ''),
(72, NULL, NULL, '7414', 'thạch thất', ''),
(73, NULL, NULL, '1', 'tan thoi nhat 17', ''),
(74, NULL, NULL, '9202', 'xin chao', ''),
(75, NULL, NULL, '8026', 'sdfsdf', ''),
(76, 10.822608284821372, 106.62383478787928, '1', 'tan thoi nhat 17', ''),
(77, NULL, NULL, '5578', '12:13', ''),
(78, 10.822608284821372, 106.62383478787928, '9346', 'da co dia chi', ''),
(79, 27.547917447246544, 87.8050633424473, '7345', 'sdfsdf', ''),
(80, 10.822255403623851, 106.62223663138079, '26791', 'cơ điện lạnh phong', ''),
(81, 10.822608284821372, 106.62383478787928, '7933', 'asfsdf', ''),
(82, 10.822608284821372, 106.62383478787928, '8710', 'sdfsdf', ''),
(83, 10.823363553890726, 106.62334592680881, '7285', 'asdasd', ''),
(84, 10.822608284821372, 106.62383478787928, '7342', 'sdf', ''),
(85, 10.822608284821372, 106.62383478787928, '9196', 'sdfsdf', ''),
(86, 10.822787430849328, 106.62367407429501, '26791', 'TTN', ''),
(87, 10.822608284821372, 106.62383478787928, '9202', 'sdf', ''),
(88, 10.822608284821372, 106.62383478787928, '26791', 'tan thoi nhat', 'sdfsdfsdf'),
(89, 10.823967684354685, 106.6217319360151, '26785', 'pvh', ''),
(90, 10.828622819133345, 106.61866964905384, '11953', 'safd', ''),
(91, 10.835165950460757, 106.62454027128979, '6715', 'sdf', ''),
(92, 10.840568257760237, 106.62998832192403, '3445', 'asdfsdf', ''),
(93, 10.82399231249756, 106.64276230623456, '9199', 'sdf', ''),
(94, 10.838589414955461, 106.62598275529342, '8839', 'sdf', ''),
(95, 10.822608284821372, 106.62383478787928, '8026', 'sdfsdf', ''),
(96, 10.822608284821372, 106.62383478787928, '1351', 'sdfsdf', ''),
(97, 10.822608284821372, 106.62383478787928, '9811', 'asdfsdf', ''),
(98, 10.822608284821372, 106.62383478787928, '6766', 'sdfsdf', ''),
(99, 10.823240564441539, 106.62300866750736, '7948', 'sdf', ''),
(100, 10.822608284821372, 106.62383478787928, '9286', 'sdf', ''),
(101, 10.822608284821372, 106.62383478787928, '8737', 'sdf', ''),
(102, 10.822608284821372, 106.62383478787928, '8740', 'sdf', ''),
(103, 10.822608284821372, 106.62383478787928, '8209', 'sdfsdf', ''),
(104, 10.822608284821372, 106.62383478787928, '8038', 'sdfsdf', ''),
(105, 10.82393899054284, 106.62394047088397, '26791', '1/1 ttn', ''),
(106, 10.822608284821372, 106.62383478787928, '9304', 'sdf', ''),
(107, 10.822608284821372, 106.62383478787928, '8029', 'sdf', ''),
(108, 10.822608284821372, 106.62383478787928, '751', 'sdf', ''),
(109, 10.822608284821372, 106.62383478787928, '10588', 'sdf', ''),
(110, 10.822608284821372, 106.62383478787928, '8995', 'sdfsdf', ''),
(111, 10.823875762787994, 106.62391901321598, '26791', 'tan thoi nhat', ''),
(112, 10.827305076033086, 106.62496660992497, '26791', 'ttn17', ''),
(113, 10.82488740526218, 106.62467775032744, '26791', 'ttn', ''),
(118, 10.83030972407638, 106.61831156002576, '778', '1/2 C2 đường Trường Chinh', 'Tân Thới Nhất, quận 12, TP. Hồ Chí Minh'),
(120, 10.822608284821372, 106.62383478787928, '0', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(121, 10.822608284821372, 106.62383478787928, 'sdfasefq3aw', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(122, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(123, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(124, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(125, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(126, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(127, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(128, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(129, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(130, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(131, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(132, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(133, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(134, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(135, 10.83030972407638, 106.61831156002576, 'sdfsdfsdf', 'Nhà', 'truong tieu hoc truong dinh quan 12'),
(136, 10.822787797000046, 106.62388036500005, 'sdfsdfsdf', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(137, 10.822787797000046, 106.62388036500005, 'IXfve4KUf2NmuJAWpne2VUirRh6oDpjnTrl3J6l4lNxkpE0Drw-Y3k_KePjWzfrmYadxNG6tJgP5PgmBdqLR65kl6dzeulKrAfKpOWrhomPGXmF0Org59mIiqVSWYD-PY', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(138, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(139, 10.823608284821587, 106.62383478787152, '26791', '7/55 đường Tân Thới Nhất 17', 'phường Tân Thới Nhất, quận 12, tp Hồ Chí Minh\\'),
(140, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(141, 10.83030972407638, 106.61831156002576, 'mkecsZWKT1d-uqg92nhh5mSqsC6WdaDee9xPBax5lvpzqG0cn7a3mngMYVutuIrKSrlTJqxo4d9_3GZcI3t4mUyrMJ0bmnuefrpMWJpqmvN_gF8MfAyKmqyoMkid9DeFX', 'UBND xã Tống Phan', 'Tống Phan, Phù Cừ, Hưng Yên'),
(142, NULL, 106.61831156002576, '0ECofVTgbrt-l1w2sw2Ze36lQCysnpGjSINqP5l4VX_E3JZaT2aYTn-rmj-uD7_beLi1H7Nqgt9IN7orn0SV_yCDXGewD6PnBblPW5lpmfB8g1wPrLw-JmX6rqyRUDuLZ', 'UBND xã Lệ Chi', 'Lệ Chi, Gia Lâm, Hà Nội'),
(143, 20.730780409000033, 106.19633205100007, 'mkecsZWKT1d-uqg92nhh5mSqsC6WdaDee9xPBax5lvpzqG0cn7a3mngMYVutuIrKSrlTJqxo4d9_3GZcI3t4mUyrMJ0bmnuefrpMWJpqmvN_gF8MfAyKmqyoMkid9DeFX', 'UBND xã Tống Phan', 'Tống Phan, Phù Cừ, Hưng Yên'),
(144, 10.78112042600003, 106.69945801700004, 'upKpaWrDZJpkuiNXq1G8ymeAHl6qabjSeoJfKJ9XnuMR_3E8Dnw6zmpXcPVyrqEt4hoBAXGro6ZxzpmoaV3W26X18myVhe5KUkn5MWJpq7fN_gF8MrAyKmn2oVyeaDeHa', 'Công ty cổ phần dịch vụ bưu chính viễn thông Sài Gòn', '41-43-45 Lê Duẩn, Bến Nghé, Quận 1, Hồ Chí Minh'),
(145, 10.836384708954489, 106.63567582461313, 'jkaSy22Eds9uzy0mu2lp0VqnVgS4l2mOaqdFTr5Cm4mEhV1JtWp1jpuqbAW2R7WDbKpFTbpog9JdqEIPix2uibWRfEprQfnAb6tdSYt7i-JukU4dvR2bMrm5Rots7HPA2', 'Nhà Sách Phan Huy Ích', 'TTN 20, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(146, 10.8772984, 106.6488994, 'vI_PtcIcqvB2hHdPjEKTRlux9z-8R6VSXalWSLhrl4ltlXwubUAyiYzNbIBuQTngWrpCMo5GlLl1uCUUimunvW75Xk61aJXbb6tdSYt7i-JukU4d7vWmDm2y5RjaLHYvL', 'Siêu Thị Điện Máy Thiên Hòa', 'Trường Chinh, Tân Thới An, Quận 12, Hồ Chí Minh'),
(147, 10.8312523, 106.618953, 'MkN1S6DgP5VvnBGduHFlcEPXkUug1LQGUeIsnYppPgqxz1lBI2n28ynWIUTSvWZ7IRY1RdKJ9mvC-W0VDomCO7NSMBESUcIrSdrJQV5JikvsriHdfpASCkgSgL1-SBenS', '121 Đường Tân Thới Nhất 12', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(148, 10.8253967, 106.626499, 'QYTDSYRSUmbwpX8jgU2ISU3AYQCCdKhj1KpRKa1Np3nCtlJGrRO-Y4uKUSmvZfiI-ppdG650mGCAt0lHrV8mUVYabZkeDUqFg7aSMRoR0hGaEnj1hthKUY8S2EjmyE_9i', 'Dê tươi Cháo lòng Nẫu tiến 3', '1/1K Tổ 51 KP 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(149, 10.75057864200005, 106.65861910300004, 'ezd1rW-TBbjJinlUpF_pkHKdQgi6YezUQ41OE6MEn9N3ol2_m2KTonRVRtUqbL1ecY34-lAGn2ihoWVhRdFiTlKChVla6Wp_Xd7NFUZOcY_p2iVYFcaWDk3ShXi6TBOjT', 'Shop Hiếu Thông', '159 Hải Thượng Lãn Ông, Phường 13, Quận 5, Hồ Chí Minh'),
(150, 10.8396784, 106.6203374, 'X5rWvqx9nUNvnEsRuHGR1EPXZT-gBrTgeHSLJ6BPgtorS2JzlX28ylC-ZQ2gcJ7IRY00UaJZmvBF1FsyomCO7EOMQwSUUcIrSdrJEUJJikvt3iFcEpASCknWgXy-SBenS', 'Hòa Phát Hotel', 'Tân Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh'),
(151, 10.82213611000003, 106.62249804900006, 'T1JseJsAk317v2Q4teOTcGGvSpeZK5B8ftlK26n_pQl2rWgZmrOys3mdWhG0z49tdbxWI6na5H562WNZmJyfrUmuNR5-tI9ve79JXZ_2nwJkmhVp6qZ-PCAmtUiKf3-R9', 'Quán Cafe Thuần Việt', 'Tân Thới Nhất 21, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(152, 10.8772984, 106.6488994, 'oqquPSo9GvHBt1mxUl1mI7HKxSSSnQL7UXLJNU6NwjJJ2dmc1jlubknWXdyKnWq77QaEpWZWYj11uoykPXZHi2XWOplVFc5TAdLBGUpBgkPl1ilUGpgaAkHeiXS2QB-vQ', 'Siêu Thị Điện Máy Thiên Hòa', 'Trường Chinh, Tân Thới An, Quận 12, Hồ Chí Minh'),
(153, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(154, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(155, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(156, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(157, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(158, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(159, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(160, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(161, 10.827780171000029, 106.61860144400003, 'Rs-mkK53iWt0j38WlmLqk26gQVGjYbLXdo9VP7p_rLxA6WsflU2ymG2hXST67YO_ieaBnKqJaouN3j5g0uW--Nm6wdg6tYo-QlLB0Ul1gkPlyipAGKXWAkAaiXVUtB-vQ', 'Chi nhánh HCM - Công ty Cổ phần Công nghệ và Đầu tư Bảo Sơn', '9/9 Phan Văn Hớn, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(162, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(163, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(164, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(165, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(166, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(167, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(168, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(169, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(170, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(171, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(172, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(173, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(174, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(175, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(176, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(177, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(178, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(179, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(180, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(181, 10.848020315000042, 106.78667749600004, 'W4aRfK-qr0RJuWUWe5-C0WeqPzdqaLede4BMBqxpVJpJhpElsmZisEil7gecDIGaft5uI6t4mZtwu1wgtWue3WfLcdn_mebycILlPHZlpmfB9g1wPrw-JmX6rVCSZDuLZ', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(182, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(183, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(184, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(185, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(186, 10.8313042, 106.6192997, 'rONPvJ2Cx6J_nXk6hF9ksIWaRyaDSWKCfKFlMKgXmoZ_rl8EHtH249ny-cSSzYLvKZb55DINtp65TxFsNO06em2CKLL8EFKCdZtJUQIJygutnmEcUYLSSgmWwTz8UFfnC', '11/12A Đường Tân Thới Nhất 12', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(187, 10.83039, 106.6184172, 'hjBznjQmSO5h_p1-Fq18U3Ua2pIpTWxaURqWhmpd1M-lGiW2spF8I01uJQIygAAB0ZZphlpP-DVpAibqrpFoXlHBbp5a8d1TlcrZAlpZmcP8AjFNzoAArlnGkW-2WAS_W', 'Prosper Plaza Apartment', '14 Phan Văn Hớn, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(188, 10.83039, 106.6184172, 'hjBznjQmSO5h_p1-Fq18U3Ua2pIpTWxaURqWhmpd1M-lGiW2spF8I01uJQIygAAB0ZZphlpP-DVpAibqrpFoXlHBbp5a8d1TlcrZAlpZmcP8AjFNzoAArlnGkW-2WAS_W', 'Prosper Plaza Apartment', '14 Phan Văn Hớn, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(189, 10.8303771, 106.6185022, 'gVzzPPpUgFxQvUods2a7Y1Ce3jSefbdwUMV-D4luo_t8vWIEh2mjwWTHYUaxT2f_v8VgR7KtfNx8epkBsYmKdmuhyjiBV42CDZaFxQ4FEgehkmxc4t0yzgWazFheRTIHB', 'Ăn vặt nhà Nấm', 'Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh'),
(190, 10.830612320000057, 106.61866835700005, 'x61oQtBuj21ggVpMiHL0vW-9fE59bZeIGqN8DaZvj_0Yl1lJimWjyn7wJROk3aK7PbMoyD7mHg2aNrH8vv3Kf8RrKUgy9a_zWf69ZTY9qj5AZlUoZuWjmnxi9NkKPafTP', 'Block C', 'Căn hộ Prosper Plaza, Phan Văn Hớn, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(191, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(192, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(193, 10.8303771, 106.6185022, 'gVzzPPpUgFxQvUods2a7Y1Ce3jSefbdwUMV-D4luo_t8vWIEh2mjwWTHYUaxT2f_v8VgR7KtfNx8epkBsYmKdmuhyjiBV42CDZaFxQ4FEgehkmxc4t0yzgWazFheRTIHB', 'Ăn vặt nhà Nấm', 'Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh'),
(194, 10.8303771, 106.6185022, 'gVzzPPpUgFxQvUods2a7Y1Ce3jSefbdwUMV-D4luo_t8vWIEh2mjwWTHYUaxT2f_v8VgR7KtfNx8epkBsYmKdmuhyjiBV42CDZaFxQ4FEgehkmxc4t0yzgWazFheRTIHB', 'Ăn vặt nhà Nấm', 'Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh'),
(195, 10.830612320000057, 106.61866835700005, 'x61oQtBuj21ggVpMiHL0vW-9fE59bZeIGqN8DaZvj_0Yl1lJimWjyn7wJROk3aK7PbMoyD7mHg2aNrH8vv3Kf8RrKUgy9a_zWf69ZTY9qj5AZlUoZuWjmnxi9NkKPafTP', 'Block C', 'Căn hộ Prosper Plaza, Phan Văn Hớn, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(196, 10.824334760000056, 106.62343279700008, 'WXamp6eYBil5s0ZUo2G-7m2hWQy5cJyScol_UrlvnNJ31UU1ogaqS4kGjdlEHBe6TvEl3ujBZkJOgozcdXVyI-HnXoxN_B-rYdLBGUpCPYPl1ilUGppCAkHeiXXKQLevQ', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(197, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(198, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(199, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(200, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(201, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(202, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(203, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(204, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(205, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(206, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(207, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(208, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(209, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(210, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(211, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(212, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(213, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(214, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(215, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(216, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(217, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(218, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(219, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(220, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(221, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(222, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(223, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(224, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(225, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(226, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(227, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(228, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(229, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(230, 10.822608284821372, 106.62383478787928, 'sdfasefq3awgvrfwzsrf', 'tan thoi nhat 17', 'sdfsdfasdfasdfsdf'),
(231, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(232, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(233, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(234, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(235, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(236, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(237, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(238, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(239, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(240, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(241, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(242, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(243, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(244, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(245, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(246, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(247, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(248, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(249, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(250, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(251, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(252, 10.822787797000046, 106.62388036500005, 'YKi_j3uxi1Z9o10NvWyt_FOweAWzFYP0VU6iPLJjj8d_bFYYrxSDxVS0nC7FZSWDcscUAKJSm-VUmbBGs2E6_VKxbI-1FbCzbZ6NVQYNzg-pmmUYVtRWTg2SxTj5hg_jD', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(253, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(254, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(255, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(256, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(257, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(258, 10.8772984, 106.6488994, 'oqquPSo9GvHBt1mxUl1mI7HKxSSSnQL7UXLJNU6NwjJJ2dmc1jlubknWXdyKnWq77QaEpWZWYj11uoykPXZHi2XWOplVFc5TAdLBGUpBgkPl1ilUGpgaAkHeiXS2QB-vQ', 'Siêu Thị Điện Máy Thiên Hòa', 'Trường Chinh, Tân Thới An, Quận 12, Hồ Chí Minh'),
(259, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(260, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(261, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(262, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(263, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(264, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(265, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(266, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(267, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(268, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(269, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(270, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(271, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(272, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(273, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(274, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(275, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(276, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(277, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(278, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(279, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(280, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(281, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(282, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(283, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(284, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(285, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(286, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(287, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(288, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(289, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(290, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(291, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(292, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(293, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(294, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(295, 1, 1, '1', '1', '1'),
(296, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(297, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(298, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(299, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(300, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(301, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(302, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(303, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(304, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(305, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(306, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(307, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(308, 10.848020315000042, 106.78667749600004, 'LZK4j8-9vXBbRm0EjXiQMqundcO4eqUlaXeDFL57ol5blIg3oHSD_Fq3VhWOH7pOIbMx8MYxqi7liqU4yqnmJvXXOZA_0a66Ob6tdSWmLi-JukU4dex2bi2y5RjaLHPDL', 'Học viện Công nghệ Bưu chính Viễn thông Cơ Sở Tại TP. Hồ Chí Minh', '97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh'),
(309, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(310, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(311, 10.8292885, 106.6143944, 'qtHe66EyT97jkEUBng1_VYTchjeme3m0qkF6HplBeZaqqWojsmp-nKi5PhlmeHiaiIBNNahpfiGiqVGannl8LLWrTVuyVXzQmLhOWphoffGIgl0Org5_mOOqVSW5D5KjY', 'Công ty CP Công Nghệ Chiến Thắng (TWIN JSC)', 'Đường Số 8, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(312, 19.814857782440992, 105.7815183946847, '_M-uaK7FYYRupFFDtXap-Xq2ThtKZ4tlZZ60RWiFi3hgwj5SrRCH3W7BIgWwEvmPprdOJ7BOYISHtCAKtEufBq27vaASxEP3AY6dRRYd3h-5inUIRsRFhh5e1SjqHEGDH', 'Trường Thi', 'Thanh Hóa, Thanh Hóa'),
(313, 10.824404394915037, 106.62353488085199, 'd2LUcKCVH4Jssl8qrGLh2myuVwSiBILwQIxbVpVjsMsrs19DogeScBexW7O51RRiRLJEkpNw6eFuX6IQpAeg5W9XXyalvrz7dFhEUJKympJ2UiFcEpAT7knWgXy-SBenS', 'TTN 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(314, 10.798444315063554, 106.64279811856788, '-kwUIdiCn4dlsisXiXJjtH2xXBr1TG6CVo6ZJbMvx4JhmUgYDqnFn3J2jRD2qc1ezY5tyMP2tu7J8fnY4scaGyGeyVA63XIHGZaFXQ4Fxgehkm0QXtxeRgWazTDyBFvrB', 'UBND Quận Tân Bình', '387A Trường Chinh, Phường 14, Tân Bình, Hồ Chí Minh'),
(315, 10.824334760000056, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(316, 10.824334760000056, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(317, 10.824334760000056, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(318, 10.824334760000037, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(319, 10.824334760000054, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(320, 10.824334760000056, 106.62343279700008, 'sGRLToE7FUdroVRGsXOs_H-zSx6rYo6AYJttQKt9jsBlx1cnqBS48FOxT0O1F_ywZbJbIoEVgrVksSVLsaMP6mvFbQG0mvjKZqKEKQIJyglRnmOsUtBSSgq5lT2CCP_nC', 'A1 Tân Thới Nhất 17', 'Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(321, 10.82278779700006, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh');
INSERT INTO `goong_map_addresses` (`id`, `latitude`, `longitude`, `place_id`, `address_name`, `full_address`) VALUES
(322, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(323, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(324, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(325, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(326, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(327, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(328, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(329, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(330, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(331, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(332, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(337, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(338, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(339, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(340, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(341, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(342, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(343, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(344, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh'),
(345, 10.822787797000046, 106.62388036500005, 'YSi_PKLvXEdvo50fsX5P7pmvahehB5FB5rB-LqBxndVtrUS9pgaR10bXNwq6YLCRQNTVEEqJyiXNGi2lUofewc0Cjfj6nd53JfrFHU5F1kfh0i1QHpweBkXajXCyRBurR', 'Trường Tiểu học Trương Định', 'Đường C2, Khu phố 4, Tân Thới Nhất, Quận 12, Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Table structure for table `inputs`
--

CREATE TABLE `inputs` (
  `id` int(11) NOT NULL,
  `date_input` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inputs`
--

INSERT INTO `inputs` (`id`, `date_input`) VALUES
(1, '2024-12-15 03:58:33'),
(5, '2024-12-15 05:15:56'),
(6, '2024-12-15 05:17:04');

-- --------------------------------------------------------

--
-- Table structure for table `input_info`
--

CREATE TABLE `input_info` (
  `id` int(11) NOT NULL,
  `input_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `input_price` int(11) NOT NULL,
  `output_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `input_info`
--

INSERT INTO `input_info` (`id`, `input_id`, `item_id`, `count`, `input_price`, `output_price`) VALUES
(2, 1, 1, 100, 115000, 130000),
(3, 1, 2, 100, 100000, 129000),
(4, 1, 3, 100, 500000, 550000),
(5, 1, 4, 100, 400000, 420000),
(6, 1, 5, 100, 400000, 420000),
(7, 1, 6, 100, 600000, 700000),
(8, 1, 7, 100, 800000, 820000),
(9, 1, 1, 5, 100000, 120000),
(10, 1, 8, 100, 100000, 120000),
(11, 1, 9, 100, 200000, 220000),
(12, 1, 10, 100, 150000, 200000),
(15, 5, 10, 5, 150000, 200000),
(16, 6, 10, 5, 150000, 200000),
(17, 6, 2, 5, 100000, 129000);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `invoice_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` int(11) NOT NULL,
  `final_price` int(11) NOT NULL,
  `invoice_file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `booking_id`, `invoice_date`, `total_price`, `final_price`, `invoice_file`) VALUES
(17, 240, '2024-11-29 16:34:26', 100000, 100000, 'invoice_240_2024-11-30.pdf'),
(18, 241, '2024-11-30 16:03:10', 370000, 370000, 'invoice_241_2024-11-30.pdf'),
(19, 242, '2024-11-30 17:11:12', 615000, 615000, ''),
(21, 80, '2024-08-03 18:12:53', 500000, 500000, ''),
(22, 81, '2024-08-03 18:13:09', 500000, 500000, ''),
(23, 82, '2024-08-03 18:13:19', 500000, 500000, ''),
(24, 83, '2024-08-03 18:16:47', 500000, 500000, ''),
(25, 84, '2024-08-03 18:16:58', 500000, 500000, ''),
(26, 85, '2024-08-03 18:17:08', 500000, 500000, ''),
(27, 89, '2024-08-04 03:48:26', 500000, 500000, ''),
(28, 105, '2024-10-07 15:32:12', 1294000, 1294000, ''),
(29, 106, '2024-10-19 08:06:41', 500000, 500000, ''),
(30, 107, '2024-10-19 08:07:47', 500000, 500000, ''),
(31, 108, '2024-10-19 08:08:39', 500000, 500000, ''),
(32, 109, '2024-10-19 15:18:05', 500000, 500000, ''),
(33, 110, '2024-10-19 15:18:47', 500000, 500000, ''),
(34, 111, '2024-10-19 15:19:16', 500000, 500000, ''),
(35, 112, '2024-10-19 15:27:03', 500000, 500000, ''),
(36, 113, '2024-10-19 15:27:06', 500000, 500000, ''),
(37, 114, '2024-10-19 15:53:45', 500000, 500000, ''),
(38, 115, '2024-10-20 05:12:57', 500000, 500000, ''),
(39, 116, '2024-10-20 05:21:48', 500000, 500000, ''),
(43, 120, '2024-10-20 08:33:33', 500000, 500000, ''),
(44, 121, '2024-10-20 15:26:19', 500000, 500000, ''),
(45, 122, '2024-10-20 15:27:29', 500000, 500000, ''),
(46, 123, '2024-10-20 15:28:28', 500000, 500000, ''),
(47, 124, '2024-10-20 15:36:52', 500000, 500000, ''),
(48, 125, '2024-10-20 15:36:58', 500000, 500000, ''),
(49, 126, '2024-10-21 13:42:18', 500000, 500000, ''),
(50, 127, '2024-10-21 16:52:01', 500000, 500000, ''),
(51, 128, '2024-10-21 16:53:17', 500000, 500000, ''),
(52, 129, '2024-10-21 16:54:29', 500000, 500000, ''),
(53, 130, '2024-10-21 17:28:00', 500000, 500000, ''),
(54, 131, '2024-10-21 18:54:00', 500000, 500000, ''),
(55, 132, '2024-10-21 18:54:58', 500000, 500000, ''),
(56, 133, '2024-10-21 18:55:56', 500000, 500000, ''),
(57, 134, '2024-10-22 03:05:13', 500000, 500000, ''),
(58, 135, '2024-10-23 16:59:34', 500000, 500000, ''),
(59, 136, '2024-10-24 07:10:23', 500000, 500000, ''),
(60, 137, '2024-10-24 17:39:34', 500000, 500000, ''),
(61, 138, '2024-10-27 13:55:42', 200000, 200000, ''),
(62, 139, '2024-11-01 09:13:54', 500000, 500000, ''),
(63, 140, '2024-11-01 09:22:35', 500000, 500000, ''),
(64, 141, '2024-11-01 09:23:33', 500000, 500000, ''),
(65, 142, '2024-11-01 09:32:55', 500000, 500000, ''),
(66, 143, '2024-11-01 16:14:02', 500000, 500000, ''),
(67, 144, '2024-11-01 16:14:37', 500000, 500000, ''),
(68, 145, '2024-11-03 04:12:52', 110000, 110000, ''),
(69, 146, '2024-11-03 07:14:30', 500000, 500000, ''),
(70, 147, '2024-11-03 12:03:09', 80000, 80000, ''),
(71, 148, '2024-11-03 12:06:01', 500000, 500000, ''),
(72, 149, '2024-11-03 13:41:19', 500000, 500000, ''),
(73, 150, '2024-11-03 13:43:11', 500000, 500000, ''),
(74, 151, '2024-11-10 04:55:36', 500000, 500000, ''),
(75, 152, '2024-11-10 04:55:44', 500000, 500000, ''),
(76, 153, '2024-11-10 17:04:46', 150000, 150000, ''),
(77, 154, '2024-11-12 18:30:03', 100000, 100000, ''),
(78, 155, '2024-11-12 18:33:37', 80000, 80000, ''),
(79, 156, '2024-11-13 04:34:42', 500000, 500000, ''),
(80, 157, '2024-11-13 04:35:12', 500000, 500000, ''),
(81, 158, '2024-11-13 04:55:01', 80000, 80000, ''),
(82, 159, '2024-11-13 08:50:34', 500000, 500000, ''),
(83, 160, '2024-11-13 08:53:32', 100000, 100000, ''),
(84, 161, '2024-11-13 08:54:59', 80000, 80000, ''),
(85, 162, '2024-11-13 08:55:15', 100000, 100000, ''),
(86, 163, '2024-11-13 16:45:42', 500000, 500000, ''),
(87, 164, '2024-11-13 16:51:11', 100000, 100000, ''),
(88, 165, '2024-11-16 06:41:09', 500000, 500000, ''),
(89, 166, '2024-11-17 05:22:48', 100000, 100000, ''),
(90, 167, '2024-11-17 05:24:17', 120000, 120000, ''),
(91, 168, '2024-11-17 05:24:42', 500000, 500000, ''),
(92, 169, '2024-11-17 05:25:20', 500000, 500000, ''),
(93, 170, '2024-11-17 14:27:29', 500000, 500000, ''),
(94, 171, '2024-11-17 14:58:26', 500000, 500000, ''),
(95, 172, '2024-11-17 15:00:15', 500000, 500000, ''),
(96, 173, '2024-11-17 15:01:20', 500000, 500000, ''),
(97, 174, '2024-11-17 15:02:43', 864000, 864000, ''),
(98, 175, '2024-11-23 14:55:45', 80000, 80000, ''),
(99, 176, '2024-11-23 14:58:21', 80000, 80000, ''),
(100, 177, '2024-11-23 15:01:16', 80000, 80000, ''),
(101, 178, '2024-11-23 15:01:39', 80000, 80000, ''),
(102, 179, '2024-11-23 15:03:45', 1740000, 1740000, ''),
(103, 180, '2024-11-23 17:55:07', 1080000, 1080000, ''),
(104, 181, '2024-11-24 06:10:51', 735000, 735000, ''),
(105, 182, '2024-11-24 08:56:17', 500000, 500000, 'invoice_182_2024-12-01.pdf'),
(150, 79, '2024-11-30 17:48:56', 860000, 860000, 'invoice_79_2024-12-01.pdf'),
(154, 243, '2024-12-01 04:48:04', 920000, 920000, 'invoice_243_2024-12-01.pdf'),
(209, 299, '2024-12-09 11:49:30', 500000, 500000, ''),
(210, 300, '2024-12-09 11:51:03', 500000, 500000, ''),
(211, 301, '2024-12-09 11:51:17', 500000, 500000, ''),
(212, 302, '2024-12-09 11:52:39', 500000, 500000, ''),
(213, 303, '2024-12-09 11:54:06', 500000, 500000, ''),
(214, 304, '2024-12-09 11:58:03', 500000, 500000, 'invoice_304_2024-12-09.pdf'),
(215, 305, '2024-12-09 14:25:10', 120000, 120000, ''),
(219, 309, '2024-12-14 16:52:56', 500000, 500000, ''),
(220, 310, '2024-12-14 10:05:29', 620000, 620000, ''),
(221, 311, '2024-12-14 10:24:51', 620000, 620000, ''),
(223, 312, '2024-12-14 10:52:37', 620000, 620000, ''),
(224, 313, '2024-12-14 10:59:07', 740000, 740000, ''),
(227, 314, '2024-12-14 11:21:19', 500000, 500000, 'invoice_314_2024-12-17.pdf'),
(228, 315, '2024-12-14 11:40:20', 620000, 620000, ''),
(229, 316, '2024-12-14 11:59:28', 869000, 869000, ''),
(230, 321, '2024-12-14 21:48:24', 759000, 759000, ''),
(231, 322, '2024-12-14 21:48:44', 759000, 759000, ''),
(232, 323, '2024-12-14 21:49:03', 759000, 759000, ''),
(233, 324, '2024-12-15 03:02:54', 760000, 760000, 'invoice_324_2024-12-15.pdf'),
(234, 326, '2024-12-15 03:10:01', 630000, 630000, 'invoice_326_2024-12-15.pdf'),
(235, 327, '2024-12-15 03:20:04', 350000, 350000, ''),
(236, 328, '2024-12-17 00:31:23', 1170000, 1170000, ''),
(237, 329, '2024-12-17 00:35:29', 1170000, 1170000, '');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(30) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `image_url`, `description`) VALUES
(1, 'Nhớt Fuchs Silkolene Max 10W40 4T 0.8L', 'https://shop2banh.vn/images/thumbs/2024/11/nhot-fuchs-silkolene-max-scoot-10w40-4t-08l-2366-slide-products-6725b2bac1acc.png', NULL),
(2, 'Nhớt Fuchs Silkolene Max 10W40 4T 1L\r\n', 'https://shop2banh.vn/images/thumbs/2024/10/nhot-fuchs-silkolene-max-scoot-10w40-1-lit-2367-slide-products-66fe588aa8abb.jpg', NULL),
(3, 'Lốp Deli Urban Grip (90/80-14 - 100/80-14)', 'https://shop2banh.vn/images/thumbs/2024/11/lop-deli-urban-grip-9080-14-10080-14-2379-slide-products-673171e88204a.jpg', NULL),
(4, 'Lốp Maxxis M6002 (70/90-17 - 80/90-17)', 'https://shop2banh.vn/images/thumbs/2024/01/lop-maxxis-m6002-7090-17-8090-17-2257-slide-products-65b370a9bdb40.jpg', NULL),
(5, 'Vỏ Maxxis 80/90-17 M6002', 'https://shop2banh.vn/images/thumbs/2024/01/vo-maxxis-8090-17-m6002-2254-slide-products-65ae1b919c326.jpg', NULL),
(6, 'Phuộc Profender Flash Series cho Yamaha PG-1 chính hãng', 'https://shop2banh.vn/images/thumbs/2024/11/phuoc-profender-flash-series-cho-yamaha-pg-1-chinh-hang-2375-slide-products-6728428a222bd.png', NULL),
(7, 'Mâm X1R 8 cây chính hãng cho Wave, Dream, Future,... trước đĩa sau', 'https://shop2banh.vn/images/thumbs/2024/08/mam-x1r-8-cay-cho-wave-dream-future-chinh-hang-2344-slide-products-66b2fd59bfc52.jpg', NULL),
(8, 'Lọc gió zin cho Lead 4val (2022 - 2025)', 'https://shop2banh.vn/images/thumbs/2024/09/loc-gio-zin-cho-lead-4val-2022-2025-2360-slide-products-66f27a845c26b.jpg', NULL),
(9, 'Bộ nhông sên dĩa Pro-Bike cho Future Fi, Future Led', 'https://shop2banh.vn/images/thumbs/2024/07/bo-nhong-sen-dia-probike-cho-future-fi-2320-slide-products-668668a963199.jpg', NULL),
(10, 'Bộ nhông sên dĩa Pro-Bike cho Sirius 15T - 36T- Sên 428', 'https://shop2banh.vn/images/thumbs/2024/06/bo-nhong-sen-dia-probike-cho-sirius-36t-2322-slide-products-667a3be6bdd91.jpg', NULL),
(11, 'Bộ nhông sên dĩa Pro-Bike cho Sirius 15T - 36T- Sên 429', 'https://shop2banh.vn/images/thumbs/2024/06/bo-nhong-sen-dia-probike-cho-sirius-36t-2322-slide-products-667a3be6bdd91.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `motorcycles`
--

CREATE TABLE `motorcycles` (
  `id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motorcycles`
--

INSERT INTO `motorcycles` (`id`, `brand_id`, `name`, `image_url`) VALUES
(1, 1, 'Wave alpha 110', NULL),
(2, 1, 'Air Blade 2025', NULL),
(3, 1, 'LEAD 125', NULL),
(4, 1, 'Vision', NULL),
(5, 2, 'LEXI', NULL),
(6, 2, 'GRANDE', NULL),
(7, 2, 'FREEGO', NULL),
(8, 2, 'LATTE', NULL),
(9, 2, 'JANUS', NULL),
(10, 2, 'NVX', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `motorcycle_brands`
--

CREATE TABLE `motorcycle_brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `motorcycle_brands`
--

INSERT INTO `motorcycle_brands` (`id`, `name`) VALUES
(1, 'Honda'),
(2, 'Yamaha'),
(3, 'Suzuki'),
(4, 'Kawasaki'),
(5, 'Ducati'),
(6, 'BMW'),
(7, 'Harley-Davidson'),
(8, 'Triumph'),
(9, 'KTM'),
(10, 'Aprilia');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `date`) VALUES
(1, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương\" đã được tạo thành công!', '2024-10-19 18:52:25'),
(2, 'Nhân viên đang trên đường đến', 'Nhân viên đang trên đường đến', '2024-10-19 18:52:25'),
(3, 'Bạn có nhiệm vụ mới', 'Bạn vừa được giao nhiệm vụ mới', '2024-10-19 18:52:25'),
(4, 'Nhiệm vụ bị hủy bỏ', 'Nhiệm vụ cho lịch hẹn 45 bị hủy', '2024-11-02 19:14:01'),
(5, 'Nhiệm vụ bị hủy bỏ', 'Nhiệm vụ cho lịch hẹn 45 bị hủy', '2024-11-02 19:14:01'),
(6, 'Lịch hẹn sửa chữa mới', 'Bạn có lịch hẹn sửa chữa mới với khách hàng vào 2024-11-03 lúc 10:00', '2024-11-02 10:00:00'),
(7, 'Hoàn thành nhiệm vụ', 'Nhiệm vụ cho lịch hẹn 42 đã được hoàn thành thành công', '2024-11-02 11:30:00'),
(8, 'Thay đổi lịch hẹn', 'Lịch hẹn sửa chữa với khách hàng lúc 15:00 ngày 2024-11-04 đã được thay đổi', '2024-11-02 12:00:00'),
(9, 'Phụ tùng sắp hết', 'Cảnh báo: Phụ tùng phanh xe sắp hết, vui lòng kiểm tra kho', '2024-11-02 13:15:00'),
(10, 'Nhắc nhở nhiệm vụ', 'Nhiệm vụ bảo dưỡng định kỳ cho xe của khách hàng lúc 14:00 ngày 2024-11-05', '2024-11-02 14:00:00'),
(11, 'Kiểm tra báo cáo công việc', 'Vui lòng kiểm tra báo cáo công việc hàng tuần', '2024-11-02 15:30:00'),
(12, 'Đặt phụ tùng mới', 'Bạn đã đặt thêm bộ phanh xe mới cho kho hàng vào ngày 2024-11-06', '2024-11-02 16:45:00'),
(13, 'Nhắc nhở thanh toán', 'Khách hàng lịch hẹn 47 còn nợ chi phí sửa chữa. Vui lòng thông báo khách hàng.', '2024-11-02 17:00:00'),
(14, 'Báo cáo sự cố', 'Sự cố máy móc trong quá trình sửa chữa xe cho khách hàng lịch hẹn 49', '2024-11-02 18:15:00'),
(106, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-13 15:50:34'),
(107, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp\" đã được tạo thành công!', '2024-11-13 15:53:32'),
(108, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe\" đã được tạo thành công!', '2024-11-13 15:54:59'),
(109, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương\" đã được tạo thành công!', '2024-11-13 15:55:15'),
(110, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cao cấp cho xe honda\" đã được tạo thành công!', '2024-11-13 23:45:42'),
(111, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay yên xe\" đã được tạo thành công!', '2024-11-13 23:51:11'),
(112, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay yên xe đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-13 23:56:42'),
(113, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu sửa chữa. Vui lòng chờ trong giây lát!', '2024-11-14 00:04:43'),
(114, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 00:06:08'),
(115, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay yên xe đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-14 00:10:15'),
(116, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu dịch vụ Thay yên xe. Vui lòng chờ trong giây lát!', '2024-11-14 00:10:27'),
(117, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 00:10:43'),
(118, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 00:11:01'),
(119, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 00:16:09'),
(120, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 00:35:43'),
(121, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 22:43:22'),
(122, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 22:43:57'),
(123, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 22:59:12'),
(124, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:00:13'),
(125, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:06:25'),
(126, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:06:37'),
(127, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:12:53'),
(128, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:16:09'),
(129, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:19:48'),
(130, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:22:31'),
(131, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:22:54'),
(132, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:38:45'),
(133, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:40:16'),
(134, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:40:25'),
(135, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:40:41'),
(136, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay yên xe', '2024-11-14 23:41:38'),
(137, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cao cấp cho xe honda\" đã được tạo thành công!', '2024-11-16 13:41:09'),
(138, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cao cấp cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-16 15:19:33'),
(139, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cao cấp cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-16 15:20:48'),
(140, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-16 23:39:02'),
(141, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-16 23:39:09'),
(142, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay gương đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-16 23:39:34'),
(143, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay gương', '2024-11-16 23:39:39'),
(144, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 01:56:26'),
(145, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 01:57:22'),
(146, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 01:59:17'),
(147, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 01:59:43'),
(148, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 09:32:28'),
(149, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:32:38'),
(150, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:32:40'),
(151, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:33:44'),
(152, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:34:21'),
(153, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:34:38'),
(154, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 09:34:50'),
(155, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cao cấp cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 09:46:54'),
(156, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 09:47:02'),
(157, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 09:49:52'),
(158, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 09:52:22'),
(159, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cao cấp cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 09:55:52'),
(160, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 09:56:00'),
(161, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay lốp đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 09:59:29'),
(162, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 09:59:30'),
(163, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:01:05'),
(164, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:01:45'),
(165, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:02:56'),
(166, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:03:59'),
(167, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:04:51'),
(168, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:06:07'),
(169, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:07:11'),
(170, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:07:50'),
(171, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:09:03'),
(172, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:12:39'),
(173, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay lốp', '2024-11-17 10:14:21'),
(174, 'Xác nhận lịch hẹn', 'Lịch hẹn Cấp cứu xe chết máy do ngập nước đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 10:14:49'),
(175, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-17 10:14:49'),
(176, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-17 10:24:05'),
(177, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-17 10:25:39'),
(178, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-17 10:26:49'),
(179, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-17 10:27:31'),
(180, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe', '2024-11-17 10:34:54'),
(181, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:17:56'),
(182, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay yên xe\" đã được tạo thành công!', '2024-11-17 12:22:48'),
(183, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay phanh\" đã được tạo thành công!', '2024-11-17 12:24:17'),
(184, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Bảo dưỡng định kỳ\" đã được tạo thành công!', '2024-11-17 12:24:42'),
(185, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Bảo dưỡng định kỳ\" đã được tạo thành công!', '2024-11-17 12:25:20'),
(186, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:31:20'),
(187, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:31:34'),
(188, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:32:13'),
(189, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:34:55'),
(190, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:35:28'),
(191, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cao cấp cho xe honda', '2024-11-17 12:38:50'),
(192, 'Xác nhận lịch hẹn', 'Lịch hẹn Bảo dưỡng định kỳ đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 14:58:22'),
(193, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Bảo dưỡng định kỳ', '2024-11-17 14:59:47'),
(194, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay lốp đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 16:03:42'),
(195, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cao cấp cho xe honda\" đã được tạo thành công!', '2024-11-17 21:27:29'),
(196, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-17 21:58:26'),
(197, 'Xác nhận lịch hẹn', 'Lịch hẹn Cấp cứu xe chết máy do ngập nước đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 21:59:28'),
(198, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-17 22:00:15'),
(199, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-17 22:01:20'),
(200, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-17 22:02:43'),
(201, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cao cấp cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-17 23:52:00'),
(202, 'Xác nhận lịch hẹn', 'Lịch hẹn Cấp cứu xe chết máy do ngập nước đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-18 00:31:52'),
(203, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-20 00:52:45'),
(204, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-20 01:03:08'),
(205, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-20 01:03:24'),
(206, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-21 22:45:44'),
(207, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-11-21 22:45:46'),
(209, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-22 10:27:15'),
(210, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-22 10:27:54'),
(211, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu dịch vụ Cấp cứu xe chết máy do ngập nước. Vui lòng chờ trong giây lát!', '2024-11-23 14:45:09'),
(212, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-23 14:45:13'),
(213, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-23 14:46:07'),
(214, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-11-23 18:31:02'),
(215, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe\" đã được tạo thành công!', '2024-11-23 21:58:21'),
(216, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe\" đã được tạo thành công!', '2024-11-23 22:01:39'),
(217, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe\" đã được tạo thành công!', '2024-11-23 22:03:45'),
(218, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-24 00:55:07'),
(219, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 00:57:25'),
(220, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-11-24 10:37:22'),
(221, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-11-24 13:01:06'),
(222, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-24 13:10:52'),
(223, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:15:54'),
(224, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:19:46'),
(225, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:21:48'),
(226, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:23:15'),
(227, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:30:33'),
(228, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:37:00'),
(229, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-11-24 13:37:01'),
(230, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-24 13:46:33'),
(231, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-11-24 13:46:34'),
(232, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-11-24 13:51:18'),
(233, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe\" đã được tạo thành công!', '2024-11-24 15:56:17'),
(234, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe honda, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-25 22:05:33'),
(235, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Vá lốp xe honda, wave alpha mới cần thực hiện!', '2024-11-25 22:05:35'),
(236, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-28 21:21:28'),
(237, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-28 21:56:25'),
(238, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 12:05:18'),
(239, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 12:22:46'),
(240, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 12:45:57'),
(241, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 12:53:06'),
(242, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 12:55:16'),
(243, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 13:45:58'),
(244, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 13:49:11'),
(245, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 13:51:08'),
(246, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 13:52:04'),
(247, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 1000000 VNĐ', '2024-11-29 14:40:41'),
(248, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 14:43:44'),
(249, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 1000000 VNĐ', '2024-11-29 14:44:16'),
(250, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 14:45:30'),
(251, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 1000000 VNĐ', '2024-11-29 14:46:08'),
(252, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 14:47:07'),
(253, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 14:48:45'),
(254, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 14:48:58'),
(255, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 14:49:26'),
(256, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 1000000 VNĐ', '2024-11-29 14:49:58'),
(257, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 1000000 VNĐ', '2024-11-29 14:51:42'),
(258, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:23:52'),
(259, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:24:08'),
(260, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:24:29'),
(261, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:24:59'),
(262, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:27:46'),
(263, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:28:29'),
(264, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:28:57'),
(265, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:30:20'),
(266, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:31:04'),
(267, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:31:39'),
(268, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:42:41'),
(269, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 15:45:35'),
(270, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 15:46:39'),
(271, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 15:53:27'),
(272, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 15:53:53'),
(273, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 15:58:19'),
(274, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 15:58:21'),
(275, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 15:58:25'),
(276, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 15:59:41'),
(277, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:24'),
(278, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:24'),
(279, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:34'),
(280, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:34'),
(281, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:39'),
(282, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:00:39'),
(283, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-11-29 16:03:51'),
(284, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:04:18'),
(285, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:04:31'),
(286, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:04:32'),
(287, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:04:47'),
(288, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:04:47'),
(289, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:06:26'),
(290, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:06:27'),
(291, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:06:43'),
(292, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-11-29 16:06:43'),
(293, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 16:13:21'),
(294, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:13:49'),
(295, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:13:58'),
(296, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:13:59'),
(297, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:14:08'),
(298, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:14:08'),
(299, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:15:11'),
(300, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 500000 VNĐ', '2024-11-29 16:15:12'),
(301, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-11-29 16:19:31'),
(302, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Cấp cứu xe chết máy do ngập nước số tiền 615000 VNĐ', '2024-11-29 16:20:14'),
(303, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương honda, wave alpha\" đã được tạo thành công!', '2024-11-29 23:34:26'),
(304, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay gương honda, wave alpha số tiền 100000 VNĐ', '2024-11-29 23:35:22'),
(305, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-30 17:15:14'),
(306, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-11-30 17:15:17'),
(307, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-30 17:15:48'),
(308, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-11-30 17:15:49'),
(309, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe honda, wave alpha', '2024-11-30 22:56:21'),
(310, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe honda, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-30 23:02:01'),
(311, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Vá lốp xe honda, wave alpha mới cần thực hiện!', '2024-11-30 23:02:01'),
(312, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe honda, wave alpha', '2024-11-30 23:02:05'),
(313, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay xích xe honda, wave alpha\" đã được tạo thành công!', '2024-11-30 23:03:10'),
(314, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay xích xe honda, wave alpha số tiền 370000 VNĐ', '2024-11-30 23:03:58'),
(315, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay xích xe honda, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-30 23:06:14'),
(316, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay xích xe honda, wave alpha mới cần thực hiện!', '2024-11-30 23:06:16'),
(317, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay xích xe honda, wave alpha', '2024-11-30 23:06:25'),
(318, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay gương honda, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-11-30 23:07:23'),
(319, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay gương honda, wave alpha mới cần thực hiện!', '2024-11-30 23:07:24'),
(320, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay gương honda, wave alpha', '2024-11-30 23:07:28'),
(321, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu dịch vụ Vá lốp xe honda, wave alpha. Vui lòng chờ trong giây lát!', '2024-11-30 23:07:36'),
(322, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe honda, wave alpha', '2024-11-30 23:07:37'),
(323, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-01 00:11:12'),
(324, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 615000 VNĐ', '2024-12-01 00:11:44'),
(325, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 860000 VNĐ', '2024-12-01 00:50:13'),
(326, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 500000 VNĐ', '2024-12-01 01:23:44'),
(327, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe honda, wave alpha', '2024-12-01 01:33:01'),
(328, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 1740000 VNĐ', '2024-12-01 10:29:36'),
(329, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Bảo dưỡng định kỳ xe honda, dream, wave alpha\" đã được tạo thành công!', '2024-12-01 11:47:57'),
(330, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha số tiền 920000 VNĐ', '2024-12-01 11:48:32'),
(331, 'Xác nhận lịch hẹn', 'Lịch hẹn Bảo dưỡng định kỳ xe honda, dream, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-01 11:56:48'),
(332, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Bảo dưỡng định kỳ xe honda, dream, wave alpha mới cần thực hiện!', '2024-12-01 11:56:49'),
(333, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha', '2024-12-01 11:57:07'),
(334, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay bánh xe honda suzuki\" đã được tạo thành công!', '2024-12-02 18:46:19'),
(335, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay bánh xe honda suzuki số tiền 100000 VNĐ', '2024-12-02 18:47:14'),
(336, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 14:35:35'),
(337, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay lốp xe honda, wave alpha số tiền 100000 VNĐ', '2024-12-05 14:36:30'),
(338, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 16:10:06'),
(339, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-05 16:11:05'),
(340, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay bánh xe honda\" đã được tạo thành công!', '2024-12-05 16:12:17'),
(341, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay bánh xe honda số tiền 200000 VNĐ', '2024-12-05 16:13:50'),
(342, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay bánh xe honda\" đã được tạo thành công!', '2024-12-05 16:29:14'),
(343, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-05 16:29:33'),
(344, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 16:30:44'),
(345, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 16:38:55'),
(346, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 16:47:12'),
(347, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 17:21:36'),
(348, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 17:58:50'),
(349, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 21:28:55'),
(350, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 920000 VNĐ', '2024-12-05 21:37:17'),
(351, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 21:38:28'),
(352, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 920000 VNĐ', '2024-12-05 21:38:58'),
(353, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 21:41:16'),
(354, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Vá lốp xe honda, wave alpha số tiền 920000 VNĐ', '2024-12-05 21:41:59'),
(355, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 21:43:03'),
(356, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-05 22:53:41'),
(357, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương honda, wave alpha\" đã được tạo thành công!', '2024-12-05 23:23:42'),
(358, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-05 23:57:45'),
(359, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:26:36'),
(360, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:28:12'),
(361, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:38:38'),
(362, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:39:07'),
(363, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:47:22'),
(364, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:47:32'),
(365, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:51:44'),
(366, 'Thanh toán thành công', 'Thanh toán thành công dịch vụ Thay nhớt cho xe honda số tiền 500000 VNĐ', '2024-12-06 00:52:14'),
(367, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 00:54:22'),
(368, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda va cac san pham dat cungthành công với số tiền 500000 VNĐ', '2024-12-06 00:54:47'),
(369, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-06 01:30:35'),
(370, 'Thanh toán thành công', 'Thanh toán dịch vụ Cấp cứu xe chết máy do ngập nước va các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-06 01:31:04'),
(371, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 10:05:17'),
(372, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-06 10:07:09'),
(373, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-06 10:08:35'),
(374, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-06 10:13:02'),
(375, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-06 10:13:51'),
(376, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-06 10:14:27'),
(377, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-06 10:38:12'),
(378, 'Thanh toán thành công', 'Thanh toán dịch vụ Cấp cứu xe chết máy do ngập nước và các sản phẩm đặt cùng thành công với số tiền 744000 VNĐ', '2024-12-06 10:38:59'),
(379, 'Thanh toán thành công', 'Thanh toán dịch vụ Cấp cứu xe chết máy do ngập nước và các sản phẩm đặt cùng thành công với số tiền 744000 VNĐ', '2024-12-06 10:42:46'),
(380, 'Thanh toán thành công', 'Thanh toán dịch vụ Cấp cứu xe chết máy do ngập nước và các sản phẩm đặt cùng thành công với số tiền 744000 VNĐ', '2024-12-06 10:46:48'),
(381, 'Thanh toán thành công', 'Thanh toán dịch vụ Cấp cứu xe chết máy do ngập nước và các sản phẩm đặt cùng thành công với số tiền 744000 VNĐ', '2024-12-06 10:55:09'),
(382, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-06 11:24:58'),
(383, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-06 11:27:07'),
(384, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 920000 VNĐ', '2024-12-07 13:31:06'),
(385, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-07 14:03:32'),
(386, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Cấp cứu xe chết máy do ngập nước\" đã được tạo thành công!', '2024-12-07 14:05:25'),
(387, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-12-07 14:55:28'),
(388, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-12-07 14:56:32'),
(389, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Cấp cứu xe chết máy do ngập nước', '2024-12-07 15:51:59'),
(390, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 19:42:52'),
(391, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 615000 VNĐ', '2024-12-07 19:44:18'),
(392, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 22:27:15'),
(393, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 22:29:35'),
(394, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 22:29:53'),
(395, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 22:31:03'),
(396, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 615000 VNĐ', '2024-12-07 22:31:30'),
(397, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-07 22:39:07'),
(398, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương honda, wave alpha\" đã được tạo thành công!', '2024-12-07 22:41:18'),
(399, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:03:17'),
(400, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:03:41'),
(401, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:04:07'),
(402, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:08:43'),
(403, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:09:44'),
(404, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-08 01:10:15'),
(405, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-08 09:26:53'),
(406, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-08 09:26:54'),
(407, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-12-08 09:27:36'),
(408, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:49:30'),
(409, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-09 18:50:16'),
(410, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:51:03'),
(411, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:51:17'),
(412, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-09 18:51:40'),
(413, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:52:39'),
(414, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-09 18:53:28'),
(415, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:54:06'),
(416, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-09 18:54:30'),
(417, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-09 18:58:03'),
(418, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-09 18:58:26'),
(419, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Vá lốp xe honda, wave alpha', '2024-12-09 21:12:28'),
(420, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe honda, wave alpha đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-09 21:17:31'),
(421, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Vá lốp xe honda, wave alpha mới cần thực hiện!', '2024-12-09 21:17:32'),
(422, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Kiểm tra và sửa hệ thống đèn xe Lead\" đã được tạo thành công!', '2024-12-09 21:25:10'),
(423, 'Thanh toán thành công', 'Thanh toán dịch vụ Kiểm tra và sửa hệ thống đèn xe Lead và các sản phẩm đặt cùng thành công với số tiền 120000 VNĐ', '2024-12-09 21:25:54'),
(424, 'Xác nhận lịch hẹn', 'Lịch hẹn Kiểm tra và sửa hệ thống đèn xe Lead đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-09 21:30:05'),
(425, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Kiểm tra và sửa hệ thống đèn xe Lead mới cần thực hiện!', '2024-12-09 21:30:05'),
(426, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận và sẽ được thực hiện đúng giờ. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-14 14:45:31'),
(427, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-14 14:45:32'),
(428, 'Xác nhận lịch hẹn', 'Lịch hẹn Vá lốp xe honda, wave alpha đã được xác nhận. Nhân viên sẽ sớm di chuyển. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-14 14:54:41'),
(429, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Vá lốp xe honda, wave alpha mới cần thực hiện!', '2024-12-14 14:54:42'),
(430, 'Xác nhận lịch hẹn', '\n        Lịch hẹn Thay gương honda, wave alpha đã được xác nhận. Nhân viên sẽ sớm di chuyển.\n        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-14 15:05:30'),
(431, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay gương honda, wave alpha mới cần thực hiện!', '2024-12-14 15:05:31'),
(432, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\n        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-14 15:06:09'),
(433, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-14 15:06:10'),
(434, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay gương honda, wave alpha\" đã được tạo thành công!', '2024-12-14 15:14:18'),
(435, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay gương honda, wave alpha đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-14 15:14:29'),
(436, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay gương honda, wave alpha mới cần thực hiện!', '2024-12-14 15:14:30'),
(437, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-14 23:19:13'),
(438, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-14 23:44:12'),
(439, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Vá lốp xe honda, wave alpha\" đã được tạo thành công!', '2024-12-14 23:52:56'),
(440, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 00:05:29'),
(441, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 00:06:02'),
(442, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 00:06:03'),
(443, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 620000 VNĐ', '2024-12-15 00:11:24'),
(444, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 00:24:51'),
(445, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 620000 VNĐ', '2024-12-15 00:33:06'),
(446, 'Thanh toán thành công', 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-15 00:49:32'),
(447, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 00:52:37'),
(448, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 620000 VNĐ', '2024-12-15 00:54:06'),
(449, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 00:59:07'),
(450, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 01:21:19'),
(451, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 500000 VNĐ', '2024-12-15 01:21:46'),
(452, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 01:40:20'),
(453, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 620000 VNĐ', '2024-12-15 01:52:48'),
(454, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 01:59:28'),
(455, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 869000 VNĐ', '2024-12-15 02:00:05'),
(456, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 11:48:24'),
(457, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 11:48:44'),
(458, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 11:49:03'),
(459, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 759000 VNĐ', '2024-12-15 12:06:45'),
(460, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 17:02:54'),
(461, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 760000 VNĐ', '2024-12-15 17:03:21'),
(462, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 17:04:30'),
(463, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 17:10:01'),
(464, 'Thanh toán thành công', 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng thành công với số tiền 630000 VNĐ', '2024-12-15 17:11:31'),
(465, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Thay nhớt cho xe honda\" đã được tạo thành công!', '2024-12-15 17:20:04'),
(466, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:22:53'),
(467, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:22:54'),
(468, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:23:03'),
(469, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:23:03'),
(470, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:23:12'),
(471, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:23:12'),
(472, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:23:32'),
(473, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:23:32'),
(474, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:23:40'),
(475, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:23:41'),
(476, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-15 17:23:52'),
(477, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-15 17:23:52');
INSERT INTO `notifications` (`id`, `title`, `message`, `date`) VALUES
(478, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu dịch vụ Thay nhớt cho xe honda. Vui lòng chờ trong giây lát!', '2024-12-15 17:40:30'),
(479, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-12-15 17:56:26'),
(480, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-12-15 17:56:38'),
(481, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-17 13:28:53'),
(482, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-17 13:28:55'),
(483, 'Quá trình sửa chữa hoàn tất!', 'Nhân viên đã hoàn tất dịch vụ Thay nhớt cho xe honda', '2024-12-17 13:28:58'),
(484, 'Xác nhận lịch hẹn', 'Lịch hẹn Thay nhớt cho xe honda đã được xác nhận. Nhân viên sẽ sớm di chuyển.\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!', '2024-12-17 13:29:36'),
(485, 'Bạn có nhiệm vụ mới', 'Bạn có lịch hẹn Thay nhớt cho xe honda mới cần thực hiện!', '2024-12-17 13:29:37'),
(486, 'Bắt đầu sửa chữa', 'Nhân viên đã bắt đầu dịch vụ Thay nhớt cho xe honda. Vui lòng chờ trong giây lát!', '2024-12-17 13:29:41'),
(487, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Bảo dưỡng định kỳ xe honda, dream, wave alpha\" đã được tạo thành công!', '2024-12-17 14:31:23'),
(488, 'Tạo lịch hẹn thành công', 'Lịch hẹn \"Bảo dưỡng định kỳ xe honda, dream, wave alpha\" đã được tạo thành công!', '2024-12-17 14:35:29'),
(489, 'Thanh toán thành công', 'Thanh toán dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha và các sản phẩm đặt cùng thành công với số tiền 1170000 VNĐ', '2024-12-17 14:39:30'),
(490, 'Thanh toán thành công', 'Thanh toán dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha và các sản phẩm đặt cùng thành công với số tiền 1170000 VNĐ', '2024-12-17 14:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `notifications_users`
--

CREATE TABLE `notifications_users` (
  `user_id` int(11) NOT NULL,
  `notification_id` int(11) NOT NULL,
  `recipient_type` varchar(255) NOT NULL,
  `is_read` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications_users`
--

INSERT INTO `notifications_users` (`user_id`, `notification_id`, `recipient_type`, `is_read`) VALUES
(2, 1, 'customer', 1),
(2, 2, 'customer', 1),
(2, 181, 'customer', 1),
(2, 182, 'customer', 1),
(2, 183, 'customer', 1),
(2, 184, 'customer', 1),
(2, 185, 'customer', 1),
(2, 186, 'customer', 1),
(2, 187, 'customer', 1),
(2, 188, 'customer', 1),
(2, 189, 'customer', 1),
(2, 190, 'customer', 1),
(2, 191, 'customer', 1),
(2, 192, 'customer', 1),
(2, 193, 'customer', 1),
(2, 194, 'customer', 1),
(2, 195, 'customer', 1),
(2, 196, 'customer', 1),
(2, 197, 'customer', 1),
(2, 198, 'customer', 1),
(2, 199, 'customer', 1),
(2, 200, 'customer', 1),
(2, 201, 'customer', 1),
(2, 202, 'customer', 1),
(2, 203, 'customer', 1),
(2, 204, 'customer', 1),
(2, 205, 'customer', 1),
(2, 206, 'customer', 1),
(2, 207, 'customer', 1),
(1, 1, 'staff', 1),
(1, 2, 'staff', 1),
(1, 3, 'staff', 1),
(1, 4, 'staff', 1),
(1, 5, 'staff', 1),
(1, 6, 'staff', 1),
(1, 7, 'staff', 1),
(1, 8, 'staff', 1),
(1, 9, 'staff', 1),
(1, 10, 'staff', 1),
(1, 11, 'staff', 1),
(1, 12, 'staff', 1),
(1, 13, 'staff', 1),
(1, 14, 'staff', 1),
(2, 209, 'customer', 1),
(2, 210, 'customer', 1),
(2, 211, 'customer', 1),
(2, 212, 'customer', 1),
(2, 213, 'customer', 1),
(2, 214, 'customer', 1),
(2, 215, 'customer', 1),
(2, 216, 'customer', 1),
(2, 217, 'customer', 1),
(2, 218, 'customer', 1),
(2, 219, 'customer', 1),
(2, 220, 'customer', 1),
(2, 221, 'customer', 1),
(2, 222, 'customer', 1),
(2, 223, 'customer', 1),
(2, 224, 'customer', 1),
(2, 225, 'customer', 1),
(2, 226, 'customer', 1),
(2, 227, 'customer', 1),
(2, 228, 'customer', 1),
(1, 229, 'staff', 0),
(2, 230, 'customer', 1),
(1, 231, 'staff', 0),
(2, 232, 'customer', 1),
(2, 233, 'customer', 1),
(2, 234, 'customer', 1),
(1, 235, 'staff', 0),
(2, 236, 'customer', 1),
(2, 237, 'customer', 1),
(2, 238, 'customer', 1),
(2, 239, 'customer', 1),
(2, 240, 'customer', 1),
(2, 241, 'customer', 1),
(2, 242, 'customer', 1),
(2, 243, 'customer', 1),
(2, 244, 'customer', 1),
(2, 245, 'customer', 1),
(2, 246, 'customer', 1),
(2, 247, 'customer', 1),
(2, 248, 'customer', 1),
(2, 249, 'customer', 1),
(2, 250, 'customer', 1),
(2, 251, 'customer', 1),
(2, 252, 'customer', 1),
(2, 253, 'customer', 1),
(2, 254, 'customer', 1),
(2, 255, 'customer', 1),
(2, 256, 'customer', 1),
(2, 257, 'customer', 1),
(2, 258, 'customer', 1),
(2, 259, 'customer', 1),
(2, 260, 'customer', 1),
(2, 261, 'customer', 1),
(2, 262, 'customer', 1),
(2, 263, 'customer', 1),
(2, 264, 'customer', 1),
(2, 265, 'customer', 1),
(2, 266, 'customer', 1),
(2, 267, 'customer', 1),
(2, 268, 'customer', 1),
(2, 269, 'customer', 1),
(2, 270, 'customer', 1),
(2, 271, 'customer', 1),
(2, 272, 'customer', 1),
(2, 273, 'customer', 1),
(2, 274, 'customer', 1),
(2, 275, 'customer', 1),
(2, 276, 'customer', 1),
(2, 277, 'customer', 1),
(2, 278, 'customer', 1),
(2, 279, 'customer', 1),
(2, 280, 'customer', 1),
(2, 281, 'customer', 1),
(2, 282, 'customer', 1),
(2, 283, 'customer', 1),
(2, 284, 'customer', 1),
(2, 285, 'customer', 1),
(2, 286, 'customer', 1),
(2, 287, 'customer', 1),
(2, 288, 'customer', 1),
(2, 289, 'customer', 1),
(2, 290, 'customer', 1),
(2, 291, 'customer', 1),
(2, 292, 'customer', 1),
(2, 293, 'customer', 1),
(2, 294, 'customer', 1),
(2, 295, 'customer', 1),
(2, 296, 'customer', 1),
(2, 297, 'customer', 1),
(2, 298, 'customer', 1),
(2, 299, 'customer', 1),
(2, 300, 'customer', 1),
(2, 301, 'customer', 1),
(2, 302, 'customer', 1),
(2, 303, 'customer', 1),
(2, 304, 'customer', 1),
(2, 305, 'customer', 1),
(12, 306, 'staff', 0),
(2, 307, 'customer', 1),
(14, 308, 'staff', 0),
(2, 309, 'customer', 1),
(2, 310, 'customer', 1),
(12, 311, 'staff', 0),
(2, 312, 'customer', 1),
(2, 313, 'customer', 1),
(2, 314, 'customer', 1),
(2, 315, 'customer', 1),
(11, 316, 'staff', 0),
(2, 317, 'customer', 1),
(2, 318, 'customer', 1),
(11, 319, 'staff', 0),
(2, 320, 'customer', 1),
(2, 321, 'customer', 1),
(2, 322, 'customer', 1),
(2, 323, 'customer', 1),
(2, 324, 'customer', 1),
(2, 325, 'customer', 1),
(2, 326, 'customer', 1),
(2, 327, 'customer', 1),
(2, 328, 'customer', 1),
(2, 329, 'customer', 1),
(2, 330, 'customer', 1),
(2, 331, 'customer', 1),
(11, 332, 'staff', 0),
(2, 333, 'customer', 1),
(2, 334, 'customer', 1),
(2, 335, 'customer', 1),
(2, 336, 'customer', 1),
(2, 337, 'customer', 1),
(2, 338, 'customer', 1),
(2, 339, 'customer', 1),
(2, 340, 'customer', 1),
(2, 341, 'customer', 1),
(2, 342, 'customer', 1),
(2, 343, 'customer', 1),
(2, 344, 'customer', 1),
(2, 345, 'customer', 1),
(2, 346, 'customer', 1),
(2, 347, 'customer', 1),
(2, 348, 'customer', 1),
(2, 349, 'customer', 1),
(2, 350, 'customer', 1),
(2, 351, 'customer', 1),
(2, 352, 'customer', 1),
(2, 353, 'customer', 1),
(2, 354, 'customer', 1),
(2, 355, 'customer', 1),
(2, 356, 'customer', 1),
(2, 357, 'customer', 1),
(2, 358, 'customer', 1),
(2, 359, 'customer', 1),
(2, 360, 'customer', 1),
(2, 361, 'customer', 1),
(2, 362, 'customer', 1),
(2, 363, 'customer', 1),
(2, 364, 'customer', 1),
(2, 365, 'customer', 1),
(2, 366, 'customer', 1),
(2, 367, 'customer', 1),
(2, 368, 'customer', 1),
(2, 369, 'customer', 1),
(2, 370, 'customer', 1),
(2, 371, 'customer', 1),
(2, 372, 'customer', 1),
(2, 373, 'customer', 1),
(2, 374, 'customer', 1),
(2, 375, 'customer', 1),
(2, 376, 'customer', 1),
(2, 377, 'customer', 1),
(2, 378, 'customer', 1),
(2, 379, 'customer', 1),
(2, 380, 'customer', 1),
(2, 381, 'customer', 1),
(2, 382, 'customer', 1),
(2, 383, 'customer', 1),
(2, 384, 'customer', 1),
(2, 385, 'customer', 1),
(2, 386, 'customer', 1),
(2, 387, 'customer', 1),
(2, 388, 'customer', 1),
(2, 389, 'customer', 1),
(2, 390, 'customer', 1),
(2, 391, 'customer', 1),
(2, 392, 'customer', 1),
(2, 393, 'customer', 1),
(2, 394, 'customer', 1),
(2, 395, 'customer', 1),
(2, 396, 'customer', 1),
(2, 397, 'customer', 1),
(2, 398, 'customer', 1),
(2, 399, 'customer', 1),
(2, 400, 'customer', 1),
(2, 401, 'customer', 1),
(2, 402, 'customer', 1),
(2, 403, 'customer', 1),
(2, 404, 'customer', 1),
(2, 405, 'customer', 1),
(11, 406, 'staff', 0),
(2, 407, 'customer', 1),
(2, 408, 'customer', 1),
(2, 409, 'customer', 1),
(2, 410, 'customer', 1),
(2, 411, 'customer', 1),
(2, 412, 'customer', 1),
(2, 413, 'customer', 1),
(2, 414, 'customer', 1),
(2, 415, 'customer', 1),
(2, 416, 'customer', 1),
(2, 417, 'customer', 1),
(2, 418, 'customer', 1),
(2, 419, 'customer', 0),
(2, 420, 'customer', 0),
(12, 421, 'staff', 0),
(2, 422, 'customer', 0),
(2, 423, 'customer', 0),
(2, 424, 'customer', 0),
(12, 425, 'staff', 0),
(2, 426, 'customer', 0),
(12, 427, 'staff', 0),
(2, 428, 'customer', 0),
(14, 429, 'staff', 0),
(2, 430, 'customer', 0),
(10, 431, 'staff', 0),
(2, 432, 'customer', 0),
(13, 433, 'staff', 0),
(2, 434, 'customer', 0),
(2, 435, 'customer', 0),
(16, 436, 'staff', 0),
(2, 437, 'customer', 0),
(2, 438, 'customer', 0),
(2, 439, 'customer', 0),
(2, 440, 'customer', 0),
(2, 441, 'customer', 0),
(16, 442, 'staff', 0),
(2, 443, 'customer', 0),
(2, 444, 'customer', 0),
(2, 445, 'customer', 0),
(2, 446, 'customer', 0),
(2, 447, 'customer', 0),
(2, 448, 'customer', 0),
(2, 449, 'customer', 0),
(2, 450, 'customer', 0),
(2, 451, 'customer', 0),
(2, 452, 'customer', 0),
(2, 453, 'customer', 0),
(2, 454, 'customer', 0),
(2, 455, 'customer', 0),
(2, 456, 'customer', 0),
(2, 457, 'customer', 0),
(2, 458, 'customer', 0),
(2, 459, 'customer', 0),
(2, 460, 'customer', 0),
(2, 461, 'customer', 0),
(2, 462, 'customer', 0),
(2, 463, 'customer', 0),
(2, 464, 'customer', 0),
(2, 465, 'customer', 0),
(2, 466, 'customer', 0),
(11, 467, 'staff', 0),
(2, 468, 'customer', 0),
(11, 469, 'staff', 0),
(2, 470, 'customer', 0),
(16, 471, 'staff', 0),
(2, 472, 'customer', 0),
(12, 473, 'staff', 0),
(2, 474, 'customer', 0),
(11, 475, 'staff', 0),
(2, 476, 'customer', 0),
(12, 477, 'staff', 0),
(2, 478, 'customer', 0),
(2, 479, 'customer', 0),
(2, 480, 'customer', 0),
(2, 481, 'customer', 0),
(11, 482, 'staff', 0),
(2, 483, 'customer', 0),
(2, 484, 'customer', 0),
(11, 485, 'staff', 0),
(2, 486, 'customer', 0),
(2, 487, 'customer', 0),
(2, 488, 'customer', 0),
(2, 489, 'customer', 0),
(2, 490, 'customer', 0);

-- --------------------------------------------------------

--
-- Table structure for table `outputs`
--

CREATE TABLE `outputs` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `date_output` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outputs`
--

INSERT INTO `outputs` (`id`, `booking_id`, `date_output`) VALUES
(143, 79, '2024-12-05 16:45:53'),
(144, 105, '2024-12-05 16:45:53'),
(145, 174, '2024-12-05 16:45:53'),
(146, 179, '2024-12-05 16:45:53'),
(147, 180, '2024-12-05 16:45:53'),
(148, 181, '2024-12-05 16:45:53'),
(149, 182, '2024-12-05 16:45:53'),
(150, 241, '2024-12-05 16:45:53'),
(151, 242, '2024-12-05 16:45:53'),
(152, 243, '2024-12-05 16:45:53'),
(153, 299, '2024-12-09 11:50:16'),
(154, 301, '2024-12-09 11:51:40'),
(155, 302, '2024-12-09 11:53:28'),
(156, 303, '2024-12-09 11:54:30'),
(157, 304, '2024-12-09 11:58:26'),
(158, 309, '2024-12-14 17:49:32'),
(159, 310, '2024-12-14 17:11:24'),
(160, 311, '2024-12-14 17:33:06'),
(161, 312, '2024-12-14 17:54:06'),
(162, 315, '2024-12-14 18:52:48'),
(163, 316, '2024-12-14 19:00:05'),
(164, 322, '2024-12-15 05:06:45'),
(174, 324, '2024-12-15 10:03:21'),
(175, 326, '2024-12-15 10:11:31'),
(176, 329, '2024-12-17 07:39:30'),
(177, 328, '2024-12-17 07:40:35');

-- --------------------------------------------------------

--
-- Table structure for table `output_info`
--

CREATE TABLE `output_info` (
  `id` int(11) NOT NULL,
  `output_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `output_info`
--

INSERT INTO `output_info` (`id`, `output_id`, `item_id`, `count`, `price`, `booking_id`) VALUES
(1, 143, 1, 1, 115000, 79),
(2, 143, 3, 1, 550000, 79),
(3, 144, 1, 1, 115000, 105),
(4, 144, 2, 1, 129000, 105),
(5, 144, 3, 1, 550000, 105),
(6, 145, 8, 1, 120000, 174),
(7, 145, 1, 1, 115000, 174),
(8, 145, 2, 1, 129000, 174),
(9, 146, 4, 1, 420000, 179),
(10, 146, 5, 1, 420000, 179),
(11, 146, 7, 1, 820000, 179),
(12, 147, 1, 4, 115000, 180),
(13, 147, 8, 1, 120000, 180),
(14, 148, 1, 1, 115000, 181),
(15, 148, 8, 1, 120000, 181),
(16, 149, 5, 1, 420000, 182),
(17, 150, 9, 1, 220000, 241),
(18, 151, 1, 1, 115000, 242),
(19, 152, 5, 1, 420000, 243),
(20, 152, 1, 1, 115000, 243),
(21, 152, 2, 3, 129000, 243),
(22, 153, 4, 1, 420000, 299),
(23, 154, 4, 1, 420000, 301),
(24, 155, 4, 1, 420000, 302),
(25, 156, 4, 1, 420000, 303),
(26, 157, 1, 1, 120000, 304),
(27, 157, 2, 1, 129000, 304),
(28, 157, 3, 1, 550000, 304),
(29, 157, 4, 3, 420000, 304),
(30, 158, 4, 2, 420000, 309),
(31, 159, 1, 1, 120000, 310),
(32, 160, 1, 2, 120000, 311),
(33, 161, 1, 2, 120000, 312),
(34, 162, 1, 1, 120000, 315),
(35, 163, 1, 2, 120000, 316),
(36, 163, 2, 1, 129000, 316),
(37, 164, 1, 1, 130000, 322),
(38, 164, 2, 1, 129000, 322),
(64, 174, 1, 2, 130000, 0),
(65, 175, 1, 1, 130000, 0),
(66, 176, 3, 1, 550000, 0),
(67, 176, 8, 1, 120000, 0),
(69, 177, 3, 1, 550000, 0),
(70, 177, 8, 1, 120000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_method` varchar(255) NOT NULL COMMENT 'payment type: online, cash',
  `amount_paid` int(11) NOT NULL,
  `order_info` varchar(255) DEFAULT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  `bank_transaction_id` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL COMMENT 'mã giao dịch trên cổng thanh toán',
  `txn_ref` varchar(255) DEFAULT NULL COMMENT 'mã giao dịch tham chiếu trên hệ thống merchant',
  `payment_status` varchar(255) NOT NULL COMMENT 'mã phản hồi kết quả thanh toán trên cổng thanh toán',
  `status` varchar(255) NOT NULL COMMENT 'trạng thái của giao dịch\r\n- pending ( chưa có ipn)\r\n- success ( ipn trả về thành công)\r\n- fail ( ipn trả về thất bại)\r\n- refund'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `invoice_id`, `created_at`, `payment_method`, `amount_paid`, `order_info`, `bank_code`, `bank_transaction_id`, `transaction_id`, `txn_ref`, `payment_status`, `status`) VALUES
(77, 17, '2024-12-08 21:26:37', 'vnpay', 100000, 'Thanh toán dịch vụ Thay gương honda, wave alpha va cac san pham dat cung', 'NCB', 'VNP14708302', '14708302', 'GIAODICH_17_29233426', '00', 'success'),
(78, 18, '2024-12-05 23:45:53', 'vnpay', 370000, 'Thanh toán dịch vụ Thay xích xe honda, wave alpha va cac san pham dat cung', 'NCB', 'VNP14710269', '14710269', 'GIAODICH_18_30230310', '00', 'success'),
(79, 19, '2024-12-05 23:45:53', 'vnpay', 615000, 'Thanh toán dịch vụ Thay nhớt cho xe honda va cac san pham dat cung', 'NCB', 'VNP14710393', '14710393', 'GIAODICH_19_01001112', '00', 'success'),
(80, 150, '2024-12-05 23:45:53', 'vnpay', 860000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha va cac san pham dat cung', 'NCB', 'VNP14710446', '14710446', 'GIAODICH_150_01004856', '00', 'success'),
(84, 21, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_21_04011253', '00', 'success'),
(85, 22, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_22_04011309', '00', 'success'),
(86, 23, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_23_04011319', '00', 'success'),
(87, 24, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_24_04011647', '00', 'success'),
(88, 25, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_25_04011658', '00', 'success'),
(89, 26, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_26_04011708', '00', 'success'),
(90, 27, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_27_04104826', '00', 'success'),
(91, 28, '2024-12-05 23:45:53', 'vnpay', 1294000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_28_07223212', '00', 'success'),
(92, 29, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_29_19150641', '00', 'success'),
(93, 30, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_30_19150747', '00', 'success'),
(94, 31, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_31_19150839', '00', 'success'),
(95, 32, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_32_19221805', '00', 'success'),
(96, 33, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_33_19221847', '00', 'success'),
(97, 34, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_34_19221916', '00', 'success'),
(98, 35, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_35_19222703', '00', 'success'),
(99, 36, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_36_19222706', '00', 'success'),
(100, 37, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_37_19225345', '00', 'success'),
(101, 38, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_38_20121257', '00', 'success'),
(102, 39, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_39_20122148', '00', 'success'),
(103, 40, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_40_20122239', '00', 'success'),
(104, 41, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_41_20124137', '00', 'success'),
(105, 42, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_42_20150705', '00', 'success'),
(106, 43, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_43_20153333', '00', 'success'),
(107, 44, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_44_20222619', '00', 'success'),
(108, 45, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_45_20222729', '00', 'success'),
(109, 46, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_46_20222828', '00', 'success'),
(110, 47, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_47_20223652', '00', 'success'),
(111, 48, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_48_20223658', '00', 'success'),
(112, 49, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_49_21204218', '00', 'success'),
(113, 50, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_50_21235201', '00', 'success'),
(114, 51, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_51_21235317', '00', 'success'),
(115, 52, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_52_21235429', '00', 'success'),
(116, 53, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_53_22002800', '00', 'success'),
(117, 54, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_54_22015400', '00', 'success'),
(118, 55, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_55_22015458', '00', 'success'),
(119, 56, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_56_22015556', '00', 'success'),
(120, 57, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_57_22100513', '00', 'success'),
(121, 58, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_58_23235934', '00', 'success'),
(122, 59, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_59_24141023', '00', 'success'),
(123, 60, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_60_25003934', '00', 'success'),
(124, 61, '2024-12-05 23:45:53', 'vnpay', 200000, 'Thanh toan dich vu Thay bánh xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_61_27205542', '00', 'success'),
(125, 62, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_62_01161354', '00', 'success'),
(126, 63, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_63_01162235', '00', 'success'),
(127, 64, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_64_01162333', '00', 'success'),
(128, 65, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_65_01163255', '00', 'success'),
(129, 66, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_66_01231402', '00', 'success'),
(130, 67, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_67_01231437', '00', 'success'),
(131, 68, '2024-12-05 23:45:53', 'vnpay', 110000, 'Thanh toan dich vu Thay lốp xe dream va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_68_03111252', '00', 'success'),
(132, 69, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_69_03141430', '00', 'success'),
(133, 70, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_70_03190309', '00', 'success'),
(134, 71, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_71_03190601', '00', 'success'),
(135, 72, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_72_03204119', '00', 'success'),
(136, 73, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_73_03204311', '00', 'success'),
(137, 74, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_74_10115536', '00', 'success'),
(138, 75, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_75_10115544', '00', 'success'),
(139, 76, '2024-12-05 23:45:53', 'vnpay', 150000, 'Thanh toan dich vu Thay xích xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_76_11000446', '00', 'success'),
(140, 77, '2024-12-05 23:45:53', 'vnpay', 100000, 'Thanh toan dich vu Thay lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_77_13013003', '00', 'success'),
(141, 78, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_78_13013337', '00', 'success'),
(142, 79, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_79_13113442', '00', 'success'),
(143, 80, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_80_13113512', '00', 'success'),
(144, 81, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_81_13115501', '00', 'success'),
(145, 82, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_82_13155034', '00', 'success'),
(146, 83, '2024-12-05 23:45:53', 'vnpay', 100000, 'Thanh toan dich vu Thay lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_83_13155332', '00', 'success'),
(147, 84, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_84_13155459', '00', 'success'),
(148, 85, '2024-12-05 23:45:53', 'vnpay', 100000, 'Thanh toan dich vu Thay gương honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_85_13155515', '00', 'success'),
(149, 86, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_86_13234542', '00', 'success'),
(150, 87, '2024-12-05 23:45:53', 'vnpay', 100000, 'Thanh toan dich vu Thay yên xe xe honda, wave alpha, dream va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_87_13235111', '00', 'success'),
(151, 88, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_88_16134109', '00', 'success'),
(152, 89, '2024-12-05 23:45:53', 'vnpay', 100000, 'Thanh toan dich vu Thay yên xe xe honda, wave alpha, dream va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_89_17122248', '00', 'success'),
(153, 90, '2024-12-05 23:45:53', 'vnpay', 120000, 'Thanh toan dich vu Thay phanh xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_90_17122417', '00', 'success'),
(154, 91, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Bảo dưỡng định kỳ xe honda, dream, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_91_17122442', '00', 'success'),
(155, 92, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Bảo dưỡng định kỳ xe honda, dream, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_92_17122520', '00', 'success'),
(156, 93, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_93_17212729', '00', 'success'),
(157, 94, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_94_17215826', '00', 'success'),
(158, 95, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_95_17220015', '00', 'success'),
(159, 96, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_96_17220120', '00', 'success'),
(160, 97, '2024-12-05 23:45:53', 'vnpay', 864000, 'Thanh toan dich vu Cấp cứu xe chết máy do ngập nước va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_97_17220243', '00', 'success'),
(161, 98, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_98_23215545', '00', 'success'),
(162, 99, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_99_23215821', '00', 'success'),
(163, 100, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_100_23220116', '00', 'success'),
(164, 101, '2024-12-05 23:45:53', 'vnpay', 80000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_101_23220139', '00', 'success'),
(165, 102, '2024-12-05 23:45:53', 'vnpay', 1740000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_102_23220345', '00', 'success'),
(166, 103, '2024-12-05 23:45:53', 'vnpay', 1080000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_103_24005507', '00', 'success'),
(167, 104, '2024-12-05 23:45:53', 'vnpay', 735000, 'Thanh toan dich vu Thay nhớt cho xe honda va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_104_24131051', '00', 'success'),
(168, 105, '2024-12-05 23:45:53', 'vnpay', 500000, 'Thanh toan dich vu Vá lốp xe honda, wave alpha va cac san pham di kem', 'NCB', 'VNP147110123', '147110123', 'GIAODICH_105_24155617', '00', 'success'),
(210, 154, '2024-12-05 23:45:53', 'vnpay', 920000, 'Thanh toán dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha va cac san pham dat cung', 'NCB', 'VNP14710884', '14710884', 'GIAODICH_154_01114804', '00', 'success'),
(236, 209, '2024-12-09 18:50:16', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14731891', '14731891', 'GIAODICH_209_20241209184930', '00', 'success'),
(237, 210, '2024-12-09 18:51:03', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_210_20241209185103', '', 'pending'),
(238, 211, '2024-12-09 18:51:40', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14731893', '14731893', 'GIAODICH_211_20241209185117', '00', 'success'),
(239, 212, '2024-12-09 18:53:28', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14731897', '14731897', 'GIAODICH_212_20241209185240', '00', 'success'),
(240, 213, '2024-12-09 18:54:30', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14731900', '14731900', 'GIAODICH_213_20241209185406', '00', 'success'),
(241, 214, '2024-12-09 18:58:26', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14731909', '14731909', 'GIAODICH_214_20241209185803', '00', 'success'),
(242, 214, '2024-12-09 19:01:08', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241209190108', '', 'pending'),
(243, 215, '2024-12-09 21:25:54', 'vnpay', 120000, 'Thanh toán dịch vụ Kiểm tra và sửa hệ thống đèn xe Lead và các sản phẩm đặt cùng', 'NCB', 'VNP14732170', '14732170', 'GIAODICH_215_20241209212510', '00', 'success'),
(244, 214, '2024-12-10 23:06:13', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230613', '', 'pending'),
(245, 214, '2024-12-10 23:07:07', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230707', '', 'pending'),
(246, 214, '2024-12-10 23:07:09', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230709', '', 'pending'),
(247, 214, '2024-12-10 23:07:09', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230709', '', 'pending'),
(248, 214, '2024-12-10 23:07:10', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230710', '', 'pending'),
(249, 214, '2024-12-10 23:07:11', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_214_20241210230711', '', 'pending'),
(250, 220, '2024-12-15 00:11:24', 'vnpay', 620000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14744985', '14744985', 'GIAODICH_220_20241215000906', '00', 'success'),
(251, 221, '2024-12-15 00:33:06', 'vnpay', 620000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745018', '14745018', 'GIAODICH_221_20241215003221', '00', 'success'),
(252, 219, '2024-12-15 00:49:32', 'vnpay', 500000, 'Thanh toán dịch vụ Vá lốp xe honda, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14745051', '14745051', 'GIAODICH_219_20241215004910', '00', 'success'),
(253, 223, '2024-12-15 00:54:06', 'vnpay', 620000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745057', '14745057', 'GIAODICH_223_20241215005338', '00', 'success'),
(254, 224, '2024-12-15 00:59:12', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_224_20241215005912', '', 'pending'),
(258, 227, '2024-12-15 01:21:46', 'vnpay', 500000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745093', '14745093', 'GIAODICH_227_20241215012122', '00', 'success'),
(260, 228, '2024-12-15 01:52:48', 'vnpay', 620000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745132', '14745132', 'GIAODICH_228_20241215015140', '00', 'success'),
(261, 229, '2024-12-15 02:00:05', 'vnpay', 869000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745143', '14745143', 'GIAODICH_229_20241215015935', '00', 'success'),
(262, 230, '2024-12-15 11:48:25', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_230_20241215114825', '', 'pending'),
(263, 231, '2024-12-15 12:06:45', 'vnpay', 759000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14745500', '14745500', 'GIAODICH_231_20241215114844', '00', 'success'),
(264, 232, '2024-12-15 11:49:03', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_232_20241215114903', '', 'pending'),
(265, 233, '2024-12-15 17:03:21', 'vnpay', 760000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14746154', '14746154', 'GIAODICH_233_20241215170254', '00', 'success'),
(266, 234, '2024-12-15 17:11:31', 'vnpay', 630000, 'Thanh toán dịch vụ Thay nhớt cho xe honda và các sản phẩm đặt cùng', 'NCB', 'VNP14746173', '14746173', 'GIAODICH_234_20241215171108', '00', 'success'),
(267, 235, '2024-12-17 13:36:16', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_235_20241217133616', '', 'pending'),
(269, 235, '2024-12-17 14:10:48', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_235_20241217141048', '', 'pending'),
(270, 235, '2024-12-17 14:15:10', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_235_20241217141510', '', 'pending'),
(271, 235, '2024-12-17 14:23:18', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_235_20241217142318', '', 'pending'),
(272, 235, '2024-12-17 14:27:32', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_235_20241217142732', '', 'pending'),
(273, 236, '2024-12-17 14:31:23', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_236_20241217143123', '', 'pending'),
(274, 237, '2024-12-17 14:35:29', '', 0, NULL, NULL, NULL, NULL, 'GIAODICH_237_20241217143529', '', 'pending'),
(275, 237, '2024-12-17 14:39:30', 'vnpay', 1170000, 'Thanh toán dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14751253', '14751253', 'GIAODICH_237_20241217143835', '00', 'success'),
(276, 236, '2024-12-17 14:40:35', 'vnpay', 1170000, 'Thanh toán dịch vụ Bảo dưỡng định kỳ xe honda, dream, wave alpha và các sản phẩm đặt cùng', 'NCB', 'VNP14751259', '14751259', 'GIAODICH_236_20241217144013', '00', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` int(11) NOT NULL,
  `estimated_time` time NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `active` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `category_id`, `name`, `description`, `price`, `estimated_time`, `image_url`, `active`) VALUES
(1, 1, 'Thay nhớt cho xe honda', 'Đảm bảo động cơ xe Honda của bạn luôn vận hành êm ái với dịch vụ thay nhớt tận nơi.\r\nChúng tôi sử dụng dầu nhớt chất lượng cao, được khuyến nghị bởi nhà sản xuất, giúp:\r\n- Tăng tuổi thọ động cơ,\r\n- Cải thiện hiệu suất vận hành,\r\n- Giảm nhiệt và ma sát trong quá trình hoạt động.\r\nHãy đặt lịch ngay để trải nghiệm dịch vụ tiện lợi và an toàn cho xe của bạn.', 100000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201496/repairshopp/uploads/hhadt6j4ykue0z0fjqok.webp', 1),
(2, 2, 'Cấp cứu xe chết máy do ngập nước', 'Xe chết máy do ngập nước? Đừng lo lắng! Dịch vụ cứu hộ của chúng tôi sẽ giúp bạn xử lý sự cố nhanh chóng:\r\n- Hút nước ra khỏi động cơ và hệ thống xăng,\r\n- Kiểm tra và sửa chữa các linh kiện bị ảnh hưởng,\r\n- Khôi phục xe về trạng thái vận hành an toàn.\r\nKỹ thuật viên sẽ đến tận nơi, đảm bảo xử lý triệt để và tiết kiệm thời gian cho bạn.', 500000, '05:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201475/repairshopp/uploads/k2morc6bccefvuqb9kws.webp', 1),
(7, 2, 'Thay lốp xe honda, wave alpha', 'Đừng để sự cố thủng lốp làm gián đoạn hành trình của bạn!\r\nChúng tôi cung cấp dịch vụ vá lốp tận nơi với:\r\n- Thiết bị hiện đại, đảm bảo không gây hư hại lốp,\r\n- Thời gian xử lý nhanh chóng, chỉ trong vài phút,\r\n- Phương pháp vá chuyên nghiệp, đảm bảo bền và an toàn khi di chuyển.\r\nLiên hệ ngay để có giải pháp cứu hộ xe nhanh chóng.', 80000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201506/repairshopp/uploads/hzhzy8z6zpgr2ddfifzt.webp', 1),
(8, 4, 'Thay lốp xe honda, wave alpha', 'Dịch vụ thay lốp chuyên nghiệp giúp bạn nhanh chóng tiếp tục hành trình mà không lo sự cố lốp hỏng.\r\nChúng tôi thay lốp tại chỗ với:\r\n- Lốp chất lượng cao, phù hợp với nhiều dòng xe,\r\n- Quy trình thay lốp nhanh chóng, hiệu quả,\r\n- Sử dụng thiết bị hiện đại để bảo đảm lốp mới được gắn chính xác và an toàn.', 100000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201502/repairshopp/uploads/emovv56dw1eodnzt0rcx.webp', 1),
(10, 4, 'Thay bánh xe honda', 'Khi bánh xe bị hư hỏng hoặc không còn khả năng vận hành tốt, dịch vụ thay bánh xe của chúng tôi sẽ giúp bạn nhanh chóng thay thế tại chỗ.\nChúng tôi cung cấp:\n- Bánh xe phù hợp với các dòng xe phổ biến,\n- Kỹ thuật viên chuyên nghiệp thay bánh xe nhanh chóng,\n- Đảm bảo an toàn và chất lượng cho bánh xe mới.', 200000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201503/repairshopp/uploads/vxnwgwp7jlshtn1jwf9y.webp', 1),
(11, 4, 'Thay gương honda, wave alpha', 'Dịch vụ thay gương xe tận nơi giúp bạn khôi phục sự an toàn khi di chuyển.\r\nChúng tôi thay gương với:\r\n- Gương xe chính hãng, bền bỉ và rõ nét,\r\n- Lắp đặt gương xe nhanh chóng và chính xác,\r\n- Cam kết bảo vệ tầm nhìn của bạn khi lái xe.', 100000, '00:10:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201526/repairshopp/uploads/saulkejvvdb2cickip8q.webp', 1),
(12, 4, 'Thay xích xe honda, wave alpha', 'Dịch vụ thay xích xe của chúng tôi sẽ giúp xe của bạn luôn vận hành mượt mà và an toàn.\r\nChúng tôi thay xích với:\r\n- Xích xe chất lượng cao,\r\n- Đảm bảo đúng tiêu chuẩn và phù hợp với dòng xe của bạn,\r\n- Quy trình thay xích nhanh chóng, không làm gián đoạn lịch trình của bạn.', 150000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201504/repairshopp/uploads/owgzc8ehl34zda82c9mt.webp', 1),
(13, 4, 'Thay yên xe xe honda, wave alpha, dream', 'Dịch vụ thay yên xe giúp bạn thay thế yên xe cũ hoặc bị hỏng để tiếp tục hành trình thoải mái.\nChúng tôi thay yên xe với:\n- Yên xe phù hợp với nhiều loại xe,\n- Lắp đặt yên xe chính xác và chắc chắn,\n- Chất liệu yên xe thoải mái, chịu được thời gian sử dụng lâu dài.', 100000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201505/repairshopp/uploads/t1fdg92syaw7mogu9n0n.webp', 1),
(14, 4, 'Thay phanh xe honda, wave alpha', 'Thay phanh là dịch vụ cần thiết để đảm bảo an toàn cho bạn khi lái xe.\nChúng tôi thay phanh với:\n- Phanh xe chất lượng cao,\n- Đảm bảo phanh xe hoạt động tốt, an toàn,\n- Quy trình thay phanh nhanh chóng và hiệu quả.', 120000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201482/repairshopp/uploads/lrx5fi1isaqoyj0dvjqs.webp', 1),
(20, 1, 'Bảo dưỡng định kỳ xe honda, dream, wave alpha', 'Bảo dưỡng định kỳ giúp xe của bạn hoạt động ổn định và bền bỉ hơn.\nDịch vụ bảo dưỡng định kỳ bao gồm:\n- Kiểm tra toàn diện các bộ phận của xe,\n- Thay thế các linh kiện cần thiết,\n- Điều chỉnh và làm sạch các bộ phận của xe.\nHãy đặt lịch bảo dưỡng định kỳ để xe luôn hoạt động như mới.', 500000, '05:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201493/repairshopp/uploads/j0ueypwziy7cyfxpc35o.webp', 1),
(21, 1, 'Bảo dưỡng xe honda', 'Bảo dưỡng xe Honda giúp bạn duy trì hiệu suất và tuổi thọ của xe Honda.\r\nChúng tôi cung cấp dịch vụ bảo dưỡng chuyên sâu cho xe Honda với:\r\n- Kiểm tra và thay thế nhớt động cơ,\r\n- Kiểm tra và thay thế bộ lọc gió, lọc dầu,\r\n- Điều chỉnh hệ thống phanh, lốp, và động cơ.\r\nXe Honda của bạn sẽ luôn sẵn sàng cho mọi chuyến đi.', 500000, '05:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201487/repairshopp/uploads/jzzvf64jadlzxn4t9qfx.webp', 1),
(22, 4, 'Thay lốp xe wave alpha', 'Dịch vụ thay lốp xe Wave Alpha giúp bạn dễ dàng tiếp tục hành trình khi gặp sự cố với lốp xe.\r\nChúng tôi cung cấp:\r\n- Lốp chính hãng cho xe Wave Alpha,\r\n- Quy trình thay lốp nhanh chóng,\r\n- Thiết bị hiện đại để thay lốp chính xác và hiệu quả.', 100000, '01:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201485/repairshopp/uploads/gcvu5xvpjqjyn5qw65hj.webp', 1),
(23, 4, 'Thay lốp xe dream', 'Thay lốp xe Dream là dịch vụ quan trọng giúp đảm bảo an toàn khi lái xe.\nChúng tôi thay lốp xe Dream với:\n- Lốp chính hãng, phù hợp với dòng xe Dream,\n- Thời gian thay lốp nhanh chóng,\n- Đảm bảo lốp mới được gắn đúng cách và an toàn.', 110000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201473/repairshopp/uploads/kz0mvphbsu1pkqh9xsyo.webp', 1),
(25, 4, 'Thay bánh xe honda suzuki', 'Dịch vụ thay bánh xe Honda Suzuki giúp xe của bạn hoạt động tốt hơn sau khi gặp sự cố bánh xe.\r\nChúng tôi thay bánh xe với:\r\n- Bánh xe chất lượng cao, phù hợp với dòng xe Honda và Suzuki,\r\n- Kỹ thuật viên chuyên nghiệp thực hiện thay bánh xe tận nơi,\r\n- Đảm bảo sự ổn định và an toàn cho xe.', 100000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201483/repairshopp/uploads/no5g3dvm78qfe1rbiikc.webp', 1),
(26, 2, 'Cấp cứu xe chết máy do ngập nước', 'Xe chết máy do ngập nước? Chúng tôi sẽ cứu hộ và xử lý sự cố ngay tại chỗ.\nDịch vụ của chúng tôi bao gồm:\n- Hút nước khỏi động cơ,\n- Kiểm tra và sửa chữa các bộ phận bị ảnh hưởng,\n- Khôi phục xe về trạng thái hoạt động tốt.\nĐội ngũ kỹ thuật viên sẽ đến tận nơi để giúp bạn.', 500000, '05:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201488/repairshopp/uploads/dgb8jkd96zx5jticxtbg.webp', 1),
(36, 1, 'Thay dầu động cơ Yamaha Grande', 'Đảm bảo động cơ xe Yamaha Grande của bạn luôn vận hành êm ái và bền bỉ với dịch vụ thay dầu tận nơi.\r\n\r\nChúng tôi sử dụng dầu động cơ chính hãng giúp bảo vệ động cơ khỏi tình trạng mài mòn và tăng hiệu suất vận hành.\r\n\r\n- Tăng tuổi thọ động cơ,\r\n\r\n- Cải thiện hiệu suất vận hành,\r\n\r\n- Giảm nhiệt và ma sát trong quá trình hoạt động.\r\n\r\nĐặt lịch ngay để xe của bạn luôn hoạt động ổn định và tiết kiệm nhiên liệu.', 350000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201507/repairshopp/uploads/tpwkdylvpptqgdahgqi2.webp', 1),
(37, 4, 'Thay bugi xe Honda SH', 'Bugi xe Honda SH là bộ phận quan trọng giúp xe khởi động dễ dàng và duy trì hiệu suất động cơ ổn định.\r\n\r\nDịch vụ thay bugi chính hãng sẽ giúp xe của bạn hoạt động mượt mà hơn và tiết kiệm nhiên liệu.\r\n\r\n- Cải thiện khả năng khởi động,\r\n\r\n- Giảm thiểu sự cố động cơ,\r\n\r\n- Tiết kiệm nhiên liệu.\r\n\r\nHãy đến và trải nghiệm dịch vụ thay bugi chất lượng cao ngay hôm nay.', 150000, '00:20:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201508/repairshopp/uploads/pbsnuk9lcqb0qq6hzy3r.webp', 1),
(38, 2, 'Cứu hộ xe chết máy Yamaha Nouvo', 'Khi xe Yamaha Nouvo gặp sự cố chết máy giữa đường, chúng tôi sẽ đến tận nơi hỗ trợ.\r\n\r\nDịch vụ cứu hộ chuyên nghiệp bao gồm sửa chữa động cơ và kéo xe về trung tâm bảo dưỡng.\r\n\r\n- Sửa chữa động cơ tại chỗ,\r\n\r\n- Kéo xe về trung tâm,\r\n\r\n- Tiết kiệm thời gian và công sức.\r\n\r\nĐảm bảo mọi sự cố sẽ được giải quyết nhanh chóng, giúp bạn tiếp tục hành trình mà không gặp gián đoạn.', 250000, '00:45:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201508/repairshopp/uploads/uvuphwklbu2lce8dejsd.webp', 1),
(39, 6, 'Rửa xe và bảo dưỡng sơn Honda Winner', 'Dịch vụ rửa xe chuyên nghiệp giúp xe Honda Winner của bạn luôn sạch sẽ.\r\n\r\nChúng tôi sử dụng các sản phẩm vệ sinh chất lượng cao và an toàn với bề mặt sơn xe.\r\n\r\n- Bảo vệ bề mặt sơn,\r\n\r\n- Duy trì độ bóng và sáng của xe,\r\n\r\n- Loại bỏ bụi bẩn và tác nhân gây hại từ môi trường.\r\n\r\nĐảm bảo xe của bạn không chỉ sạch mà còn được bảo vệ lâu dài.', 200000, '00:40:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201509/repairshopp/uploads/yspo1nupzpha64defzhb.webp', 1),
(40, 5, 'Sửa chữa khẩn cấp xe Vespa LX', 'Khi xe Vespa LX gặp sự cố khẩn cấp, chúng tôi sẽ cử nhân viên đến sửa chữa tại chỗ.\r\n\r\nDịch vụ này bao gồm sửa chữa các vấn đề nhỏ như chết máy, lỗi hệ thống điện.\r\n\r\n- Sửa chữa động cơ và hệ thống điện tại chỗ,\r\n\r\n- Kéo xe về trung tâm nếu cần thiết,\r\n\r\n- Tiết kiệm thời gian và giúp bạn tiếp tục di chuyển nhanh chóng.\r\n\r\nChúng tôi cam kết sẽ giúp bạn giải quyết vấn đề một cách nhanh chóng và an toàn.', 300000, '01:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201511/repairshopp/uploads/f3yn76hvgwhcglnmjaun.webp', 1),
(41, 3, 'Kiểm tra và sửa hệ thống đèn xe Lead', 'Hệ thống đèn chiếu sáng của xe Honda Lead rất quan trọng để đảm bảo an toàn khi di chuyển vào ban đêm.\r\n\r\nChúng tôi cung cấp dịch vụ kiểm tra và sửa chữa đèn xe, từ đèn pha đến đèn tín hiệu.\r\n\r\n- Kiểm tra và thay thế bóng đèn,\r\n\r\n- Sửa chữa các mạch điện liên quan đến đèn,\r\n\r\n- Đảm bảo hệ thống chiếu sáng hoạt động ổn định.\r\n\r\nHãy đến để đảm bảo ánh sáng rõ ràng và an toàn khi lái xe vào ban đêm.', 120000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201512/repairshopp/uploads/dwb9hreymfdydx7ncoq4.webp', 1),
(42, 1, 'Thay dầu động cơ xe Piaggio', 'Dịch vụ thay dầu động cơ chính hãng cho xe Piaggio giúp bảo vệ động cơ khỏi sự mài mòn và tăng hiệu suất vận hành.\r\n\r\nChúng tôi sử dụng dầu chất lượng cao, giúp xe của bạn luôn hoạt động trơn tru và tiết kiệm nhiên liệu.\r\n\r\n- Tăng hiệu suất động cơ,\r\n\r\n- Giảm ma sát và nhiệt độ động cơ,\r\n\r\n- Bảo vệ động cơ lâu dài.\r\n\r\nĐặt lịch ngay để xe của bạn luôn sẵn sàng cho hành trình tiếp theo.', 400000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201513/repairshopp/uploads/fdabanyt67hph0w6y5g6.webp', 1),
(43, 2, 'Cứu hộ xe chết máy xe Suzuki GSX', 'Chúng tôi cung cấp dịch vụ cứu hộ xe Suzuki GSX khi gặp sự cố chết máy, với đội ngũ chuyên nghiệp và thiết bị hỗ trợ sẵn sàng.\r\n\r\nDịch vụ này bao gồm sửa chữa tại chỗ và kéo xe về trung tâm bảo dưỡng.\r\n\r\n- Sửa chữa động cơ tại chỗ,\r\n\r\n- Kéo xe về trung tâm bảo dưỡng nếu cần thiết,\r\n\r\n- Hỗ trợ tận nơi giúp bạn tiếp tục hành trình nhanh chóng.\r\n\r\nĐảm bảo bạn sẽ không phải lo lắng về sự cố xe chết máy.', 500000, '01:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201514/repairshopp/uploads/dwjjceiaasy6mkdj1nhk.webp', 1),
(44, 4, 'Thay má phanh Yamaha Janus', 'Má phanh là bộ phận quan trọng đảm bảo an toàn khi lái xe.\r\n\r\nDịch vụ thay má phanh cho xe Yamaha Janus giúp cải thiện hiệu quả phanh và tăng độ an toàn khi lái xe.\r\n\r\n- Cải thiện khả năng phanh,\r\n\r\n- Giảm tiếng ồn khi phanh,\r\n\r\n- Tăng độ bền của má phanh.\r\n\r\nChúng tôi sử dụng má phanh chính hãng, giúp bạn lái xe an toàn hơn.', 180000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201515/repairshopp/uploads/d1uozcrf4nmcut3xtxxx.webp', 1),
(45, 5, 'Vá lốp xe Yamaha Mio tại chỗ', 'Dịch vụ vá lốp xe Yamaha Mio tại chỗ giúp bạn giải quyết vấn đề khi gặp sự cố về lốp.\r\n\r\nChúng tôi cung cấp dịch vụ vá lốp nhanh chóng và chất lượng, giúp bạn tiếp tục hành trình mà không phải lo lắng về sự cố lốp xe.\r\n\r\n- Vá lốp nhanh chóng,\r\n\r\n- Đảm bảo lốp bền bỉ và an toàn khi di chuyển,\r\n\r\n- Tiết kiệm thời gian cho bạn.\r\n\r\nHãy liên hệ với chúng tôi ngay để xử lý sự cố lốp xe của bạn.', 100000, '00:20:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201516/repairshopp/uploads/gheh8tpabz1u2o3rfh8a.webp', 1),
(46, 6, 'Rửa xe và bảo dưỡng sơn cho xe Honda SH', 'Đảm bảo xe Honda SH của bạn luôn sạch sẽ và sáng bóng với dịch vụ rửa xe chuyên nghiệp.\r\n\r\nChúng tôi sử dụng các sản phẩm vệ sinh chất lượng cao và an toàn với bề mặt sơn, giúp xe của bạn duy trì độ bóng lâu dài.\r\n\r\n- Loại bỏ bụi bẩn và chất bẩn bám trên xe,\r\n\r\n- Bảo vệ bề mặt sơn khỏi các tác nhân gây hại,\r\n\r\n- Giúp xe luôn sáng bóng và mới mẻ.\r\n\r\nHãy để chúng tôi chăm sóc xe của bạn, giúp bạn tự tin hơn khi lái xe trên phố.', 150000, '00:40:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201517/repairshopp/uploads/scrxn9s8irz374edetf4.webp', 1),
(47, 6, 'Làm bóng xe Honda CBR 150', 'Dịch vụ làm bóng xe Honda CBR 150 giúp xe của bạn luôn sáng bóng và bảo vệ bề mặt sơn khỏi các tác nhân từ môi trường.\r\n\r\nChúng tôi sử dụng các chất liệu đánh bóng cao cấp để bảo vệ và phục hồi vẻ đẹp của xe.\r\n\r\n- Làm bóng bề mặt sơn,\r\n\r\n- Bảo vệ sơn khỏi tia UV và nước mưa,\r\n\r\n- Tăng độ bóng và sáng cho xe.\r\n\r\nHãy để xe của bạn trở nên hoàn hảo hơn với dịch vụ làm bóng xe chất lượng cao của chúng tôi.', 250000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201518/repairshopp/uploads/qbvhssgbk7x8nbity85c.webp', 1),
(48, 6, 'Làm đẹp và bảo dưỡng bề mặt xe Piaggio Liberty', 'Dịch vụ làm đẹp và bảo dưỡng bề mặt xe Piaggio Liberty giúp xe luôn sáng bóng và bảo vệ lớp sơn khỏi sự mài mòn.\n\r\nChúng tôi sử dụng sản phẩm chăm sóc xe cao cấp để phục hồi và bảo vệ xe của bạn.\n\r\n- Rửa sạch xe,\n\r\n- Đánh bóng và bảo vệ lớp sơn,\n\r\n- Loại bỏ bụi bẩn và vết bẩn cứng đầu.\n\r\nĐặt lịch ngay để xe của bạn luôn trong trạng thái tốt nhất.', 200000, '00:40:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201518/repairshopp/uploads/qbvhssgbk7x8nbity85c.webp', 1),
(49, 6, 'Đánh bóng xe Yamaha Exciter', 'Đánh bóng xe Yamaha Exciter giúp xe của bạn trở nên sáng bóng, như mới, và bảo vệ lớp sơn khỏi các tác nhân từ môi trường.\n\r\nDịch vụ này bao gồm việc sử dụng các loại chất đánh bóng chuyên dụng để phục hồi độ sáng bóng của xe.\n\r\n- Đánh bóng bề mặt sơn,\n\r\n- Loại bỏ vết trầy xước nhỏ,\n\r\n- Bảo vệ lớp sơn khỏi bụi bẩn và nước mưa.\n\r\nĐảm bảo xe của bạn luôn sáng bóng và như mới.', 180000, '00:30:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201518/repairshopp/uploads/qbvhssgbk7x8nbity85c.webp', 1),
(50, 6, 'Chăm sóc nội thất xe Honda CRV', 'Dịch vụ chăm sóc nội thất xe Honda CRV giúp nội thất xe của bạn luôn sạch sẽ và thơm mát.\r\n\r\nChúng tôi làm sạch và bảo dưỡng ghế da, các bộ phận nội thất và khử mùi hiệu quả.\r\n\r\n- Làm sạch ghế da,\r\n\r\n- Bảo dưỡng các bộ phận nội thất,\r\n\r\n- Khử mùi hôi và tạo mùi thơm dễ chịu cho xe.\r\n\r\nGiúp xe của bạn luôn tươi mới và tạo không gian thoải mái cho bạn và gia đình.', 220000, '01:00:00', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201519/repairshopp/uploads/idpcmoc2wgiirjvnzhcq.webp', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services_items`
--

CREATE TABLE `services_items` (
  `service_id` int(30) NOT NULL,
  `item_id` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services_items`
--

INSERT INTO `services_items` (`service_id`, `item_id`) VALUES
(0, 4),
(0, 5),
(0, 7),
(1, 2),
(1, 6),
(1, 7),
(1, 8),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(3, 2),
(7, 4),
(7, 5),
(7, 7),
(7, 9),
(12, 3),
(12, 7),
(12, 8),
(12, 9),
(12, 10),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(20, 5),
(20, 8),
(20, 9),
(20, 10),
(36, 1),
(36, 2),
(42, 1),
(42, 2);

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`id`, `name`, `description`) VALUES
(1, 'Bảo dưỡng', 'Dịch vụ thay dầu, kiểm tra lọc gió, lọc dầu, nước làm mát, hệ thống phanh và lốp.'),
(2, 'Cứu hộ', 'Dịch vụ sửa chữa động cơ, hệ thống treo, hệ thống lái và hệ thống truyền động.'),
(3, 'Sửa chữa điện và điện tử', 'Dịch vụ sửa chữa hệ thống đèn chiếu sáng, âm thanh, điều hòa không khí và các hệ thống cảm biến.'),
(4, 'Thay thế phụ tùng', 'Dịch vụ thay lốp, bình ắc quy, bugi và phanh.'),
(5, 'Sửa chữa khẩn cấp', 'Dịch vụ sửa chữa tại chỗ các sự cố nhỏ và kéo xe về xưởng sửa chữa.'),
(6, 'Chăm sóc và làm đẹp xe', 'Dịch vụ rửa xe, đánh bóng và bảo dưỡng bề mặt sơn, vệ sinh nội thất và phủ gầm.');

-- --------------------------------------------------------

--
-- Table structure for table `service_motorcycles`
--

CREATE TABLE `service_motorcycles` (
  `service_id` int(11) NOT NULL,
  `motorcycle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_motorcycles`
--

INSERT INTO `service_motorcycles` (`service_id`, `motorcycle_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 4),
(2, 6),
(2, 9),
(7, 2),
(8, 3),
(10, 5),
(11, 7),
(12, 8),
(20, 1),
(20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `service_stations`
--

CREATE TABLE `service_stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_stations`
--

INSERT INTO `service_stations` (`id`, `name`, `address_id`) VALUES
(1, 'Trạm sửa chữa Quận Bình Thạnh', 63),
(2, 'Trạm sửa chữa Quận 12 A', 161),
(3, 'Trạm sửa chữa quận 12C', 145),
(9, 'Trạm sửa chữa quận 12', 152),
(10, 'Trạm dịch vụ Quận 9', 181);

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthday` date DEFAULT '2000-01-01',
  `image_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `station_id` int(11) NOT NULL,
  `active` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staffs`
--

INSERT INTO `staffs` (`id`, `username`, `password`, `firstname`, `lastname`, `birthday`, `image_url`, `email`, `phone`, `created_at`, `station_id`, `active`) VALUES
(1, 'staff', '$2b$10$59okxEQ.g7EL8MBvHzo9ZuG8.ilPRdomwvfOfxteGNep/9paS472q', 'Hoàng Ngọc', 'Nguyễn Văn', '2002-01-15', NULL, 'test@gmail.com', '0523927155', '2024-06-26 15:55:52', 9, 1),
(10, 'staff2', '$2b$10$0c2mV5VuL7FXW7EC4fkqg.2STRPzBfzlSc0WZx4JFzTmASExeYhlS', 'Thi Hoa', 'Phạm', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-07 00:41:58', 1, 1),
(11, 'staff3', '$2b$10$ZHaigdvpdOgPwTWoeOu/j.7YhBiOjYWOCPdko5QGIaCYCn4Oa3jPi', 'Trung Khiêm', 'Doãn', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-10 00:53:11', 3, 1),
(12, 'staff12', '$2b$10$QAOLC.0QrlTpuT/SV5PL3eU9nMFkyfrk1CeoTMibjASVXkq6RguUa', 'Xuân Độ', 'Phùng', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-10 16:10:03', 2, 1),
(13, 'staff13', '$2b$10$8Viq7tvfx8e/LwgnNn7GUurb7i.BVVkQf/Lz6Mif5x9pTeHlkD5hO', 'Khắc Hải Đăng', 'Trần', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-10 16:54:13', 1, 1),
(14, 'staff4', '$2b$10$5SOY6NFgVgEgPPHpv7zb0erCXfpbiNUXCorfnY/RRM0WiDrqfGq1q', 'Thị Thu Thủy', 'Nguyễn', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-22 14:46:21', 2, 1),
(16, 'staff5', '$2b$10$CZPTuTn55KHEAren7ypEYu6GlNZODZu.lU4iWDPjnWvLb58BWepfi', 'Thuy Linh', 'Phạm', '2000-01-01', NULL, 'test5@gmail.com', NULL, '2024-07-22 14:51:31', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthday` date DEFAULT '2000-01-01',
  `image_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `active` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `birthday`, `image_url`, `email`, `address_id`, `phone`, `role`, `created_at`, `active`) VALUES
(1, 'admin', '$2b$10$FJRS3HYIfmWmxPRnDag9zOFNLJFrie3FKY3eyP4WwlrRY0c8yYEna', 'Toan aaaaa', 'Nguyen', '1999-01-03', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201562/repairshopp/uploads/cgbbajaxrimqce6kirmn.webp', 'toaltral1@gmail.com', 1, '0869352241', 'admin', '2025-05-02 16:30:16', 1),
(2, 'test', '$2b$10$SZTXgu1a4LVHPzs.4AlJYugyWnuBx0uCwDZNCG5uYx4hpT94xoBKG', 'Ngạn', ' Trần Văn', '2002-01-10', 'https://res.cloudinary.com/dprojbz3k/image/upload/v1746201555/repairshopp/uploads/amuaqmmi546ir8kl7gc2.webp', 'toaltral@gmail.com', 1, '0869352241', 'customer', '2025-05-02 16:30:16', 1),
(38, 'n20dcpt044', '$2b$10$7CmvBMuJ.UeECnQgEkCf2uVOHqFm2abrQDvNgqtMP52IdB7W3mK3i', 'tran', 'van ngan', '2000-01-01', NULL, 'test@gmail.com', NULL, '0869352241', 'customer', '2024-12-02 07:36:47', 1),
(39, 'linh', '$2b$10$SZTXgu1a4LVHPzs.4AlJYugyWnuBx0uCwDZNCG5uYx4hpT94xoBKG', 'Pham', 'Thuy Linh', '2000-01-01', NULL, 'toaltral2@gmail.com', NULL, '0869352241', 'customer', '2024-12-08 13:50:37', 1),
(177, 'test1', '$2b$10$qcPKzOktWdTjp/dhxCwNtOfdm08idisdjKqRG0CCHFm33Kfl3Zv1q', 'test', 'test', '2000-01-01', NULL, '', NULL, 'test', 'customer', '2024-11-24 09:25:19', 1),
(178, 'test2', '$2b$10$vlaPkujnZGACMzeEzYWoDu7invwiokX.T/t7hHY9uol12jKUxjD4.', 'test', 'test', '2000-01-01', NULL, '', NULL, 'shsh', 'customer', '2024-11-24 09:39:34', 1),
(179, 'test123', '$2b$10$1R.0/9Q.SE4J3HEqs9LQR.pxbd4SmJ6qNgNd1Ivz7H.DuTYkhqJRC', 'Hạ Linh', 'Trần', '2000-01-01', NULL, '', NULL, '0869352241', 'customer', '2024-11-25 15:34:03', 1),
(180, 'testtest', '$2b$10$uaaMp3ub2/DG9nzRwlQHz.f/cKmK/euluSqccrF23Z.kTuwh0eXoO', 'test', 'test', '2000-01-01', NULL, '', NULL, '0869352241', 'customer', '2024-12-09 10:22:34', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `bookings_ibfk_1` (`user_id`),
  ADD KEY `bookings_ibfk_4` (`staff_id`);

--
-- Indexes for table `bookings_items`
--
ALTER TABLE `bookings_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_id` (`booking_id`,`item_id`);

--
-- Indexes for table `bookings_items_temp`
--
ALTER TABLE `bookings_items_temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goong_map_addresses`
--
ALTER TABLE `goong_map_addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `input_info`
--
ALTER TABLE `input_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `motorcycles`
--
ALTER TABLE `motorcycles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `motorcycle_brands`
--
ALTER TABLE `motorcycle_brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outputs`
--
ALTER TABLE `outputs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `output_info`
--
ALTER TABLE `output_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `services_items`
--
ALTER TABLE `services_items`
  ADD PRIMARY KEY (`service_id`,`item_id`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `service_motorcycles`
--
ALTER TABLE `service_motorcycles`
  ADD PRIMARY KEY (`service_id`,`motorcycle_id`),
  ADD KEY `motorcycle_id` (`motorcycle_id`);

--
-- Indexes for table `service_stations`
--
ALTER TABLE `service_stations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `station_id` (`station_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `address_id` (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `bookings_items`
--
ALTER TABLE `bookings_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `bookings_items_temp`
--
ALTER TABLE `bookings_items_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `goong_map_addresses`
--
ALTER TABLE `goong_map_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT for table `inputs`
--
ALTER TABLE `inputs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `input_info`
--
ALTER TABLE `input_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `motorcycles`
--
ALTER TABLE `motorcycles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `motorcycle_brands`
--
ALTER TABLE `motorcycle_brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=491;

--
-- AUTO_INCREMENT for table `outputs`
--
ALTER TABLE `outputs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `output_info`
--
ALTER TABLE `output_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `service_stations`
--
ALTER TABLE `service_stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `goong_map_addresses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `motorcycles`
--
ALTER TABLE `motorcycles`
  ADD CONSTRAINT `motorcycles_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `motorcycle_brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `service_motorcycles`
--
ALTER TABLE `service_motorcycles`
  ADD CONSTRAINT `service_motorcycles_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `service_motorcycles_ibfk_2` FOREIGN KEY (`motorcycle_id`) REFERENCES `motorcycles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `service_stations`
--
ALTER TABLE `service_stations`
  ADD CONSTRAINT `service_stations_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `goong_map_addresses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `staffs`
--
ALTER TABLE `staffs`
  ADD CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`station_id`) REFERENCES `service_stations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`address_id`) REFERENCES `goong_map_addresses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
