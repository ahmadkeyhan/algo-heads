"use strict";
(() => {
var exports = {};
exports.id = 531;
exports.ids = [531];
exports.modules = {

/***/ 717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSales)
/* harmony export */ });
async function getSales(req, res1) {
    try {
        let sales = await fetch("https://api.nftexplorer.app/v1/collections/stats/topNftSales/?collectionId=-23Svkt7qO6f", {
            method: "GET",
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXIiOiJ2MiIsImFkZHJlc3MiOiIzN1haRlEzUjdYT1E1S1JQSURPSzNCSzVPMk41VU5GSk9WNkgzTEFaQTZSNEtGUkhRR0tYRTQ1RE00IiwidGllciI6ImRldiIsImFyZWFzIjpbIi9hcnRpc3RzIiwiL2Fzc2V0cyIsIi9jb2xsZWN0aW9ucyIsIi9uZXR3b3JrIl0sImV4cCI6MTY1NTc5ODc3NCwiaWF0IjoxNjUzMjA2Nzc0fQ.UjPjFjLxCJvXuXzHpaJgw8GSMCCsrh9Tg2wjiBUFbMU"
            }
        }).then((res)=>res.json()
        );
        return res1.json({
            message: sales
        });
    } catch (error) {
        return res1.json({
            message: new Error(error)
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
var __webpack_exports__ = (__webpack_exec__(717));
module.exports = __webpack_exports__;

})();