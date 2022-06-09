"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 412:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(399);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _NavSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(556);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_NavSlider__WEBPACK_IMPORTED_MODULE_1__]);
_NavSlider__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const Layout = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default().main),
            children: children
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 556:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony export default */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(197);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_5__]);
framer_motion__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function NavSlider({ colorCode  }) {
    const { 0: width , 1: setWidth  } = useState(360);
    const { 0: height , 1: setHeight  } = useState(640);
    useEffect(()=>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    });
    const router = useRouter();
    const routes = [
        "/",
        "/headlist",
        "/roadmap"
    ];
    function NavDot({ route  }) {
        return /*#__PURE__*/ _jsx("div", {
            onClick: ()=>router.push(route)
            ,
            className: styles.navLink,
            children: /*#__PURE__*/ _jsx("div", {
                style: {
                    backgroundColor: darkColorPalette[colorCode]
                },
                className: styles.navSlide
            })
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        children: /*#__PURE__*/ _jsxs("div", {
            style: {
                borderColor: darkColorPalette[colorCode]
            },
            className: styles.navSlider,
            children: [
                /*#__PURE__*/ _jsx(motion.div, {
                    style: {
                        color: darkColorPalette[colorCode]
                    },
                    className: styles.routeIcon,
                    children: routes.indexOf(router.route) == 0 ? /*#__PURE__*/ _jsx(MdIcons.MdHome, {}) : routes.indexOf(router.route) == 1 ? /*#__PURE__*/ _jsx(MdIcons.MdFace, {}) : /*#__PURE__*/ _jsx(RiIcons.RiRouteFill, {})
                }),
                /*#__PURE__*/ _jsx(motion.div, {
                    style: {
                        color: darkColorPalette[colorCode],
                        borderColor: darkColorPalette[colorCode],
                        backgroundColor: lightColorPalette[colorCode]
                    },
                    animate: {
                        top: `${routes.indexOf(router.route) * 2.25 - 0.1875}rem`
                    },
                    transition: {
                        duration: 0.2
                    },
                    className: styles.routeCatcher
                }),
                /*#__PURE__*/ _jsx(NavDot, {
                    route: routes[0]
                }),
                /*#__PURE__*/ _jsx(NavDot, {
                    route: routes[1]
                }),
                /*#__PURE__*/ _jsx(NavDot, {
                    route: routes[2]
                })
            ]
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 484:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(412);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Layout__WEBPACK_IMPORTED_MODULE_1__]);
_components_Layout__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 41:
/***/ ((module) => {

module.exports = require("react-icons/md");

/***/ }),

/***/ 98:
/***/ ((module) => {

module.exports = require("react-icons/ri");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 197:
/***/ ((module) => {

module.exports = import("framer-motion");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [399], () => (__webpack_exec__(484)));
module.exports = __webpack_exports__;

})();