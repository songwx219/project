# Host: localhost  (Version: 5.5.53)
# Date: 2019-09-06 11:19:00
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "shop_user_consignee"
#

DROP TABLE IF EXISTS `shop_user_consignee`;
CREATE TABLE `shop_user_consignee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) NOT NULL,
  `name` varchar(8) NOT NULL,
  `phone` char(11) NOT NULL,
  `address` varchar(64) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "shop_user_consignee"
#

/*!40000 ALTER TABLE `shop_user_consignee` DISABLE KEYS */;
INSERT INTO `shop_user_consignee` VALUES (1,1,'张三','15789456123','河北省石家庄市裕华区万达写字楼24层203室',0),(2,1,'张大方','18745916235','河北省石家庄市裕华区万达写字楼24层203室',0),(3,2,'李四','14257863921','北京市东城区中山街道开心大厦',0),(4,2,'李四方','16234578794','北京市东城区中山街道开心大厦',0);
/*!40000 ALTER TABLE `shop_user_consignee` ENABLE KEYS */;

#
# Structure for table "shop_user_invoice"
#

DROP TABLE IF EXISTS `shop_user_invoice`;
CREATE TABLE `shop_user_invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) NOT NULL,
  `name` varchar(32) NOT NULL,
  `identifyno` char(32) NOT NULL,
  `address` varchar(64) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "shop_user_invoice"
#

/*!40000 ALTER TABLE `shop_user_invoice` DISABLE KEYS */;
INSERT INTO `shop_user_invoice` VALUES (1,1,'河北西哈哈科技有限公司','SFGWED4847814AS','河北省石家庄市裕华区万达写字楼12层101',0),(2,1,'河北笑盈盈科技有限公司','GEVRE78418EWDV87','河北省石家庄市裕华区万达写字楼24层203室',0),(3,2,'北京糊涂涂科技有限公司','SFGWED4847814AS','北京市东城区中山街道开心大厦',0),(4,2,'北京傻乎乎科技有限公司','GEVRE78418EWDV87','北京市东城区中山街道开心大厦',0);
/*!40000 ALTER TABLE `shop_user_invoice` ENABLE KEYS */;

#
# Structure for table "shop_user_reg"
#

DROP TABLE IF EXISTS `shop_user_reg`;
CREATE TABLE `shop_user_reg` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(8) NOT NULL,
  `upwd` varchar(16) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "shop_user_reg"
#

/*!40000 ALTER TABLE `shop_user_reg` DISABLE KEYS */;
INSERT INTO `shop_user_reg` VALUES (1,'张三','123456'),(2,'李四','123456'),(3,'王二','123456'),(4,'赵武','123456');
/*!40000 ALTER TABLE `shop_user_reg` ENABLE KEYS */;

#
# Structure for table "supply_order"
#

