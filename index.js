import express from 'express'; //載入express框架模組
import { MongoClient } from "mongodb";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

let connectStatus = "closed";

const uri = process.env.MONGODB_URL;



async function run() {
    connectStatus = "start connect";

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    connectStatus = "start Establish and verify connection";
    // Establish and verify connection
    const db = client.db("reserveProcess");
    await db.command({ ping: 1 });

    connectStatus = "start table collection connection";
    // examTable = await connectTable("exam", { tls: true });
    // groupTable = await connectTable("group", { tls: true });
    // processTable = await connectTable("process", { tls: true });
    // updateTimeTable = await connectTable("update time", { tls: true });

    connectStatus = "ok";
    console.log(new Date() + "資料庫資料完成連接")
}
run().catch(console.dir);


async function connectTable(table) {

    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    const db = client.db("reserveProcess");
    const collection = await db.collection(table, { tls: true });
    return collection;
}


let app = express();


app.use(cors({
    origin: '*',
}));


app.listen(3000 || process.env.PORT, () => {
    console.log(new Date() + "開始監聽port 3000!");
});

app.get("/getExamSelect", async(req, res) => {
    try {
        const examTable = await connectTable("exam");
        const examList = await examTable.find({ school: req.query.school }).toArray();
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
        const groupTable = await connectTable("group", { tls: true });
        return res.status(200).json(await groupTable.find({ school: req.query.school, examNo: '' + req.query.examNo }).toArray());
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});

app.get("/getReserveProcess", async(req, res) => {
    //group list
    try {
        const groupTable = await connectTable("group", { tls: true });
        return res.status(200).json(await groupTable.findOne({ school: req.query.school, examNo: '' + req.query.examNo, groupNo: '' + req.query.groupNo }));
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});

app.get("/getUserRank", async(req, res) => {
    //user rank
    try {
        const processTable = await connectTable("process", { tls: true });
        return res.status(200).json(await processTable.findOne({ groupId: req.query.groupId, userId: req.query.userId }));
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
        const updateTimeTable = await connectTable("update time", { tls: true });
        return res.status(200).json(await updateTimeTable.findOne({ school: req.query.school, examNo: req.query.examNo }));
    } catch (error) {
        return res.status(500).json({
            result: null
        })
    }
});