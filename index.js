let express=require('express');

let sql=require('mysql');

let connection=sql.createConnection(
    {
        user:'root',
        password:'',
        port:3306,
        host:'localhost',
        database:'anuj'
    }
);

connection.connect((error)=>{
    if(error){
        console.log(error.sqlMessage);
    }else{
        console.log('Connected');
    }
});


let tcs=express();

//Using Middleware--
tcs.use(express.json());


//Get is used to Retrieve Data
tcs.get('/api/user',(req,res)=>{
    let city=req.query.city
    let sql_query=`select * from emp where city='${city}'`;
    connection.query(sql_query,(err,result)=>{
        if(err){
            console.log(err.sqlMessage);
        }else{
            res.send(result);
        }
    })

})

//POST Method is used to insert the data into database from NODE

tcs.post('/api/adduser',(req,res)=>{
   
//Requesting data from body in json format and converting in array format
    
    // let data =[req.body.id, req.body.name, req.body.city]
    // let sql_quer="insert into emp values (?)";

    let data =[req.body.id, req.body.name]
    let sql_quer="insert into emp(id,name) values (?)";

    
    // let data =req.body
    // let sql_quer="insert into emp SET ?";


    // if sending data in array format use [data] in parameter
    connection.query(sql_quer,[data],(err,result)=>{
        if(err){
            res.send({
                status:402,
                message:err.sqlMessage
            });
        }
        else{
            res.send(result);
        }
    })
})

//PUT method is used to update the info 

tcs.put('/api/updateusers',(req,res)=>{
    let id=req.query.id;
    let cit=req.body.city;
let qu='Update emp set city= ? where id=?';

connection.query(qu,[cit,id],(err,result)=>{
    if(err){
        res.send({
            status:402,
            message:err.sqlMessage
        });
    }
    else{
        res.send({
            status:200,
            message:'Data Updated Successfully'
        });
    }
})

})


//Patch

tcs.patch('/api/updateuser',(req,res)=>{
    let id=req.query.id;
    let cit=req.body.city;
let qu='Update emp set city= ? where id=?';

connection.query(qu,[cit,id],(err,result)=>{
    if(err){
        res.send({
            status:402,
            message:err.sqlMessage
        });
    }
    else{
        res.send({
            status:200,
            message:'Data Updated Successfully'
        });
    }
})

})


//DELETE 


tcs.delete('/api/deleteuser',(req,res)=>{
    let id=req.query.id;
    let sq=`Delete from emp where id=?`;

    connection.query(sq,[id],(err,result)=>{
        if(err){
            res.send({
                status:402,
                message:err.sqlMessage
            });
        }
        else{
            res.send({
                status:200,
                message:'Data deleted Successfully'
            });
        }
    })
})

tcs.listen(5003,()=>{
    console.log('running on 5003');
});