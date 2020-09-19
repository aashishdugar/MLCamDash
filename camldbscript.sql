CREATE DATABASE  IF NOT EXISTS `caml` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `caml`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: caml
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `action` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `command` varchar(1024) DEFAULT NULL COMMENT 'ARRAY, BOOLEAN, DATETIME,FLOAT,NULL,STRING',
  `rule` bigint DEFAULT NULL,
  `eventtype` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_action_rule` (`rule`),
  KEY `fk_action_eventtype` (`eventtype`),
  CONSTRAINT `fk_action_eventtype` FOREIGN KEY (`eventtype`) REFERENCES `eventtype` (`id`),
  CONSTRAINT `fk_action_rule` FOREIGN KEY (`rule`) REFERENCES `rule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `line` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` bigint DEFAULT NULL,
  `zipcode` varchar(24) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_address_state` (`state`),
  CONSTRAINT `fk_address_state` FOREIGN KEY (`state`) REFERENCES `state` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appuser`
--

DROP TABLE IF EXISTS `appuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appuser`
--

LOCK TABLES `appuser` WRITE;
/*!40000 ALTER TABLE `appuser` DISABLE KEYS */;
INSERT INTO `appuser` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `appuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camera`
--

DROP TABLE IF EXISTS `camera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camera` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `manufacturer` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `specification` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `streamurl` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `space` bigint DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `image` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `device` bigint DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_camera_space` (`space`),
  KEY `uk_camera_status` (`status`),
  KEY `fk_camera_device` (`device`),
  CONSTRAINT `fk_camera_device` FOREIGN KEY (`device`) REFERENCES `device` (`id`),
  CONSTRAINT `fk_camera_space` FOREIGN KEY (`space`) REFERENCES `space` (`id`),
  CONSTRAINT `fk_camera_status` FOREIGN KEY (`status`) REFERENCES `camerastatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camera`
--

