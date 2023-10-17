using app.interactions from '../db/interactions';

using STUD_PROGRESS1 from '../db/interactions';

using { SAMPLE_1 } from '../db/interactions';

using { SELECTIONOPTIONS } from '../db/interactions';


service CatalogService  {

 entity Interactions_Header
    as projection on interactions.Interactions_Header;
 entity Interactions_Items
    as projection on  interactions.Interactions_Items;

 entity Interactions_Student
    as projection on  interactions.Interactions_Student;

 entity Interactions_Employee
  as projection on interactions.Interactions_Employee;  

  entity Interactions_Student_data 
  
  as projection on interactions.Interactions_Student_data;

  entity Interactions_Student_marks 
  
  as projection on interactions.Interactions_Student_marks;

 entity OuterJoin as projection on SAMPLE_1;

  
  entity InnerJoin as projection on STUD_PROGRESS1;

  entity Options as projection on SELECTIONOPTIONS;

entity Unique_ID_Header1 as projection on interactions.Unique_ID_Header12;
 
 entity Unique_ID_ITEM1 as projection on interactions.Unique_ID_ITEM;

 entity CHAR_NUMVAL1 as projection on interactions.CHARVAL_NUM;

 entity ORDERS as projection on interactions.ORDER_DATA;


 //Stastical Develpoment tables

 entity CP_STAT_METHOD1  as projection on interactions.CP_STAT_METHOD ;

 entity CP_STAT_METHOD_VAL1  as projection on interactions.CP_STAT_METHOD_VAL;

 entity CP_STAT_PROFILE1 as projection on interactions.CP_STAT_PROFILE;

 entity CP_STAT_PROFILE_VAL1  as projection on interactions.CP_STAT_PROFILE_VAL;

entity CP_BOOK  as projection on interactions.BOOKS_Vals;

entity SBP_EMPLOY as projection on interactions.Sbp_info;
   
//   function crud(FLAG:String,ID:Integer,NAME:String,DATEOFBIRTH:String,CONTACT:String,EMAIL:String,ADDRESS:String) returns String

// function crud(FLAG:String,Data:String) returns String;

function stud_data(FLAG:String,Data:String) returns String;

function seed_order(FLAG:String,Data:String) returns String;

function  profile(FLAG:String,Data:String)  returns String;

function CP_BOOK1(FLAG:String,Data:String) returns String;  

function cre(FLAG:String,Data:String) returns String;

function tree(FLAG:String,Data:String) returns String;

//vc planner odata services 

entity  LOCATION_STANDBY  as projection on interactions.LOCATION_STB ;

entity LOCATION1  as projection on interactions.LOCATION;
 
entity LOCATION_IBP as projection on interactions.LOCATION_IBP;

// vc planner ---sales and product odata services

entity PRODUCT_SRV as projection on interactions.PRODUCT;

@requires: 'authenticated-user'

entity SALES_SRV as projection on interactions.SALES1;


}