DROP TABLE IF EXISTS `supply_order`;
CREATE TABLE `supply_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderno` varchar(32) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `userid` smallint(6) NOT NULL DEFAULT '0',
  `aid` smallint(6) NOT NULL,
  `iid` smallint(6) DEFAULT NULL,
  `note` varchar(32) DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`userid`),
  KEY `aid` (`aid`),
  KEY `iid` (`iid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "supply_order"
#

/*!40000 ALTER TABLE `supply_order` DISABLE KEYS */;
INSERT INTO `supply_order` VALUES (1,'yft-zs-45845',1,1,1,1,'请尽快发货，谢谢！','2','2019-08-28 16:02:07'),(2,'ztn-sf-345832',1,1,2,1,'尽快发货，谢谢！','2','2019-08-28 16:04:35'),(3,'shz-st-23423',1,1,1,2,NULL,'1','2019-08-28 16:05:41'),(4,'saw-huh-458413',1,2,2,2,NULL,'1','2019-08-28 16:08:33');
/*!40000 ALTER TABLE `supply_order` ENABLE KEYS */;

#
# Structure for table "supply_order_item"
#

DROP TABLE IF EXISTS `supply_order_item`;
CREATE TABLE `supply_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `oid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `num` smallint(6) NOT NULL,
  `agreedPrice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for table "supply_order_item"
#

/*!40000 ALTER TABLE `supply_order_item` DISABLE KEYS */;
INSERT INTO `supply_order_item` VALUES (1,1,2,3,NULL),(2,1,3,4,NULL),(3,2,4,2,NULL),(4,2,1,3,NULL),(5,3,5,4,NULL);
/*!40000 ALTER TABLE `supply_order_item` ENABLE KEYS */;

#
# Structure for table "supply_pro_detail"
#

DROP TABLE IF EXISTS `supply_pro_detail`;
CREATE TABLE `supply_pro_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` smallint(6) NOT NULL,
  `img1` varchar(64) NOT NULL DEFAULT '/upload/user/default_pro.png',
  `img2` varchar(64) DEFAULT NULL,
  `img3` varchar(64) DEFAULT NULL,
  `img4` varchar(64) DEFAULT NULL,
  `img5` varchar(64) DEFAULT NULL,
  `message` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pid` (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "supply_pro_detail"
#

/*!40000 ALTER TABLE `supply_pro_detail` DISABLE KEYS */;
INSERT INTO `supply_pro_detail` VALUES (1,1,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'法兰西胎玫瑰，法兰西胎玫瑰法兰西胎玫瑰法兰西胎玫瑰法兰西胎玫瑰，法兰西胎玫瑰，法兰西胎玫瑰，法兰西胎玫瑰，法兰西胎玫瑰'),(2,2,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'菊博士胎菊，菊博士胎菊，菊博士胎菊菊博士胎菊菊博士胎菊菊博士胎菊'),(3,3,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'洛神仙子洛神花玫瑰茄，洛神仙子洛神花玫瑰茄，洛神仙子洛神花玫瑰茄洛神仙子洛神花玫瑰茄，洛神仙子洛神花玫瑰茄'),(4,4,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'平阴玫瑰花茶干玫瑰，平阴玫瑰花茶干玫瑰，平阴玫瑰花茶干玫瑰，平阴玫瑰花茶干玫瑰，平阴玫瑰花茶干玫瑰'),(5,5,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'浓香型茉莉花茶，浓香型茉莉花茶，浓香型茉莉花茶，浓香型茉莉花茶，浓香型茉莉花茶，浓香型茉莉花茶，浓香型茉莉花茶'),(6,6,'/upload/user/default_pro.png',NULL,NULL,NULL,NULL,'养生桂圆红枣枸杞茶，养生桂圆红枣枸杞茶，养生桂圆红枣枸杞茶，养生桂圆红枣枸杞茶，养生桂圆红枣枸杞茶');
/*!40000 ALTER TABLE `supply_pro_detail` ENABLE KEYS */;

#
# Structure for table "supply_pro_info"
#

DROP TABLE IF EXISTS `supply_pro_info`;
CREATE TABLE `supply_pro_info` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `supplyid` smallint(6) NOT NULL DEFAULT '0',
  `brandid` smallint(6) NOT NULL DEFAULT '0',
  `pname` varchar(64) NOT NULL,
  `artNo` varchar(12) NOT NULL,
  `specs` varchar(12) NOT NULL,
  `package` varchar(8) DEFAULT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `salePrice` decimal(10,2) DEFAULT NULL,
  `stock` smallint(6) NOT NULL DEFAULT '0',
  `status` char(1) DEFAULT '1',
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pname` (`pname`),
  KEY `sid` (`supplyid`),
  KEY `bid` (`brandid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

#
# Data for table "supply_pro_info"
#

/*!40000 ALTER TABLE `supply_pro_info` DISABLE KEYS */;
INSERT INTO `supply_pro_info` VALUES (1,1,1,'法兰西胎玫瑰','34524','80g','罐',25.00,23.00,500,'1','2019-08-28 15:13:56'),(2,1,1,'菊博士胎菊','45612','70g','包',22.00,20.00,300,'1','2019-08-28 15:13:43'),(3,1,1,'洛神仙子洛神花玫瑰茄','15644','45g','盒',32.00,28.00,30,'0','2019-08-28 15:15:48'),(4,1,2,'平阴玫瑰花茶干玫瑰','65485','80g','罐',30.00,29.00,455,'0','2019-08-28 15:17:12'),(5,1,2,'浓香型茉莉花茶','54158','70g','包',59.00,53.00,300,'1','2019-08-28 15:18:01'),(7,1,2,'养生桂圆红枣枸杞茶','15112','100g','盒',48.00,46.00,88,'1','2019-09-03 17:52:46');
/*!40000 ALTER TABLE `supply_pro_info` ENABLE KEYS */;

#
# Structure for table "supply_user_brand"
#

DROP TABLE IF EXISTS `supply_user_brand`;
CREATE TABLE `supply_user_brand` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` smallint(6) NOT NULL,
  `bname` varchar(16) NOT NULL DEFAULT '',
  `leval` char(4) NOT NULL,
  `zone` varchar(12) NOT NULL,
  `endTime` date DEFAULT '0000-00-00',
  `discount` decimal(3,2) NOT NULL DEFAULT '0.00',
  `status` char(1) DEFAULT '1',
  PRIMARY KEY (`bid`),
  UNIQUE KEY `bmane` (`bname`),
  KEY `sid` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "supply_user_brand"
#

/*!40000 ALTER TABLE `supply_user_brand` DISABLE KEYS */;
INSERT INTO `supply_user_brand` VALUES (1,1,'喜福德','一级代理','北京','2022-01-19',0.88,'1'),(2,1,'惠兴隆','一级代理','北京','2022-06-30',0.85,'1'),(3,2,'和富顺','一级代理','上海','2021-02-05',0.90,'1'),(4,2,'三清韵','一级代理','上海','2022-08-04',0.88,'1'),(5,1,'亦福堂','一级代理','北京','2024-02-07',0.80,'1'),(7,1,'乐开怀','二级代理','北京','2023-05-10',0.90,'1');
/*!40000 ALTER TABLE `supply_user_brand` ENABLE KEYS */;

#
# Structure for table "supply_user_infor"
#

DROP TABLE IF EXISTS `supply_user_infor`;
CREATE TABLE `supply_user_infor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` smallint(6) NOT NULL,
  `company` varchar(32) NOT NULL,
  `logo` varchar(64) DEFAULT '/upload/user/default_logo.png',
  `username` varchar(8) DEFAULT NULL,
  `phone` char(11) DEFAULT NULL,
  `tel` char(12) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `fax` varchar(16) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `status` char(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `company` (`company`),
  KEY `sid` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "supply_user_infor"
#

/*!40000 ALTER TABLE `supply_user_infor` DISABLE KEYS */;
INSERT INTO `supply_user_infor` VALUES (1,1,'北京是个啥科技有限公司','/upload/1567396623155logo.png','李菲菲1','15678945612','010-12345678','lifeifie@email.com','010-123456788','北京市丰台区南三环麦子街道幸福大厦1234室','1'),(2,2,'上海嗡嗡嗡技术有限公司','/upload/user/default_logo.png','王菲菲','15678942378','021-78945612','wengwengweng@mail.com','021-78945625','上海市浦东新区福山街道幸福大厦','0');
/*!40000 ALTER TABLE `supply_user_infor` ENABLE KEYS */;

#
# Structure for table "supply_user_message"
#

DROP TABLE IF EXISTS `supply_user_message`;
CREATE TABLE `supply_user_message` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `sid` smallint(6) NOT NULL,
  `title` varchar(32) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `creatTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `title` (`title`),
  KEY `sid` (`sid`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

#
# Data for table "supply_user_message"
#

/*!40000 ALTER TABLE `supply_user_message` DISABLE KEYS */;
INSERT INTO `supply_user_message` VALUES (1,1,'请尽快完善您的信息','恭喜您，注册成功啦，请尽快完善您的信息，以便及时上线您的产品进行销售！恭喜您，注册成功啦，请尽快完善您的信息，以便及时上线您的产品进行销售！恭喜您，注册成功啦，请尽快完善您的信息，以便及时上线您的产品进行销售！恭喜您，注册成功啦，请尽快完善您的信息，以便及时上线您的产品进行销售！','2019-08-28 14:52:42',1),(2,1,'您的商家信息正在审核中','您的基本信息已提交，我们会尽快问您审核，若有疑问可联系400-800-8080！您的基本信息已提交，我们会尽快问您审核，若有疑问可联系400-800-8080！您的基本信息已提交，我们会尽快问您审核，若有疑问可联系400-800-8080！','2019-08-28 14:54:32',1),(3,1,'您的基本信息已审核，赶快上传您的产品吧！','您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！您的信息我们已审核通过，您可至个人管理-商家信息中进行查看，现在您可以点击产品上传或者批量上传来上传产品啦！','2019-08-28 14:57:46',1),(4,1,'又有新订单啦，赶快来处理吧！','又有新订单啦，赶快来处理吧！又有新订单啦，赶快来处理吧！又有新订单啦，赶快来处理吧！又有新订单啦，赶快来处理吧！又有新订单啦，赶快来处理吧！又有新订单啦，赶快来处理吧！','2019-09-02 17:44:31',1),(5,1,'是又有新订单啦，赶快来处理吧！','是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！是又有新订单啦，赶快来处理吧！','2019-09-02 17:45:24',0),(6,1,'安庆又有新订单啦，赶快来处理吧！','安庆又有新订单啦，赶快来处理吧！安庆又有新订单啦，赶快来处理吧！安庆又有新订单啦，赶快来处理吧！安庆又有新订单啦，赶快来处理吧！安庆又有新订单啦，赶快来处理吧！','2019-09-02 17:46:02',0),(7,1,'而又有新订单啦，赶快来处理吧！','而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！而又有新订单啦，赶快来处理吧！','2019-09-02 17:46:22',0),(8,1,'撒打发又有新订单啦，赶快来处理吧！','撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！撒打发又有新订单啦，赶快来处理吧！','2019-09-02 17:46:38',0),(9,1,'大部分又有新订单啦，赶快来处理吧！','大部分又有新订单啦，赶快来处理吧！大部分又有新订单啦，赶快来处理吧！大部分又有新订单啦，赶快来处理吧！大部分又有新订单啦，赶快来处理吧！大部分又有新订单啦，赶快来处理吧！大部分又有新订单啦，赶快来处理吧！','2019-09-02 17:46:49',0),(10,1,'发的发的又有新订单啦，赶快来处理吧！','发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！发的发的又有新订单啦，赶快来处理吧！','2019-09-02 17:47:12',0),(11,1,'的vv又有新订单啦，赶快来处理吧！','的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！的vv又有新订单啦，赶快来处理吧！','2019-09-02 17:47:29',0),(12,1,'产品库存警告，尽快补货吧！','产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！产品库存警告，尽快补货吧！','2019-09-02 17:48:39',0),(13,1,'有新订单待处理','有新订单待处理有新订单待处理有新订单待处理有新订单待处理有新订单待处理有新订单待处理有新订单待处理','2019-09-02 17:49:37',0),(14,1,'无色发达的有新订单待处理','无色发达的有新订单待处理无色发达的有新订单待处理无色发达的有新订单待处理无色发达的有新订单待处理无色发达的有新订单待处理无色发达的有新订单待处理无色发达的有新订单待处理','2019-09-02 17:49:53',0),(15,1,'测试测试测试测试订单快处理！','测试测试测试测试订单快处理！测试测试测试测试订单快处理！测试测试测试测试订单快处理！测试测试测试测试订单快处理！测试测试测试测试订单快处理！测试测试测试测试订单快处理！测试测试测试测试订单快处理！','2019-09-02 17:50:16',0),(16,1,'警告！产品库存不足，请尽快补货！','警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！警告！产品库存不足，请尽快补货！','2019-09-02 17:50:48',0),(17,1,'有新订单，请尽快处理','有新订单，请尽快处理有新订单，请尽快处理有新订单，请尽快处理有新订单，请尽快处理有新订单，请尽快处理有新订单，请尽快处理有新订单，请尽快处理','2019-09-02 17:51:11',0),(18,1,'您的商家信息变更已通过','您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过您的商家信息变更已通过','2019-09-02 17:51:46',1),(19,1,'密码变更提示：请定期更换密码','密码变更提示：请定期更换密码密码变更提示：请定期更换密码密码变更提示：请定期更换密码密码变更提示：请定期更换密码密码变更提示：请定期更换密码密码变更提示：请定期更换密码','2019-09-02 17:52:24',1);
/*!40000 ALTER TABLE `supply_user_message` ENABLE KEYS */;

#
# Structure for table "supply_user_reg"
#

DROP TABLE IF EXISTS `supply_user_reg`;
CREATE TABLE `supply_user_reg` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) NOT NULL,
  `upwd` varchar(16) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "supply_user_reg"
#

/*!40000 ALTER TABLE `supply_user_reg` DISABLE KEYS */;
INSERT INTO `supply_user_reg` VALUES (1,'北京是个啥科技有限公司','12345'),(2,'上海嗡嗡嗡技术有限公司','123456');
/*!40000 ALTER TABLE `supply_user_reg` ENABLE KEYS */;
