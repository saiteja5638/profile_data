var cds = require('@sap/cds')

var fs = require('fs')

module.exports = srv => {

    srv.on('cre', async (req, res) => {

        if (req.data.FLAG == 'C1') {
            var newData = JSON.parse(req.data.Data)

            const filePath = 'app/crud_json/webapp/model/data.json';

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                try {
                    const existingArray = JSON.parse(data);

                    existingArray.push(newData[0]); // Append the new object to the existing array

                    const updatedJSON = JSON.stringify(existingArray, null, 2);

                    fs.writeFile(filePath, updatedJSON, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                            return;
                        }
                        console.log('Data appended successfully.');
                    });
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            })

        }

        if (req.data.FLAG == 'R') {
            fs.readFile('app/crud_json/webapp/model/data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    res.status(500).send('Error reading file');
                    return;
                }

            });
        }
        if (req.data.FLAG == 'D') {
            const filePath = 'app/crud_json/webapp/model/data.json';

            const objectToRemove = JSON.parse(req.data.Data)


            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                try {
                    const jsonArray = JSON.parse(data);

                    // Find the index of the object to remove
                    const indexToRemove = jsonArray.findIndex(obj => {
                        return obj.PAGEID === objectToRemove[0].PAGEID && obj.PARENTNODEID === objectToRemove[0].PARENTNODEID;
                    });

                    if (indexToRemove !== -1) {
                        // Remove the object from the array
                        jsonArray.splice(indexToRemove, 1);

                        // Convert the modified array back to JSON
                        const updatedJSON = JSON.stringify(jsonArray, null, 2);

                        // Write the updated JSON data back to the file
                        fs.writeFile(filePath, updatedJSON, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                            console.log('Object removed successfully.');
                        });
                    } else {
                        console.log('Object not found in the array.');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            });
        }
        if (req.data.FLAG == 'U') {
            const filePath = 'app/crud_json/webapp/model/data.json';

            let data = JSON.parse(req.data.Data)

            const objectToUpdate = data[1]

            const updatedData = data[0]


            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                try {
                    const jsonArray = JSON.parse(data);

                    // Find the index of the object to update
                    const indexToUpdate = jsonArray.findIndex(obj => {
                        return obj.PAGEID === objectToUpdate.PAGEID && obj.DESCRIPTION === objectToUpdate.DESCRIPTION;
                    });

                    if (indexToUpdate !== -1) {
                        // Update the properties of the object
                        jsonArray[indexToUpdate] = updatedData;

                        // Convert the modified array back to JSON
                        const updatedJSON = JSON.stringify(jsonArray, null, 2);

                        // Write the updated JSON data back to the file
                        fs.writeFile(filePath, updatedJSON, 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }
                            console.log('Object updated successfully.');
                        });
                    } else {
                        console.log('Object not found in the array.');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            })
        }
    })

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

    srv.on('seed_order', async (req, res) => {
        console.log(req.data.Data)

        if (req.data.FLAG === 'U') {
            var data = JSON.parse(req.data.Data)

            try {
                await cds.run(UPDATE("APP_INTERACTIONS_UNIQUE_ID_HEADER12", { UNIQUE_ID: data[0].UNIQUE_ID }).with({ ACTIVE: data[0].ACTIVE }))


            }
            catch (e) {
                throw e
            }


        }
        if (req.data.FLAG === 'C') {
            var data = JSON.parse(req.data.Data)

            try {
                await cds.run(INSERT.into("APP_INTERACTIONS_UNIQUE_ID_HEADER12").entries({ UNIQUE_ID: data[0].UNIQUE_ID, PRODUCT_ID: data[0].PRODUCT_ID, UNIQUE_DESC: data[0].UNIQUE_DESC, UID_TYPE: data[0].UID_TYPE, ACTIVE: data[0].ACTIVE }))


            }
            catch (e) {
                throw e
            }

        }
        if (req.data.FLAG === 'C1') {
            var data = JSON.parse(req.data.Data)


            try {
                for (var i = 0; i < data.length; i++) {

                    await cds.run(INSERT.into("APP_INTERACTIONS_UNIQUE_ID_ITEM").entries({ UNIQUE_ID: data[i].UNIQUE_ID, PRODUCT: data[i].PRODUCT_ID, CHAR_NUM: data[i].CHAR_NUM, CHAR_NUMVAL: data[i].CHAR_NUMVAL, NEW_VAL: data[i].NEW_VAL }))
                }
            }
            catch (e) {
                throw e

            }
        }
        if (req.data.FLAG === "V1") {
            try {
                var char_data123 = await cds.run(SELECT.from("APP_INTERACTIONS_CHARVAL_NUM"))

                return JSON.stringify(char_data123)
            }
            catch (e) {
                throw e
            }
        }
        if (req.data.FLAG === "O") {
            var data = JSON.parse(req.data.Data)
            try {
                let Unique_header_data = await cds.run(SELECT.from("APP_INTERACTIONS_UNIQUE_ID_ITEM"))

                let order_data = await cds.run(SELECT.from("APP_INTERACTIONS_ORDER_DATA"))

                let find = Unique_header_data.find(i => i.UNIQUE_ID == data[0].UNIQUEID && i.PRODUCT == data[0].PRODUCT)

                let find_2 = order_data.find(j => j.UNIQUEID == data[0].UNIQUEID && data[0].MATERIALAVAILDATE.includes(j.MATERIALAVAILDATE))


                if (find && !find_2) {

                    await cds.run(INSERT.into("APP_INTERACTIONS_ORDER_DATA").entries({ SEEDORDER: data[0].SEEDORDER, PRODUCT: data[0].PRODUCT, UNIQUEID: data[0].UNIQUEID, ORDERQUANTITY: data[0].ORDERQUANTITY, MATERIALAVAILDATE: data[0].MATERIALAVAILDATE, CREADTEDDATE: data[0].CREADTEDDATE, CREATEDBY: req.headers["x-username"] }))

                    let result_response = "The Seed order :" + data[0].SEEDORDER + " is Created !"

                    return result_response
                }
                else {

                    let result_response = "The UniqueID  with " + find_2.UNIQUEID + " is already exits with " + find_2.MATERIALAVAILDATE

                    return result_response
                }

            }
            catch (e) {
                throw e
            }
        }
        if (req.data.FLAG === "O1") {
            var data = JSON.parse(req.data.Data)
            try {

                let Unique_header_data = await cds.run(SELECT.from("APP_INTERACTIONS_UNIQUE_ID_ITEM"))

                let order_data = await cds.run(SELECT.from("APP_INTERACTIONS_ORDER_DATA"))  // order re-checking

                let filtered_data = []

                let Duplicate_responses = []

                for (let i = 0; i < data.length; i++) {

                    let obj = data[i]


                    let find = Unique_header_data.find(i => ((i.UNIQUE_ID == obj.UNIQUEID) && (i.PRODUCT == obj.PRODUCT)))

                    let find_2 = order_data.find(j => j.UNIQUEID == data[i].UNIQUEID && data[i].MATERIALAVAILDATE.includes(j.MATERIALAVAILDATE))

                    let uniqID = Unique_header_data.find(uniq =>uniq.UNIQUE_ID == obj.UNIQUEID )

                    let prod  = Unique_header_data.find(prod=> prod.PRODUCT == obj.PRODUCT)

                  

                    if (!(obj.UNIQUEID == "null" || obj.PRODUCT == "null"||obj.ORDERQUANTITY == "null")) {
                        if (!(isNaN(parseInt(obj.UNIQUEID)) || isNaN(parseInt(obj.ORDERQUANTITY)))) // if uni_id or or_qut is string throws to duplicates
                        {
                           
                            if(uniqID)
                            {
                                if(prod)
                                {
                                  
                                    if (find)  // id not recognised
                                    {
                                        if (find_2)  // order data already exists
                                        {
                                            obj['err_type'] ="order data already exists"
                                            obj['vaild_type']="invaild"
                    
                    
                                            Duplicate_responses.push(obj)
                                        }
                                        else
                                        {
                                            obj['err_type'] ="-"
                                            obj['vaild_type']="vaild"
                                            filtered_data.push(obj)
                                        }
                
                                    }
                                    else
                                    {
                                        obj['err_type'] ="ID/Product is not regonised"
                                        obj['vaild_type']="invaild"
                
                                        Duplicate_responses.push(obj)
                                    }
                                }
                                else
                                {
                                    obj['err_type'] ="Product not recognised"
                                    obj['vaild_type']="invaild"
    
                                    Duplicate_responses.push(obj)
                                }
                            }
                            else {
                                obj['err_type'] ="UniqueID  not recognised"
                                obj['vaild_type']="invaild"

                                Duplicate_responses.push(obj)
                            }
                            

                        }
                        else {
                            obj['err_type'] ="String error"
                            obj['vaild_type']="invaild"

                            Duplicate_responses.push(obj)
                        }
                    }
                    else {
                        obj['err_type'] ="null existing"
                        obj['vaild_type']="invaild"
                        Duplicate_responses.push(obj)
                       
                    }

                }

                if (Duplicate_responses.length <= 0)  //if invaild data available it  not eneters
                {
                    let Seed_orderlength = await cds.run(SELECT.from("APP_INTERACTIONS_ORDER_DATA"))
                    let seed_order_id = "SE000" + (Seed_orderlength.length + 1);

                    await cds.run(INSERT.into("APP_INTERACTIONS_ORDER_DATA").entries({ SEEDORDER: seed_order_id, PRODUCT: data[i].PRODUCT, UNIQUEID: data[i].UNIQUEID, ORDERQUANTITY: data[i].ORDERQUANTITY, MATERIALAVAILDATE: data[i].MATERIALAVAILDATE, CREADTEDDATE: data[i].CREADTEDDATE, CREATEDBY: req.headers["x-username"] }))
                }
                else {


                    //         let data =[] 
                    //         let dub =[]
      
                    //         Duplicate_responses.forEach(obj => {
      
                    //             if (!(dub.includes(obj.UNIQUEID))) {
      
                    //                 data.push(obj.UNIQUEID)
      
                    //             }
                    //             dub.push(obj.UNIQUEID);
                    //         })

                    //         console.log(data)

                     

                    // let new_array2 = [];

                    // data.forEach(id => {
                    //     const temp = { UNIQUEID: id }
                    //     Duplicate_responses.forEach(obj => {
                    //         temp['PRODUCT'] = obj.PRODUCT
                    //         temp['err_type'] = obj.err_type
                    //         temp['vaild_type'] =obj.vaild_type
                    //         temp[obj.MATERIALAVAILDATE] = obj.ORDERQUANTITY;
                    //     })
                    //     new_array2.push(temp)
                    // })

                    // console.log(new_array2);

                    // let new_array12 = [];

                    // data.forEach(id => {
                    //     const temp = { UNIQUEID: id }
                    //     filtered_data.forEach(obj => {
                    //         temp['PRODUCT'] = obj.PRODUCT
                    //         temp['err_type'] = obj.err_type
                    //         temp['vaild_type'] =obj.vaild_type
                    //         temp[obj.MATERIALAVAILDATE] = obj.ORDERQUANTITY;
                    //     })
                    //     new_array12.push(temp)
                    // })

                    // console.log(new_array12);

                    const result = {};

                    for (const obj of Duplicate_responses) {

                        var dateString = (obj.MATERIALAVAILDATE).split('/')

                        let oConvertedDate = dateString[0] + "-" + dateString[1] + "-" + dateString[2]


                        const objId = obj.UNIQUEID;
                        const objDate = oConvertedDate;
                        const objorder = obj.ORDERQUANTITY;
                        const objProd = obj.PRODUCT;
                        const objerr = obj.err_type;
                        const objvaild = obj.vaild_type


                        if (!(objId in result)) {
                            result[objId] = {};
                        }

                        result[objId][objDate] = objorder;
                        result[objId]['PRODUCT'] = objProd;
                        result[objId]['UNIQUEID'] = objId;
                        result[objId]['err_type'] = objerr;
                        result[objId]['vaild_type'] = objvaild;

                    }
                      
    
                        let new_array = []

                        for(let a =0;a<Object.keys(result).length;a++)
                        {
                            let dummy_object = Object.assign({},result[Object.keys(result)[a]]) 

                            new_array.push(dummy_object)
                        }

                       
                        const result1 = {};

                        for (const obj of filtered_data) {
    
                            var dateString = (obj.MATERIALAVAILDATE).split('/'); // Assuming the date string is in the format dd/MM/yyyy
    
                            let oConvertedDate = dateString[0] + "-" + dateString[1] + "-" + dateString[2]
    
    
                            const objId = obj.UNIQUEID;
                            const objDate = oConvertedDate;
                            const objorder = obj.ORDERQUANTITY;
                            const objProd = obj.PRODUCT;
                            const objerr = obj.err_type;
                            const objvaild = obj.vaild_type;  
                    
    
    
                            if (!(objId in result1)) {
                                result1[objId] = {};
                            }
    
                            result1[objId][objDate] = objorder;
                            result1[objId]['PRODUCT'] = objProd;
                            result1[objId]['UNIQUEID'] = objId;
                            result1[objId]['err_type'] = objerr;
                            result1[objId]['vaild_type'] = objvaild;
    
                        }
                          
        
                            let new_array1 = []
    
                            for(let a =0;a<Object.keys(result1).length;a++)
                            {
                                let dummy_object = Object.assign({},result1[Object.keys(result1)[a]]) 
    
                                new_array1.push(dummy_object)
                            }
  

                            const arr3 = new_array.concat(new_array1);


                       return JSON.stringify(arr3)
                }


            }
            catch (e) {
                throw e
            }
        }

    })

    srv.on("profile", async (req, res) => {
        if (req.data.FLAG === "C") {
            var data = JSON.parse(req.data.Data)

            try {

                await cds.run(INSERT.into("APP_INTERACTIONS_CP_STAT_PROFILE").entries({ PROFILE: data[0].PROFILE, PRF_DESC: data[0].PRF_DESC, METHOD: data[0].METHOD, CREATED_DATE: data[0].CREATED_DATE, CREATED_BY: null }))
            }
            catch (e) {
                throw e
            }
        }
        if (req.data.FLAG === "C1") {
            var data = JSON.parse(req.data.Data)

            try {

                for (let i = 0; i < data.length; i++) {
                    await cds.run(INSERT.into("APP_INTERACTIONS_CP_STAT_PROFILE_VAL").entries({ PROFILE: data[i].PROFILE, PARAM: data[i].PARAM, PARAM_VALUE: data[i].PARAM_VALUE }))
                }

            }
            catch (e) {
                throw e
            }
        }
        if (req.data.FLAG == "D") {
            try {
                await cds.run(DELETE.from("APP_INTERACTIONS_CP_STAT_PROFILE").where({ PROFILE: req.data.Data }))
            }
            catch (e) {
                throw e
            }
        }

        if (req.data.FLAG == "D1") {
            try {
                await cds.run(DELETE.from("APP_INTERACTIONS_CP_STAT_PROFILE_VAL").where({ PROFILE: req.data.Data }))
            }
            catch (e) {
                throw e
            }
        }
    })
}