import express from 'express'; //載入express框架模組
import { MongoClient } from "mongodb";
import cors from 'cors';


import * as dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGODB_URL;



async function connectTable(table) {

    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    const db = client.db("reserveProcess");
    const collection = await db.collection(table, { tls: true });
    return [client, collection];
}


let app = express();


app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use('/', express.static(__dirname + '/public')); //將整個server資料夾放到server上的/路徑


app.listen(3000 || process.env.PORT, () => {
    console.log(new Date() + "開始監聽port 3000!");
});


app.get("/getExamSelect", async(req, res) => {
    try {
        const [client, examTable] = await connectTable("exam");
        const examList = await examTable.find({ school: req.query.school }).sort({ '_id': -1 }).toArray();
        await client.close();
        return res.status(200).json(examList);
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }

});

app.get("/getGroupSelect", async(req, res) => {
    //group list
    try {
        const [client, groupTable] = await connectTable("group", { tls: true });
        const arr = await groupTable.find({ school: req.query.school, examNo: '' + req.query.examNo, year: req.query.year }).toArray();
        await client.close();
        return res.status(200).json(arr);
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});

app.get("/getReserveProcess", async(req, res) => {
    //group list
    try {
        const [client, groupTable] = await connectTable("group", { tls: true });
        const result = await groupTable.findOne({ school: req.query.school, examNo: '' + req.query.examNo, groupNo: '' + req.query.groupNo, year: req.query.year });
        await client.close();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});

app.get("/getUserRank", async(req, res) => {
    //user rank
    try {
        const [client, processTable] = await connectTable("process", { tls: true });
        const result = await processTable.findOne({ groupId: req.query.groupId, userId: req.query.userId, year: req.query.year });
        await client.close();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});

// app.get("/getStatus", async(req, res) => {
//     //user rank
//     try {
//         return res.status(200).json({ status: connectStatus })
//     } catch (error) {
//         return res.status(500).json({
//             result: null
//         })
//     }
// });

app.get("/getUpdateTime", async(req, res) => {
    try {
        const [client, updateTimeTable] = await connectTable("update time", { tls: true });
        const result = await updateTimeTable.findOne({ school: req.query.school, examNo: req.query.examNo, year: req.query.year });
        await client.close();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});