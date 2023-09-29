"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// в данной реализации я попытался писать минимальное кол-во кода
// + пытался сделать реализацию, похожую на реальный проект: связать проект с БД и кидать запросики на сортировку/поиск непосредственно
// в mySQL, без написания кода в самой node
const app = (0, express_1.default)();
const port = 2005;
const cors = require("cors");
const bodyParser = require("body-parser");
// функция получения данных с сервера
// эту фукнцию я написал чисто из собственного удобства и истетичского кайфа, если можно так выразится, а не для экономии строк кода
// и оптимизации (хотя, в некоторых моментах оптимизация имеется)
// (переходим туда)
const { GettingDataFromDatabase } = require("./server/utils/gettinData");
// а вот и подключение к базе данных
// database connection
const { db } = require("./server/global/db_connect");
//
// static files
// подключение статических файлов
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "front", "styles")));
app.use(express_1.default.static(path_1.default.join(__dirname, "../", "front", "scripts")));
//
//
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//
// main
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../", "front", "public", "main_page.html"));
});
app.get("/catalog", (req, res) => {
    GettingDataFromDatabase(db, "SELECT * FROM catalog", (err, data) => {
        if (err)
            throw Error;
        res.json(data);
    });
});
//
// basket (корзина)
app.post("/add-to-cart", (req, res) => {
    db.query("INSERT INTO basket SET ?", req.body.phone);
    res.send("Data sent successfully");
});
app.get("/basket", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../", "front", "public", "basket_page.html"));
});
app.get("/basket_data", (req, res) => {
    GettingDataFromDatabase(db, "SELECT * FROM basket", (err, data) => {
        if (err)
            throw Error;
        res.json(data);
    });
});
app.post("/remove-from-cart", (req, res) => {
    db.query(`DELETE FROM basket WHERE id = ${req.body.phone.id}`);
    res.send("Data sent successfully");
});
//
// filter
app.get("/filtered-phones", (req, res) => {
    // получаем массив запросов на сортировку
    const arrayOfQueryValues = Object.values(req.query);
    // если пользователь сортирует только по цене
    if (arrayOfQueryValues.length === 1 &&
        (arrayOfQueryValues.indexOf("desc") !== -1 ||
            arrayOfQueryValues.indexOf("asc") !== -1)) {
        // сортируем запросом в БД
        GettingDataFromDatabase(db, `SELECT * FROM catalog ORDER BY price ${arrayOfQueryValues[0]}`, (err, data) => {
            if (err)
                throw Error;
            res.end(JSON.stringify(data));
        });
        // полная сортировка: бренд, цена
    }
    else {
        const array = [];
        for (let i = 0; i < arrayOfQueryValues.length; i++) {
            GettingDataFromDatabase(db, `SELECT * FROM catalog WHERE title LIKE ?`, (err, data) => {
                if (err)
                    throw Error;
                data === null || data === void 0 ? void 0 : data.map((e) => {
                    array.push(e);
                });
            }, [`%${arrayOfQueryValues[i]}%`]);
        }
        // если в массиве запросов имеется сортировка по цене - сортируем полученный массив
        setTimeout(() => {
            if (arrayOfQueryValues.indexOf("desc") !== -1) {
                res.end(JSON.stringify(array.sort((a, b) => b.price - a.price)));
            }
            else if (arrayOfQueryValues.indexOf("asc") !== -1) {
                res.end(JSON.stringify(array.sort((a, b) => a.price - b.price)));
            }
            else {
                res.end(JSON.stringify(array));
            }
        }, 200);
    }
});
//
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
