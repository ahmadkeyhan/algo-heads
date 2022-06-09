"use strict";
(() => {
var exports = {};
exports.id = 806;
exports.ids = [806];
exports.modules = {

/***/ 632:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "connectToDatabase": () => (/* binding */ connectToDatabase)
});

;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./lib/mongodb.js

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;
if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
}
if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
}
let cachedClient = null;
let cachedDb = null;
async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        };
    }
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    let client = new external_mongodb_namespaceObject.MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);
    cachedDb = db;
    cachedClient = client;
    return {
        client: cachedClient,
        db: cachedDb
    };
}


/***/ }),

/***/ 698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTasks)
/* harmony export */ });
const { connectToDatabase  } = __webpack_require__(632);
async function getTasks(req, res) {
    try {
        let { db  } = await connectToDatabase();
        let tasks = await db.collection("tasks").find({}).sort({
            _id: -1
        }).toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(tasks))
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(698));
module.exports = __webpack_exports__;

})();