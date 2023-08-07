var cds = require('@sap/cds')

module.exports = srv => {
    srv.on('crud', async (req, res) => {
        if (req.data.FLAG === "C") {
            var Data = JSON.parse(req.data.Data)

            for (var i = 0; i < Data.length; i++) {

                try {
                    await cds.run(INSERT.into("APP_INTERACTIONS_INTERACTIONS_STUDENT").entries({
                        ID: Data[i].ID, NAME: Data[i].NAME, DATEOFBIRTH: Data[i].DATEOFBIRTH, CONTACT: Data[i].CONTACT, EMAIL: Data[i].EMAIL, ADDRESS: Data[i].ADDRESS
                    }))
                }
                catch (e) {
                    throw e
                }
            }
        }
        if (req.data.FLAG === "V") {
            try {
                var a = await cds.run(SELECT.from("APP_INTERACTIONS_INTERACTIONS_STUDENT"))

                return JSON.stringify(a)
            }
            catch (e) {
                throw e
            }
        }
        if (req.data.FLAG === "U") {

            var Data = JSON.parse(req.data.Data)

            for (var i = 0; i < Data.length; i++) {

                try {
                    await cds.run(UPDATE("APP_INTERACTIONS_INTERACTIONS_STUDENT", { ID: Data[i].ID }).with({ NAME: Data[i].NAME, DATEOFBIRTH: Data[i].DATEOFBIRTH, CONTACT: Data[i].CONTACT, EMAIL: Data[i].EMAIL, ADDRESS: Data[i].ADDRESS }))
                }
                catch (e) {
                    throw e
                }
            }
         
        }
        if (req.data.FLAG === "D") {

            var Data = JSON.parse(req.data.Data)

            for (var i = 0; i < Data.length; i++) {

                try {
                    await cds.run(DELETE.from("APP_INTERACTIONS_INTERACTIONS_STUDENT").where({ ID: Data[i].ID }))
                }
                catch (e) {
                    throw e
                }
            }
        }
    })


    // srv.on('stud_data', async (req, res) => {
    //     if (req.data.FLAG === "C") {
    //         var data = JSON.parse(req.data.Data)

    //         console.log(data)
    //             try {
    //                 for (let i = 0; i < data.length; i++) {
    //                 await cds.run(INSERT.into("APP_INTERACTIONS_INTERACTIONS_STUDENT_DATA").entries({
    //                     ID: data[i].ID, NAME: data[i].NAME, CONTACT: data[i].CONTACT,DATEOFBIRTH:data[i].DATEOFBIRTH
    //                 }))
    //             }
    //             }

    //             catch (e) {
    //                 throw e
    //             }
    //     }
    
    // })

    srv.on('stud_data', async (req, res) => {
        if (req.data.FLAG === "C") {
            var data = JSON.parse(req.data.Data)

            console.log(data)
                try {
                    for (let i = 0; i < data.length; i++) {
                    await cds.run(INSERT.into("APP_INTERACTIONS_INTERACTIONS_STUDENT_MARKS").entries({
                        ID: data[i].ID, DATE: data[i].DATE, MARKS: data[i].MARKS
                    }))
                }
                }

                catch (e) {
                    throw e
                }
        }
    
    })

    srv.on('seed_order',async(req,res)=>{
        console.log(req.data.Data)

        if(req.data.FLAG==='U')
        {
            var data = JSON.parse(req.data.Data)

            try
            {
              await  cds.run(UPDATE("APP_INTERACTIONS_UNIQUE_ID_HEADER12",{UNIQUE_ID:data[0].UNIQUE_ID}).with({ACTIVE:data[0].ACTIVE}))

            
            }
            catch(e)
            {
                throw e
            }

            
        }
        if(req.data.FLAG==='C')
        {
            var data = JSON.parse(req.data.Data)

            try
            {
              await  cds.run(INSERT.into("APP_INTERACTIONS_UNIQUE_ID_HEADER12").entries({UNIQUE_ID:data[0].UNIQUE_ID,PRODUCT_ID:data[0].PRODUCT_ID,UNIQUE_DESC:data[0].UNIQUE_DESC,UID_TYPE:data[0].UID_TYPE,ACTIVE:data[0].ACTIVE}))

            
            }
            catch(e)
            {
                throw e
            }

        }
        if(req.data.FLAG==='C1')
        {
            var data = JSON.parse(req.data.Data)

           
                try
                {
                    for(var i=0;i<data.length;i++)
                    {
                      
                    await cds.run(INSERT.into("APP_INTERACTIONS_UNIQUE_ID_ITEM").entries({UNIQUE_ID:data[i].UNIQUE_ID, PRODUCT:data[i].PRODUCT_ID,CHAR_NUM:data[i].CHAR_NUM, CHAR_NUMVAL:data[i].CHAR_NUMVAL,NEW_VAL:data[i].NEW_VAL}))
                    }
            }
                catch(e)
                {
                    throw e
                
            }
        }
        if(req.data.FLAG==="V1")
        {
            try{
                var char_data123 = await cds.run(SELECT.from("APP_INTERACTIONS_CHARVAL_NUM"))

                return JSON.stringify(char_data123)
            }
            catch(e)
            {
                throw e
            }
        }
        if(req.data.FLAG==="O")
        {
            var data = JSON.parse(req.data.Data)
            try
            {
                await cds.run(INSERT.into("APP_INTERACTIONS_ORDER_DATA").entries({SEEDORDER:data[0].SEEDORDER,PRODUCT:data[0].PRODUCT,UNIQUEID:data[0].UNIQUEID,ORDERQUANTITY:data[0].ORDERQUANTITY,MATERIALAVAILDATE:data[0].MATERIALAVAILDATE,CREADTEDDATE:data[0].CREADTEDDATE,CREATEDBY:req.headers["x-username"]}))
            }
            catch(e)
            {
               throw e
            }
        }
        if(req.data.FLAG==="O1")
        {
            var data = JSON.parse(req.data.Data)
            try
            {
                for(let i=0;i<data.length;i++)
                {
                    
                await cds.run(INSERT.into("APP_INTERACTIONS_ORDER_DATA").entries({SEEDORDER:data[i].SEEDORDER,PRODUCT:data[i].PRODUCT,UNIQUEID:data[i].UNIQUEID,ORDERQUANTITY:data[i].ORDERQUANTITY,MATERIALAVAILDATE:data[i].MATERIALAVAILDATE,CREADTEDDATE:data[i].CREADTEDDATE,CREATEDBY:req.headers["x-username"]}))

                }
            }
            catch(e)
            {
               throw e
            }
        }
   
    })

    srv.on("profile",async (req, res)=>{
        if(req.data.FLAG==="C")
        {
            var data = JSON.parse(req.data.Data)   

            try{
            
                await cds.run(INSERT.into("APP_INTERACTIONS_CP_STAT_PROFILE").entries({PROFILE:data[0].PROFILE,PRF_DESC:data[0].PRF_DESC,METHOD:data[0].METHOD,CREATED_DATE:data[0].CREATED_DATE,CREATED_BY:null}))
            }
            catch(e)
            {
                throw e
            }
        }
        if(req.data.FLAG==="C1")
        {
            var data = JSON.parse(req.data.Data)   

            try{

                for(let i=0;i<data.length;i++)
                {
                    await cds.run(INSERT.into("APP_INTERACTIONS_CP_STAT_PROFILE_VAL").entries({PROFILE:data[i].PROFILE,PARAM:data[i].PARAM,PARAM_VALUE:data[i].PARAM_VALUE}))
                }
            
            }
            catch(e)
            {
                throw e
            }
        }
        if(req.data.FLAG=="D")
        {
            try{
              await cds.run(DELETE.from("APP_INTERACTIONS_CP_STAT_PROFILE").where({PROFILE:req.data.Data}))
            }
            catch(e)
            {
               throw e
            }
        }

        if(req.data.FLAG=="D1")
        {
            try{
              await cds.run(DELETE.from("APP_INTERACTIONS_CP_STAT_PROFILE_VAL").where({PROFILE:req.data.Data}))
            }
            catch(e)
            {
               throw e
            }
        }
        // if(req.data.FLAG=="U")
        // {
        //    try {

        //     await cds.run(UPDATE("APP_INTERACTIONS_CP_STAT_PROFILE",))
            
        //    } catch (error) {
            
        //    }
        // }

    })


}