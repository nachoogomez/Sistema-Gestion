-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-10-2024 a las 00:39:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemagest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `payments`
--

INSERT INTO `payments` (`id`, `amount`, `date`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 1200.00, '2001-12-08 03:00:00', '2024-10-02 15:24:45', '2024-10-02 15:24:45', 3),
(2, 1300.00, '2001-12-08 03:00:00', '2024-10-02 15:25:22', '2024-10-02 15:25:22', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receipts`
--

CREATE TABLE `receipts` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rol` enum('superadmin','admin','user') NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `email`, `rol`, `createdAt`, `updatedAt`) VALUES
(1, 'prueba1', '$2b$10$tyZt4nEj9b9q6IiBPEFwreP4scLQrP/4TZ4Rdu6IfE4QJvl.2s7aq', 'prueba1@gmail.com', 'user', '2024-10-02 02:28:00', '2024-10-02 02:28:00'),
(2, 'prueba2', '$2b$10$f52c95/qeA1sKAPLzdIoIeOF.PCqtXShTov00b1aqQhEaOmcBNUFm', 'prueba2@gmail.com', 'user', '2024-10-02 03:20:13', '2024-10-02 03:20:13'),
(3, 'admin', '$2b$10$Dq4qzSnHkJ2ddojpyW9yIO8swULv0AtEqyM3tMlMYQhiCPdWb1NnW', 'prueba3@gmail.com', 'admin', '2024-10-02 03:22:20', '2024-10-02 03:22:20'),
(4, 'prueba4', '$2b$10$nc5OLf2Kjw3kVfELsL0V1ukRcW2pDXer/inGqxQhE.ulM6d6OzIne', 'prueba4@gmail.com', 'user', '2024-10-02 03:23:23', '2024-10-02 03:23:23'),
(5, 'superusuario', '$2b$10$a3A2vf8CCUDy/zuN0GNME.QylDQ8fq.UVr5dsR55zCFIz43.LVN0m', 'prueba5@gmail.com', 'superadmin', '2024-10-02 03:23:47', '2024-10-02 03:23:47'),
(6, 'testuser', '$2b$10$YbfZ66fnKB3CWc30bruqfuQiJJVZd/J7TdsQLkLtQvjhtGro.yB12', 'test@example.com', 'user', '2024-10-02 21:31:09', '2024-10-02 21:31:09');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paymentID` (`paymentID`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`paymentID`) REFERENCES `payments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
