-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.38-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para db_fly_van
CREATE DATABASE IF NOT EXISTS `db_fly_van` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_fly_van`;

-- Copiando estrutura para tabela db_fly_van.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `regiao` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cnpj` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.empresas: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` (`id`, `nome`, `regiao`, `email`, `senha`, `cnpj`, `whatsapp`, `created_at`, `updated_at`) VALUES
	(0, 'Autonomo', '...', '...', '...', '...', '...', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(1, 'Max Tour', 'Bragança e região', 'flyvan@maxtour.com.br', 'flyvan', '83.869.051/0001-81', '(11) 91132-1512', '2020-06-09 03:13:37', '2020-06-09 03:13:37'),
	(2, 'Giga Vans', 'São paulo SP, Campinas, Jundiaí', 'flyvan@gigavans.com.br', 'flyvan', '28.294.481/0001-04', '(11) 99889-3377', '2020-06-09 03:16:56', '2020-06-09 03:16:56');
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.list_paradas
CREATE TABLE IF NOT EXISTS `list_paradas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `passageiro_id` int(11) NOT NULL,
  `viagem_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `passageiro_id` (`passageiro_id`),
  KEY `viagem_id` (`viagem_id`),
  CONSTRAINT `list_paradas_ibfk_1` FOREIGN KEY (`passageiro_id`) REFERENCES `passageiros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `list_paradas_ibfk_2` FOREIGN KEY (`viagem_id`) REFERENCES `viagens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.list_paradas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `list_paradas` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_paradas` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.motoristas
CREATE TABLE IF NOT EXISTS `motoristas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) NOT NULL,
  `cod` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cnh` bigint(20) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_id` (`empresa_id`),
  CONSTRAINT `motoristas_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.motoristas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `motoristas` DISABLE KEYS */;
INSERT INTO `motoristas` (`id`, `empresa_id`, `nome`, `sobrenome`, `cod`, `email`, `senha`, `cnh`, `whatsapp`, `created_at`, `updated_at`) VALUES
	(1, 0, 'Wlington', 'Cleiton Machado', 'b5163503', 'seila@gmail.com', 'sounou', 12627311984, '(11) 91521-1320', '2020-06-11 04:22:52', '2020-06-11 04:22:52'),
	(2, 1, 'Bruno', 'André Iago Silva', '5802d604', 'brunoandreiagosilva@gmail.com', 'GnNwSTBwml', 59301603962, '(11) 98972-6592', '2020-06-11 22:46:33', '2020-06-11 22:46:33');
/*!40000 ALTER TABLE `motoristas` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.motorista_descricao
CREATE TABLE IF NOT EXISTS `motorista_descricao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `motorista_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `avaliacao` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `motorista_id` (`motorista_id`),
  CONSTRAINT `motorista_descricao_ibfk_1` FOREIGN KEY (`motorista_id`) REFERENCES `motoristas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.motorista_descricao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `motorista_descricao` DISABLE KEYS */;
/*!40000 ALTER TABLE `motorista_descricao` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.paradas
CREATE TABLE IF NOT EXISTS `paradas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `passageiro_id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `passageiro_id` (`passageiro_id`),
  CONSTRAINT `paradas_ibfk_1` FOREIGN KEY (`passageiro_id`) REFERENCES `passageiros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.paradas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `paradas` DISABLE KEYS */;
/*!40000 ALTER TABLE `paradas` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.passageiros
CREATE TABLE IF NOT EXISTS `passageiros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) NOT NULL,
  `cod` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.passageiros: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `passageiros` DISABLE KEYS */;
INSERT INTO `passageiros` (`id`, `nome`, `sobrenome`, `cod`, `email`, `senha`, `whatsapp`, `created_at`, `updated_at`) VALUES
	(2, 'Abner', 'Almeida Pedroso', '9292ee4c', 'abnerpedroso@gmail.com', 'bnão_arrasa_quarteirão', '(11) 99945-6326', '2020-06-09 02:06:31', '2020-06-09 02:06:31'),
	(4, 'Pedro', 'Augusto Gambirazi', '1dc5a88d', 'pedrogambirazi@gmail.com', 'pedrin', '(11) 99945-6356', '2020-06-09 02:16:38', '2020-06-09 02:16:38'),
	(5, 'Matheus', 'Penchiari', '10938768', 'matheuspenchiari@gmail.com', 'pench', '(11) 99975-6356', '2020-06-09 02:17:57', '2020-06-09 02:17:57');
/*!40000 ALTER TABLE `passageiros` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela db_fly_van.sequelizemeta: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20200528031522-create-passageiros.js'),
	('20200608162906-create-empresas.js'),
	('20200609031836-create-vans.js'),
	('20200611021816-create-viagens.js'),
	('20200611032037-create-motorista.js'),
	('20200612013330-create-paradas.js'),
	('20200612015601-create-list-paradas.js'),
	('20200612022212-create-van-descricao.js'),
	('20200612034413-create-motorista_descricao.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.vans
CREATE TABLE IF NOT EXISTS `vans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placa` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `ano` int(11) NOT NULL,
  `proprietario` int(11) NOT NULL,
  `id_proprietario` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.vans: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `vans` DISABLE KEYS */;
INSERT INTO `vans` (`id`, `placa`, `modelo`, `marca`, `ano`, `proprietario`, `id_proprietario`, `created_at`, `updated_at`) VALUES
	(1, 'ENH-9097', 'Sprinter Van', 'Mercedes-Benz', 2006, 0, 1, '2020-06-10 18:13:35', '2020-06-10 18:13:35');
/*!40000 ALTER TABLE `vans` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.van_descricao
CREATE TABLE IF NOT EXISTS `van_descricao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `van_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `van_id` (`van_id`),
  CONSTRAINT `van_descricao_ibfk_1` FOREIGN KEY (`van_id`) REFERENCES `vans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.van_descricao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `van_descricao` DISABLE KEYS */;
/*!40000 ALTER TABLE `van_descricao` ENABLE KEYS */;

-- Copiando estrutura para tabela db_fly_van.viagens
CREATE TABLE IF NOT EXISTS `viagens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `motorista_id` int(11) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `partida` varchar(255) NOT NULL,
  `destino` varchar(255) NOT NULL,
  `horario` time NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `motorista_id` (`motorista_id`),
  CONSTRAINT `viagens_ibfk_1` FOREIGN KEY (`motorista_id`) REFERENCES `motoristas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db_fly_van.viagens: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `viagens` DISABLE KEYS */;
/*!40000 ALTER TABLE `viagens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
