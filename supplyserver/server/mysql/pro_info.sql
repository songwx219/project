SET NAMES UTF8;
SHOW DATABASES;

USE mproject;


DROP TABLE IF EXISTS `supply_order`;
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

SHOW TABLES;
