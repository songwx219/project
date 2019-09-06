SET NAMES UTF8;
SHOW DATABASES;

DROP DATABASE IF EXISTS mproject;
CREATE DATABASE mproject CHARSET=UTF8;

USE mproject;

CREATE TABLE supply_user_reg(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32) UNIQUE NOT NULL,
    upwd VARCHAR(16) NOT NULL
);

CREATE TABLE supply_user_infor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    sid SMALLINT NOT NULL,
    company VARCHAR(32) UNIQUE NOT NULL,
    logo VARCHAR(64) DEFAULT '/upload/user/default_logo.png',
    phone CHAR(11),
    tel CHAR(12),
    email VARCHAR(32),
    fax  VARCHAR(16),
    address VARCHAR(64),
    FOREIGN KEY(sid) REFERENCES supply_user_reg(sid)
);
CREATE TABLE supply_user_brand(
    bid INT PRIMARY KEY AUTO_INCREMENT,
    sid SMALLINT NOT NULL,
    bmane VARCHAR(16) UNIQUE NOT NULL,
    leval CHAR(4) NOT NULL,
    zone VARCHAR(12) NOT NULL,
    endTime date NOT NULL,
    discount VARCHAR(32) NOT NULL,
    status  CHAR(1) default '1',
    FOREIGN KEY(sid) REFERENCES supply_user_reg(sid)
);
CREATE TABLE supply_user_message(
    mid INT PRIMARY KEY AUTO_INCREMENT,
    sid SMALLINT NOT NULL,
    title VARCHAR(32) UNIQUE NOT NULL,
    content VARCHAR(1000) NOT NULL,
    creatTime  timestamp NOT NULL default CURRENT_TIMESTAMP,
    status  BOOL default false,
    FOREIGN KEY(sid) REFERENCES supply_user_reg(sid)
);

CREATE TABLE supply_pro_info(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    sid SMALLINT NOT NULL,
    bid SMALLINT NOT NULL,
    pname VARCHAR(64) UNIQUE NOT NULL,
    artNo VARCHAR(12) NOT NULL,
    specs VARCHAR(12) NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    salePrice DECIMAL(10,2),
    status  CHAR(1) default '1',
    creatTime  timestamp NOT NULL default CURRENT_TIMESTAMP,
    FOREIGN KEY(sid) REFERENCES supply_user_reg(sid),
    FOREIGN KEY(bid) REFERENCES supply_user_brand(bid)
);

CREATE TABLE supply_pro_detail(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pid SMALLINT NOT NULL,
    img1  VARCHAR(64) NOT NULL DEFAULT '/upload/user/default_pro.png',
    img2  VARCHAR(64),
    img3  VARCHAR(64),
    img4  VARCHAR(64),
    img5  VARCHAR(64),
    message VARCHAR(2000),
    FOREIGN KEY(pid) REFERENCES supply_pro_info(pid)
);
CREATE TABLE supply_order(
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderno VARCHAR(32),
    sid INT NOT NULL,
    uid SMALLINT NOT NULL,
    aid SMALLINT NOT NULL,
    iid SMALLINT,
    note VARCHAR(32),
    status  CHAR(1) NOT NULL default '1',
    creatTime  timestamp NOT NULL default CURRENT_TIMESTAMP,
    FOREIGN KEY(sid) REFERENCES supply_user_reg(uid),
    FOREIGN KEY(uid) REFERENCES shop_user_reg(uid),
    FOREIGN KEY(aid) REFERENCES shop_user_consignee(id),
    FOREIGN KEY(iid) REFERENCES shop_order_invoice(id)
);

CREATE TABLE supply_order_item(
    id INT PRIMARY KEY AUTO_INCREMENT,
    oid INT NOT NULL,
    pid INT NOT NULL,
    num  SMALLINT NOT NULL,
    agreedPrice DECIMAL(10,2),
    FOREIGN KEY(pid) REFERENCES supply_pro_info(pid)
);
CREATE TABLE shop_user_reg(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(8) UNIQUE NOT NULL,
    upwd VARCHAR(16) NOT NULL
);
CREATE TABLE shop_user_consignee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid SMALLINT NOT NULL,
    name VARCHAR(8) NOT NULL,
    phone CHAR(11) NOT NULL,
    address VARCHAR(64) NOT NULL,
    status  BOOL NOT NULL default false,
    FOREIGN KEY(uid) REFERENCES shop_user_reg(uid)
);
CREATE TABLE shop_user_invoice(
    id INT PRIMARY KEY AUTO_INCREMENT,
    uid SMALLINT NOT NULL,
    name VARCHAR(32) NOT NULL,
    identifyno CHAR(32) NOT NULL,
    address VARCHAR(64),
    status  BOOL default false,
    FOREIGN KEY(uid) REFERENCES shop_user_reg(uid)
);

SHOW TABLES;
