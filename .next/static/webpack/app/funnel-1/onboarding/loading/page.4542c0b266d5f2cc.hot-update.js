"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/funnel-1/onboarding/loading/page",{

/***/ "(app-pages-browser)/./src/app/funnel-1/onboarding/loading/page.tsx":
/*!******************************************************!*\
  !*** ./src/app/funnel-1/onboarding/loading/page.tsx ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ LoadingPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction LoadingPage() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Show loading for 3 seconds then redirect\n        const timer = setTimeout(()=>{\n            router.push(\"/funnel-1/onboarding/recommendations\");\n        }, 3000);\n        return ()=>clearTimeout(timer);\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center px-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"max-w-2xl mx-auto text-center\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-8 relative\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#EA592D] mx-auto mb-8\"\n                    }, void 0, false, {\n                        fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n                        lineNumber: 23,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-2xl font-playfair text-gray-900 mb-6\",\n                    children: \"What if I told you that your ads and product aren't the problem?\"\n                }, void 0, false, {\n                    fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n                    lineNumber: 26,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-600\",\n                    children: \"Analyzing your growth potential...\"\n                }, void 0, false, {\n                    fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n                    lineNumber: 30,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n            lineNumber: 21,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/henry.berry/CascadeProjects/growth-funnel/src/app/funnel-1/onboarding/loading/page.tsx\",\n        lineNumber: 20,\n        columnNumber: 5\n    }, this);\n}\n_s(LoadingPage, \"vQduR7x+OPXj6PSmJyFnf+hU7bg=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = LoadingPage;\nvar _c;\n$RefreshReg$(_c, \"LoadingPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZnVubmVsLTEvb25ib2FyZGluZy9sb2FkaW5nL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ1U7QUFHNUIsU0FBU0U7O0lBQ3RCLE1BQU1DLFNBQVNGLDBEQUFTQTtJQUV4QkQsZ0RBQVNBLENBQUM7UUFDUiwyQ0FBMkM7UUFDM0MsTUFBTUksUUFBUUMsV0FBVztZQUN2QkYsT0FBT0csSUFBSSxDQUFDO1FBQ2QsR0FBRztRQUVILE9BQU8sSUFBTUMsYUFBYUg7SUFDNUIsR0FBRztRQUFDRDtLQUFPO0lBRVgscUJBQ0UsOERBQUNLO1FBQUtDLFdBQVU7a0JBQ2QsNEVBQUNDO1lBQUlELFdBQVU7OzhCQUNiLDhEQUFDQztvQkFBSUQsV0FBVTs4QkFDYiw0RUFBQ0M7d0JBQUlELFdBQVU7Ozs7Ozs7Ozs7OzhCQUdqQiw4REFBQ0U7b0JBQUdGLFdBQVU7OEJBQTRDOzs7Ozs7OEJBSTFELDhEQUFDRztvQkFBRUgsV0FBVTs4QkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXJDO0dBN0J3QlA7O1FBQ1BELHNEQUFTQTs7O0tBREZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZnVubmVsLTEvb25ib2FyZGluZy9sb2FkaW5nL3BhZ2UudHN4PzU4YzMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJ1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvYWRpbmdQYWdlKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gU2hvdyBsb2FkaW5nIGZvciAzIHNlY29uZHMgdGhlbiByZWRpcmVjdFxuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByb3V0ZXIucHVzaCgnL2Z1bm5lbC0xL29uYm9hcmRpbmcvcmVjb21tZW5kYXRpb25zJylcbiAgICB9LCAzMDAwKVxuXG4gICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcilcbiAgfSwgW3JvdXRlcl0pXG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctWyNGOUY4RjZdIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctMnhsIG14LWF1dG8gdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04IHJlbGF0aXZlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtMTYgdy0xNiBib3JkZXItdC0yIGJvcmRlci1iLTIgYm9yZGVyLVsjRUE1OTJEXSBteC1hdXRvIG1iLThcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtcGxheWZhaXIgdGV4dC1ncmF5LTkwMCBtYi02XCI+XG4gICAgICAgICAgV2hhdCBpZiBJIHRvbGQgeW91IHRoYXQgeW91ciBhZHMgYW5kIHByb2R1Y3QgYXJlbid0IHRoZSBwcm9ibGVtP1xuICAgICAgICA8L2gxPlxuXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICBBbmFseXppbmcgeW91ciBncm93dGggcG90ZW50aWFsLi4uXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIkxvYWRpbmdQYWdlIiwicm91dGVyIiwidGltZXIiLCJzZXRUaW1lb3V0IiwicHVzaCIsImNsZWFyVGltZW91dCIsIm1haW4iLCJjbGFzc05hbWUiLCJkaXYiLCJoMSIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/funnel-1/onboarding/loading/page.tsx\n"));

/***/ })

});