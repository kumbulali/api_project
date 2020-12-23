require("dotenv").config();
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const userRouter = require("./api/users/user.router");
const profileRouter = require("./api/profiles/profiles.router");
const matchRouter = require("./api/matches/matches.router");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/matches", matchRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log("Sunucu",process.env.APP_PORT,"numaralı port üzerinden çalışıyor...");
});