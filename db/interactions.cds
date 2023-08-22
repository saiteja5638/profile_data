// namespace app.interactions;

using {Country} from '@sap/cds/common';

context app.interactions{

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
  key ID :String;
     NAME :String;
     DESIGNATION:String;
     TECH_F:String;
     DOB:String;
     CONTACT:String;
     EMAIL:String;
     ADDRESS:String;
}

entity Interactions_Student_marks {
  ID    : Integer64;
  DATE  : String;
  MARKS : Integer;

}

entity Unique_ID_Header{

  UNIQUE_ID:Integer64;
  PRODUCT_ID :String;
  UNIQUE_DESC:Integer64;
  UID_TYPE:String;
  ACTIVE:String;

}

entity Unique_ID_Header12{

   UNIQUE_ID:Integer64;
  PRODUCT_ID :String;
  UNIQUE_DESC:String;
  UID_TYPE:String;
  ACTIVE:Boolean;
}

entity Unique_ID_ITEM{

  UNIQUE_ID:Integer64;
  PRODUCT :String;
  CHAR_NUM:Integer64;
  CHAR_NUMVAL:String;
  NEW_VAL:String;
}

entity CHARVAL_NUM{

  CHAR_NUM:Integer64;
  CHAR_NUMVAL :String;
  CHARVAL_NUM:String;
  CHAR_NUMVALDESC:String;
}

entity ORDER_DATA{
  SEEDORDER:String;
  PRODUCT:String;
  UNIQUEID:String;
  ORDERQUANTITY:Integer64;
  MATERIALAVAILDATE:String;
  CREADTEDDATE:String;
  CREATEDBY:String;
}


entity CP_STAT_METHOD{
  key METHOD:String(50) ;
  METHOD_DESC:String(200);
}

entity CP_STAT_METHOD_VAL{
 key METHOD:String(50);
 key PARAM:String(50);
  PARAM_DESC:String(200);
  DATATYPE:String;
  POSITION:Integer;
  DEFAULTVALUE:String;
}

entity CP_STAT_PROFILE {
  key PROFILE :String(50) ;
  PRF_DESC:String(200);
  METHOD:String(50);
  CREATED_DATE:Date;
  CREATED_BY:String(12);
}

entity CP_STAT_PROFILE_VAL{
 key PROFILE:String(50);
 key PARAM:String(50);
  PARAM_VALUE:String(1000);

}

entity BOOKS_Vals{
   key BOOKID:Integer64;
       BOOKNAME:String;
       BOOKAUTHOR:String;
       BOOKPUBDATE:String;
}

entity LOCATION_STB{
  key LOCATION_ID : String(4);
      LOCATION_DESC:String(30);
      LOCATION_TYPE :String(1);
      RESERVE_FIELD1 : String(20);
      RESERVE_FIELD2 : String(20);
      RESERVE_FIELD3 : String(20);
      RESERVE_FIELD4 : String(20);
      RESERVE_FIELD5 : String(20);
      CHANGED_DATE : Date;
      CHANGED_TIME :Time;
      CHANGED_BY :String(12);
      CREATED_DATE :Date;
      CREATED_TIME:Time;
      CREATED_BY:String(12);
}

entity LOCATION{
  key LOCATION_ID : String(4);
      LOCATION_DESC:String(30);
      LOCATION_TYPE :String(1);
      RESERVE_FIELD1 : String(20);
      RESERVE_FIELD2 : String(20);
      RESERVE_FIELD3 : String(20);
      RESERVE_FIELD4 : String(20);
      RESERVE_FIELD5 : String(20);
      CHANGED_DATE : Date;
      CHANGED_TIME :Time;
      CHANGED_BY :String(12);
      CREATED_DATE :Date;
       CREATED_TIME:Time;
      CREATED_BY:String(12);
}




}

@cds.persistence.exists

@cds.persistence.table

entity STUD_PROGRESS1 {


  // NAME  : String  @title: 'NAME';
  // DATE  : String  @title: 'DATE';
  // MARKS : Integer @title: 'MARKS';

  ID          : Integer  @title : 'ID';
  NAME        : String(100) @title : 'NAME';
  DATEOFBIRTH : String(100) @title : 'DATEOFBIRTH';
  CONTACT    : Integer64 @title : 'CONTACT';
  MARKS       : Integer @title : 'MARKS';
  DATE        : String(100) @title : 'DATE';


};

@cds.persistence.exists

@cds.persistence.table


entity SAMPLE_1 {

  NAME  : String  @title: 'NAME';
  DATE  : String  @title: 'DATE';
  MARKS : Integer @title: 'MARKS';

};

@cds.persistence.exists

@cds.persistence.table

entity SELECTIONOPTIONS{
  PRODUCT_ID:String @title:'PRODUCT_ID';
};



