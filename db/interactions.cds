// namespace app.interactions;

using {Country} from '@sap/cds/common';

context app.interactions {

  type BusinessKey : String(10);
  type SDate       : DateTime;
  type LText       : String(1024);


  entity Interactions_Header {
    key ID        : Integer;
        ITEMS     : Composition of many Interactions_Items
                      on ITEMS.INTHeader = $self;
        PARTNER   : BusinessKey;
        LOG_DATE  : SDate;
        BPCOUNTRY : Country;

  };

  entity Interactions_Items {

    key INTHeader : Association to Interactions_Header;
    key TEXT_ID   : BusinessKey;
        LANGU     : String(2);
        LOGTEXT   : LText;
  };

  entity Interactions_Student {
    key ID          : Integer;
        NAME        : String;
        DATEOFBIRTH : String;
        CONTACT     : String;
        EMAIL       : String;
        ADDRESS     : String;
  };

  entity Interactions_Employee {
    key ID       : Integer;
        NAME     : String;
        DOJ      : String;
        ROLE     : String;
        COMPANYN : String;
        SKILLED  : String;
  };

  entity Interactions_Student_data {
    key ID          : Integer;
        NAME        : String;
        CONTACT     : Integer64;
        DATEOFBIRTH : String;
  };

  entity Sbp_info {
    key ID          : String;
        NAME        : String;
        DESIGNATION : String;
        TECH_F      : String;
        DOB         : String;
        CONTACT     : String;
        EMAIL       : String;
        ADDRESS     : String;
  }

  entity Interactions_Student_marks {
  key  ID    : Integer64;
    DATE  : String;
    MARKS : Integer;
  }

  entity Unique_ID_Header {

   key UNIQUE_ID   : Integer64;
    PRODUCT_ID  : String;
    UNIQUE_DESC : Integer64;
    UID_TYPE    : String;
    ACTIVE      : String;

  }

  entity Unique_ID_Header12 {

   key UNIQUE_ID   : Integer64;
    PRODUCT_ID  : String;
    UNIQUE_DESC : String;
    UID_TYPE    : String;
    ACTIVE      : Boolean;
  }

  entity Unique_ID_ITEM {

   key UNIQUE_ID   : Integer64;
    PRODUCT     : String;
    CHAR_NUM    : Integer64;
    CHAR_NUMVAL : String;
    NEW_VAL     : String;
  }

  entity CHARVAL_NUM {

   key CHAR_NUM        : Integer64;
    CHAR_NUMVAL     : String;
    CHARVAL_NUM     : String;
    CHAR_NUMVALDESC : String;
  }

  

  entity ORDER_DATA {
   key SEEDORDER         : String;
    PRODUCT           : String;
    UNIQUEID          : String;
    ORDERQUANTITY     : Integer64;
    MATERIALAVAILDATE : String;
    CREADTEDDATE      : String;
    CREATEDBY         : String;
  }


  entity CP_STAT_METHOD {
    key METHOD      : String(50);
        METHOD_DESC : String(200);
  }

  entity CP_STAT_METHOD_VAL {
    key METHOD       : String(50);
    key PARAM        : String(50);
        PARAM_DESC   : String(200);
        DATATYPE     : String;
        POSITION     : Integer;
        DEFAULTVALUE : String;
  }

  entity CP_STAT_PROFILE {
    key PROFILE      : String(50);
        PRF_DESC     : String(200);
        METHOD       : String(50);
        CREATED_DATE : Date;
        CREATED_BY   : String(12);
  }

  entity CP_STAT_PROFILE_VAL {
    key PROFILE     : String(50);
    key PARAM       : String(50);
        PARAM_VALUE : String(1000);

  }

  entity BOOKS_Vals {
    key BOOKID      : Integer64;
        BOOKNAME    : String;
        BOOKAUTHOR  : String;
        BOOKPUBDATE : String;
  }

  entity LOCATION_STB {
    key LOCATION_ID    : String(4);
        LOCATION_DESC  : String(30);
        LOCATION_TYPE  : String(1);
        RESERVE_FIELD1 : String(20);
        RESERVE_FIELD2 : String(20);
        RESERVE_FIELD3 : String(20);
        RESERVE_FIELD4 : String(20);
        RESERVE_FIELD5 : String(20);
        CHANGED_DATE   : Date;
        CHANGED_TIME   : Time;
        CHANGED_BY     : String(12);
        CREATED_DATE   : Date;
        CREATED_TIME   : Time;
        CREATED_BY     : String(12);
  }

  entity LOCATION {
    key LOCATION_ID    : String(4);
        LOCATION_DESC  : String(30);
        LOCATION_TYPE  : String(1);
        RESERVE_FIELD1 : String(20);
        RESERVE_FIELD2 : String(20);
        RESERVE_FIELD3 : String(20);
        RESERVE_FIELD4 : String(20);
        RESERVE_FIELD5 : String(20);
        CHANGED_DATE   : Date;
        CHANGED_TIME   : Time;
        CHANGED_BY     : String(12);
        CREATED_DATE   : Date;
        CREATED_TIME   : Time;
        CREATED_BY     : String(12);
  }

  entity LOCATION_IBP {
    key LOCATION_ID    : String(4);
        LOCATION_DESC  : String(30);
        LOCATION_TYPE  : String(1);
        RESERVE_FIELD1 : String(20);
        RESERVE_FIELD2 : String(20);
        RESERVE_FIELD3 : String(20);
        RESERVE_FIELD4 : String(20);
        RESERVE_FIELD5 : String(20);
        CHANGED_DATE   : Date;
        CHANGED_TIME   : Time;
        CHANGED_BY     : String(12);
        CREATED_DATE   : Date;
        CREATED_TIME   : Time;
        CREATED_BY     : String(12);
  }

  entity PRODUCT {
    key PRODUCT_ID          : String(40);
        PRODUCT_DESC        : String(40);
        PRODUCT_TYPE        : String(4);
        PRODUCT_FAMILY      : String(40);
        PRODUCT_GROUP       : String(20);
        PRODUCT_MODEL       : String(20);
        PRODUCT_MODEL_RANGE : String(20);
        PRODUCT_SERIES      : String(20);
        RESERVE_FIELD1      : String(20);
        RESERVE_FIELD2      : String(20);
        RESERVE_FIELD3      : String(20);
        RESERVE_FIELD4      : String(20);
        RESERVE_FIELD5      : String(20);
        CHANGED_DATE        : Date;
        CHANGED_TIME        : Time;
        CHANGED_BY          : String(12);
        CREATED_DATE        : Date;
        CREATED_TIME        : Time;
        CREATED_BY          : String(12);
  }

  entity SALES1 {
    key SALES_DOCUMENT       : String(10);
    key SALES_DOCUMENT_ITEM  : String(6);
        DOC_CREATED_DATE     : Date;
        SCHEDULE_LINE_NO     : String(4);
        PRODUCT_ID           : String(40);
        REASON_4REJECTION    : String(2);
        UOM                  : String(3);
        CONFIRMED_QTY        : String(17);
        QTY_UNITS            : String(17);
        PROD_AVAILABILITY_DT : Date;
        NET_VALUE            : String(21);
        CUSTOMER_GROUP       : String(2);
        LOCATION_ID          : String(4);
        SALES_ORG            : String(4);
        DISTR_CHANNEL        : String(2);
        DIVISION             : String(2);
        SAL_DOCU_TYPE        : String(4);
        ITEM_CREATED_DATE    : Date;
        ITEM_CHANGE_DATE     : Date;
        OPEN_ORDER           : String(1);
        CHARG                : String(10);
        IBP_CUSTOMER         : String(10);
        NOT_PLANNING         : String(1);
        ON_HAND_STOCK        : String(1);
        IN_TRANSIT           : String(1);
        SHIP_FROM_LOC        : String(4);
        RESERVE_FIELD1       : String(20);
        RESERVE_FIELD2       : String(20);
        RESERVE_FIELD3       : String(20);
        STOCK_LOC            : String(4);
        TRANS_TO_LOC         : String(4);
        TRANS_FROM_LOC       : String(4);
        CHANGED_DATE         : Date;
        CHANGED_TIME         : Time;
        CHANGED_BY           : String(12);
        CREATED_DATE         : Date;
        CREATED_TIME         : Time;
        CREATED_BY           : String(12);
  }


  entity locationproductionid {
    key LOCATION_ID       : String(4);
    key PRODUCT_ID        : String(40);
        LOTSIZE_KEY       : String(2);
        PROCUREMENT_TYPE  : String(1);
        LOTSIZE           : String(19);
        PLANNING_STRATEGY : String(2);
        CHANGED_DATE      : Date;
        CHANGED_TIME      : Time;
        CHANGED_BY        : String(12);
        CREATED_DATE      : Date;
        CREATED_TIME      : Time;
        CREATED_BY        : String(12);
  }


  entity product_class {
    key PRODUCT_ID   : String(40);
    key CLASS        : String(18);
        CHANGED_DATE : Date;
        CHANGED_TIME : Time;
        CHANGED_BY   : String(12);
        CREATED_DATE : Date;
        CREATED_TIME : Time;
        CREATED_BY   : String(12);
  }

  entity class_c {
    key INT_CLS_NUMBER : String(10);
        CLASS_TYPE     : String(3);
        CLASS          : String(18);
        ZDESC          : String(40);
        CHANGED_DATE   : Date;
        CHANGED_TIME   : Time;
        CHANGED_BY     : String(12);
        CREATED_DATE   : Date;
        CREATED_TIME   : Time;
        CREATED_BY     : String(12);
  }

  entity characteristicdata {
    key INT_CLS_NUMBER : String(10);
    key CHAR_NAME      : String(30);
        INT_CHAR       : String(10);
        CHAR_DESC      : String(50);
        CHAR_GROUP     : String(10);
        CHAR_DATATYPE  : String(4);
        CHAR_CATEGORY  : String(2);
        ENTRY_REQ      : String(1);
        MULTI_CHAR     : String(1);
        CHANGED_DATE   : Date;
        CHANGED_TIME   : Time;
        CHANGED_BY     : String(12);
        CREATED_DATE   : Date;
        CREATED_TIME   : Time;
        CREATED_BY     : String(12);

  }

  entity characteristicvalues {
    key INT_CHAR             : String(10);
        VALUE_NUM            : String(15);
        CHAR_NAME            : String(30);
        CHARACTERISTIC_VALUE : String(70);
        CHARACTERISTIC_VDESC : String(70);
        CHANGED_DATE         : Date;
        CHANGED_TIME         : Time;
        CHANGED_BY           : String(12);
        CREATED_DATE         : Date;
        CREATED_TIME         : Time;
        CREATED_BY           : String(12);
  }

  entity INTERFACE_TABLE {
    key SERVICE_ID   : Integer64;
        SERVICE_NAME : String(100);
        SERVICE_DESC : String;
  }

  entity CONFIG_INT_TAB {
    key SERVICE_ID     : Integer64;
    key INTERFACE_TYPE : String(20);
    key PARAMETER      : String(25);
        VALUE          : String(4);
  }


}

@cds.persistence.exists
@cds.persistence.table

entity STUD_PROGRESS1 {


  // NAME  : String  @title: 'NAME';
  // DATE  : String  @title: 'DATE';
  // MARKS : Integer @title: 'MARKS';

key  ID          : Integer     @title: 'ID';
  NAME        : String(100) @title: 'NAME';
  DATEOFBIRTH : String(100) @title: 'DATEOFBIRTH';
  CONTACT     : Integer64   @title: 'CONTACT';
  MARKS       : Integer     @title: 'MARKS';
  DATE        : String(100) @title: 'DATE';


};

@cds.persistence.exists
@cds.persistence.table


entity SAMPLE_1 {

 key NAME  : String  @title: 'NAME';
  DATE  : String  @title: 'DATE';
  MARKS : Integer @title: 'MARKS';

};

@cds.persistence.exists
@cds.persistence.table

entity SELECTIONOPTIONS {
 key PRODUCT_ID : String @title: 'PRODUCT_ID';
};