LOCK TABLES `camera` WRITE;
/*!40000 ALTER TABLE `camera` DISABLE KEYS */;
/*!40000 ALTER TABLE `camera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camerastatus`
--

DROP TABLE IF EXISTS `camerastatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camerastatus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_camerastatus_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camerastatus`
--

LOCK TABLES `camerastatus` WRITE;
/*!40000 ALTER TABLE `camerastatus` DISABLE KEYS */;
INSERT INTO `camerastatus` VALUES (1,'Active',NULL),(2,'In-Active',NULL),(3,'Installed',NULL);
/*!40000 ALTER TABLE `camerastatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configobject`
--

DROP TABLE IF EXISTS `configobject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configobject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `description` varchar(124) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configobject`
--

LOCK TABLES `configobject` WRITE;
/*!40000 ALTER TABLE `configobject` DISABLE KEYS */;
INSERT INTO `configobject` VALUES (1,'DensityConfig','Density Config '),(2,'SocialDistanceConfig','Social Distance Config '),(3,'IOCountingConfig','In/Out counting Config ');
/*!40000 ALTER TABLE `configobject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configobjectattribute`
--

DROP TABLE IF EXISTS `configobjectattribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configobjectattribute` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `datatype` bigint DEFAULT NULL,
  `configobject` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_DataObjectAttribute_dataobject` (`configobject`),
  KEY `fk_configobjectattribute_datatype` (`datatype`),
  CONSTRAINT `fk_configobjectattribute_datatype` FOREIGN KEY (`datatype`) REFERENCES `datatypes` (`id`),
  CONSTRAINT `fk_dataobjectattribute_dataobject` FOREIGN KEY (`configobject`) REFERENCES `configobject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configobjectattribute`
--

LOCK TABLES `configobjectattribute` WRITE;
/*!40000 ALTER TABLE `configobjectattribute` DISABLE KEYS */;
INSERT INTO `configobjectattribute` VALUES (1,'space_id',7,1),(2,'max_density',7,1),(3,'time_from',6,1),(4,'time_to',6,1),(5,'is_active',2,1),(6,'space_id',7,2),(7,'min_distance_in_ft',7,2),(8,'max_seconds_before_alert',7,2),(9,'time_from',6,2),(10,'time_to',6,2),(11,'is_active',2,2),(12,'space_id',7,3),(13,'in_out_boundary',6,3),(14,'in_direction',6,3),(15,'is_active',2,3);
/*!40000 ALTER TABLE `configobjectattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'India'),(2,'USA'),(3,'UAE');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datatypes`
--

DROP TABLE IF EXISTS `datatypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datatypes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datatypes`
--

LOCK TABLES `datatypes` WRITE;
/*!40000 ALTER TABLE `datatypes` DISABLE KEYS */;
INSERT INTO `datatypes` VALUES (1,'ARRAY'),(2,'BOOLEAN'),(3,'DATETIME'),(4,'FLOAT'),(5,'NULL'),(6,'STRING'),(7,'NUMBER');
/*!40000 ALTER TABLE `datatypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `manufacturer` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` blob COMMENT 'ICO Image',
  `ipaddress` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `uuid` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `type` bigint DEFAULT NULL,
  `image` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_device_type` (`type`),
  KEY `uk_device_status` (`status`),
  CONSTRAINT `fk_device_status` FOREIGN KEY (`status`) REFERENCES `devicestatus` (`id`),
  CONSTRAINT `fk_device_type` FOREIGN KEY (`type`) REFERENCES `devicetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicestatus`
--

DROP TABLE IF EXISTS `devicestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicestatus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_devicestatus_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicestatus`
--

LOCK TABLES `devicestatus` WRITE;
/*!40000 ALTER TABLE `devicestatus` DISABLE KEYS */;
INSERT INTO `devicestatus` VALUES (1,'Active',NULL),(2,'In-Active',NULL),(3,'Installed',NULL);
/*!40000 ALTER TABLE `devicestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicetype`
--

DROP TABLE IF EXISTS `devicetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicetype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_devicetype_status` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicetype`
--

LOCK TABLES `devicetype` WRITE;
/*!40000 ALTER TABLE `devicetype` DISABLE KEYS */;
INSERT INTO `devicetype` VALUES (1,'Active',NULL),(2,'In-Active',NULL),(3,'Installed ',NULL);
/*!40000 ALTER TABLE `devicetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimension`
--

DROP TABLE IF EXISTS `dimension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimension` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `x` double(10,2) DEFAULT '0.00',
  `y` double(10,2) DEFAULT '0.00',
  `height` double(10,2) DEFAULT '0.00',
  `width` double(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimension`
--

LOCK TABLES `dimension` WRITE;
/*!40000 ALTER TABLE `dimension` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimension` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `details` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `type` bigint DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `space` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_event_type` (`type`),
  KEY `uk_event_status` (`status`),
  KEY `uk_event_space` (`space`),
  CONSTRAINT `fk_event_camera` FOREIGN KEY (`space`) REFERENCES `space` (`id`),
  CONSTRAINT `fk_event_space` FOREIGN KEY (`type`) REFERENCES `eventtype` (`id`),
  CONSTRAINT `fk_event_status` FOREIGN KEY (`status`) REFERENCES `eventstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventstatus`
--

DROP TABLE IF EXISTS `eventstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventstatus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_eventstatus_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventstatus`
--

LOCK TABLES `eventstatus` WRITE;
/*!40000 ALTER TABLE `eventstatus` DISABLE KEYS */;
INSERT INTO `eventstatus` VALUES (1,'Created',NULL),(2,'Action Taken',NULL),(3,'Closed',NULL);
/*!40000 ALTER TABLE `eventstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventtype`
--

DROP TABLE IF EXISTS `eventtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventtype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_eventtype_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventtype`
--

LOCK TABLES `eventtype` WRITE;
/*!40000 ALTER TABLE `eventtype` DISABLE KEYS */;
INSERT INTO `eventtype` VALUES (1,'CURRENT_DENSITY','evt_current_density'),(2,'MAX_DENSITY_EXCEEDED','evt_max_density_exceeded'),(3,'SOCIAL_DISTANCE_VIOLATION','evt_social_distance_violation'),(4,'PERSON_ENTERED','evt_person_entered'),(5,'PERSON_EXITED','evt_person_exited'),(6,'SPACE_OCCUPANCY_CHANGED','evt_space_occupancy_changed');
/*!40000 ALTER TABLE `eventtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `graphtype`
--

DROP TABLE IF EXISTS `graphtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `graphtype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_graphtype_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `graphtype`
--

LOCK TABLES `graphtype` WRITE;
/*!40000 ALTER TABLE `graphtype` DISABLE KEYS */;
INSERT INTO `graphtype` VALUES (1,'Pie',NULL),(2,'Column',NULL),(3,'Area',NULL),(4,'Scatter ',NULL);
/*!40000 ALTER TABLE `graphtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringgraph`
--

DROP TABLE IF EXISTS `monitoringgraph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitoringgraph` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `query` varchar(1024) DEFAULT NULL,
  `posrow` double(10,2) DEFAULT '0.00',
  `poscol` double(10,2) DEFAULT '0.00',
  `sizex` double(10,2) DEFAULT '0.00',
  `sizey` double(10,2) DEFAULT '0.00',
  `type` bigint DEFAULT NULL,
  `criterias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_monitoringgraph_type` (`type`),
  CONSTRAINT `fk_monitoringgraph_type` FOREIGN KEY (`type`) REFERENCES `graphtype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringgraph`
--

LOCK TABLES `monitoringgraph` WRITE;
/*!40000 ALTER TABLE `monitoringgraph` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitoringgraph` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringwidget`
--

DROP TABLE IF EXISTS `monitoringwidget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitoringwidget` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `widgetquery` varchar(1024) DEFAULT NULL,
  `posrow` double(10,2) DEFAULT '0.00',
  `poscol` double(10,2) DEFAULT '0.00',
  `sizex` double(10,2) DEFAULT '0.00',
  `sizey` double(10,2) DEFAULT '0.00',
  `type` bigint DEFAULT NULL,
  `criterias` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_monitoringwidget_widgettype` (`type`),
  CONSTRAINT `fk_monitoringwidget_widgettype` FOREIGN KEY (`type`) REFERENCES `widgettype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringwidget`
--

LOCK TABLES `monitoringwidget` WRITE;
/*!40000 ALTER TABLE `monitoringwidget` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitoringwidget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operators`
--

DROP TABLE IF EXISTS `operators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operators` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `label` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operators`
--

LOCK TABLES `operators` WRITE;
/*!40000 ALTER TABLE `operators` DISABLE KEYS */;
INSERT INTO `operators` VALUES (1,'EQUAL TO','='),(2,'NOT EQUAL TO','!='),(3,'LESSER THAN','<'),(4,'GREATER THAN','>'),(5,'LESSER THAN OR EQUAL TO','<='),(6,'GREATER THAN OR EQUAL TO','>=');
/*!40000 ALTER TABLE `operators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rule`
--

DROP TABLE IF EXISTS `rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `definition` varchar(1024) DEFAULT NULL,
  `space` bigint DEFAULT NULL,
  `rulestatus` bigint DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rule_sace` (`space`),
  KEY `fk_rule_rulestatus` (`rulestatus`),
  CONSTRAINT `fk_rule_rulestatus` FOREIGN KEY (`rulestatus`) REFERENCES `rulestatus` (`id`),
  CONSTRAINT `fk_rule_sace` FOREIGN KEY (`space`) REFERENCES `space` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule`
--

LOCK TABLES `rule` WRITE;
/*!40000 ALTER TABLE `rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruleconfigobject`
--

DROP TABLE IF EXISTS `ruleconfigobject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruleconfigobject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `rule` bigint DEFAULT NULL,
  `configobject` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_ruledataobject_rule` (`rule`),
  KEY `uk_ruledataobject_dataobject` (`configobject`),
  CONSTRAINT `fk_ruledataobject_dataobject` FOREIGN KEY (`configobject`) REFERENCES `configobject` (`id`),
  CONSTRAINT `fk_ruledataobject_rule` FOREIGN KEY (`rule`) REFERENCES `rule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruleconfigobject`
--

LOCK TABLES `ruleconfigobject` WRITE;
/*!40000 ALTER TABLE `ruleconfigobject` DISABLE KEYS */;
/*!40000 ALTER TABLE `ruleconfigobject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rulestatus`
--

DROP TABLE IF EXISTS `rulestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rulestatus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_rulestatus_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rulestatus`
--

LOCK TABLES `rulestatus` WRITE;
/*!40000 ALTER TABLE `rulestatus` DISABLE KEYS */;
INSERT INTO `rulestatus` VALUES (1,'Active',NULL),(2,'In-Active',NULL),(3,'Created',NULL);
/*!40000 ALTER TABLE `rulestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `value` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space`
--

DROP TABLE IF EXISTS `space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` blob COMMENT 'ICO Image',
  `layout` blob COMMENT 'SVG Image',
  `address` bigint DEFAULT NULL,
  `parentspace` bigint DEFAULT NULL,
  `dimension` bigint DEFAULT NULL,
  `spacetype` bigint DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uk_space_spacetype` (`spacetype`),
  KEY `uk_space_building` (`parentspace`),
  KEY `uk_space_dimension` (`dimension`),
  KEY `uk_space_address` (`address`),
  CONSTRAINT `fk_space_address` FOREIGN KEY (`address`) REFERENCES `address` (`id`),
  CONSTRAINT `fk_space_dimension` FOREIGN KEY (`dimension`) REFERENCES `dimension` (`id`),
  CONSTRAINT `fk_space_parent` FOREIGN KEY (`parentspace`) REFERENCES `space` (`id`),
  CONSTRAINT `fk_space_spacetype` FOREIGN KEY (`spacetype`) REFERENCES `spacetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space`
--

LOCK TABLES `space` WRITE;
/*!40000 ALTER TABLE `space` DISABLE KEYS */;
/*!40000 ALTER TABLE `space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spacetype`
--

DROP TABLE IF EXISTS `spacetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spacetype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'GROUND, Building, Floor, SPACE',
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_widgettype_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spacetype`
--

LOCK TABLES `spacetype` WRITE;
/*!40000 ALTER TABLE `spacetype` DISABLE KEYS */;
INSERT INTO `spacetype` VALUES (1,'Building','Building Space'),(2,'Floor','Floor Space'),(3,'Ground','Ground Space'),(4,'Camera ','Camera  Space');
/*!40000 ALTER TABLE `spacetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `country` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_state_country` (`country`),
  CONSTRAINT `fk_state_country` FOREIGN KEY (`country`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4157 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Maharastra',1),(2,'UP',1),(3,'Alabama',2),(4,'Alaska',2);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widgettype`
--

DROP TABLE IF EXISTS `widgettype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `widgettype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_widgettype_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widgettype`
--

LOCK TABLES `widgettype` WRITE;
/*!40000 ALTER TABLE `widgettype` DISABLE KEYS */;
/*!40000 ALTER TABLE `widgettype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'caml'
--

--
-- Dumping routines for database 'caml'
--
/*!50003 DROP FUNCTION IF EXISTS `getpath` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getpath`(space_id INT) RETURNS text CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE res TEXT;
    CALL getpath(space_id, res);
    RETURN res;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getpath` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getpath`(IN space_id INT, OUT path TEXT)
BEGIN
    DECLARE currentid bigint(20);
    DECLARE spacename VARCHAR(20);
    DECLARE temppath TEXT;
    DECLARE tempparent INT;
    SET max_sp_recursion_depth = 255;
    SELECT id,name, parentspace FROM space WHERE id=space_id INTO currentid , spacename, tempparent;
    IF tempparent IS NULL
    THEN
        SET path = currentid ;
    ELSE
        CALL getpath(tempparent, temppath);
        SET path = CONCAT(temppath, '-', currentid );
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-29 10:36:08
