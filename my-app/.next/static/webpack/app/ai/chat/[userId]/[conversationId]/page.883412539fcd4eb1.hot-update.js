"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/ai/chat/[userId]/[conversationId]/page",{

/***/ "(app-pages-browser)/./src/app/ai/chat/components/ChatMessageContainer.tsx":
/*!*************************************************************!*\
  !*** ./src/app/ai/chat/components/ChatMessageContainer.tsx ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatResponse: function() { return /* binding */ formatResponse; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_chat_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../styles/chat.module.css */ \"(app-pages-browser)/./src/styles/chat.module.css\");\n/* harmony import */ var _styles_chat_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_chat_module_css__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst formatResponse = (response)=>{\n    // Replace **text** with <strong>text</strong>\n    let formattedResponse = response.replace(/\\*\\*(.*?)\\*\\*/g, \"<strong>$1</strong>\");\n    // Handle numbered list items and paragraphs\n    const listItems = formattedResponse.match(RegExp(\"(\\\\d+\\\\..*?)(?=(\\\\d+\\\\.)|$)\", \"gs\"));\n    if (listItems) {\n        const listFormatted = listItems.map((item)=>\"<li>\".concat(item.trim(), \"</li>\")).join(\"<br />\");\n        formattedResponse = formattedResponse.replace(listItems.join(\"\"), \"<ul>\".concat(listFormatted, \"</ul>\"));\n    }\n    // Split the response into paragraphs\n    const paragraphs = formattedResponse.split(\"\\n\").filter((paragraph)=>paragraph.trim() !== \"\");\n    // Wrap each paragraph in <p> tags and add <br> tags between paragraphs\n    return paragraphs.map((paragraph)=>'<p className=\"user_Messages\">'.concat(paragraph.trim(), \"</p>\")).join(\"<br>\");\n};\nconst ChatMessage = (param)=>{\n    let { response, shouldAnimate = true } = param;\n    _s();\n    // console.log(\"Logging the responses in the main messaeg\", response)\n    // console.log(\"Logging the respsoneObejct In main\", responseObject)\n    const [displayedMessage, setDisplayedMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(shouldAnimate ? \"\" : formatResponse(response.response));\n    const [isTyping, setIsTyping] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(shouldAnimate);\n    const [lastMessageId, setLastMessageId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (shouldAnimate) {\n            setIsTyping(true);\n            setDisplayedMessage(\"\");\n        } else {\n            setIsTyping(false);\n            setDisplayedMessage(response.response);\n        }\n    }, [\n        response,\n        shouldAnimate\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (isTyping && displayedMessage.length < response.response.length) {\n            const timer = setTimeout(()=>{\n                setDisplayedMessage(response.response.slice(0, displayedMessage.length + 1));\n            }, 15);\n            return ()=>clearTimeout(timer);\n        } else if (isTyping) {\n            setIsTyping(false);\n        }\n    }, [\n        isTyping,\n        displayedMessage,\n        response\n    ]);\n    // useEffect(() => {\n    //   if (isTyping) {\n    //     setDisplayedMessage('');\n    //     setIsTyping(true);\n    //   } else {\n    //     setDisplayedMessage(response.response);\n    //   }\n    // }, [isTyping, response]);\n    const formattedMessage = formatResponse(displayedMessage);\n    const plainTextMessage = isTyping ? formattedMessage : formattedMessage;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            dangerouslySetInnerHTML: {\n                __html: plainTextMessage\n            },\n            className: (_styles_chat_module_css__WEBPACK_IMPORTED_MODULE_2___default().user_Messages)\n        }, void 0, false, {\n            fileName: \"/Users/sydneysanders/Desktop/CodeProjects/HustuleCode/HustleCode/my-app/src/app/ai/chat/components/ChatMessageContainer.tsx\",\n            lineNumber: 96,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/sydneysanders/Desktop/CodeProjects/HustuleCode/HustleCode/my-app/src/app/ai/chat/components/ChatMessageContainer.tsx\",\n        lineNumber: 95,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ChatMessage, \"9feEUH8462gCBX3T+DmIyDM1q0A=\");\n_c = ChatMessage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ChatMessage);\nvar _c;\n$RefreshReg$(_c, \"ChatMessage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvYWkvY2hhdC9jb21wb25lbnRzL0NoYXRNZXNzYWdlQ29udGFpbmVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE0QztBQUNXO0FBR2hELE1BQU1HLGlCQUFpQixDQUFDQztJQUM3Qiw4Q0FBOEM7SUFDOUMsSUFBSUMsb0JBQW9CRCxTQUFTRSxPQUFPLENBQUMsa0JBQWtCO0lBRzNELDRDQUE0QztJQUM1QyxNQUFNQyxZQUFZRixrQkFBa0JHLEtBQUssQ0FBQztJQUMxQyxJQUFJRCxXQUFXO1FBQ2IsTUFBTUUsZ0JBQWdCRixVQUFVRyxHQUFHLENBQUNDLENBQUFBLE9BQVEsT0FBbUIsT0FBWkEsS0FBS0MsSUFBSSxJQUFHLFVBQVFDLElBQUksQ0FBQztRQUM1RVIsb0JBQW9CQSxrQkFBa0JDLE9BQU8sQ0FBQ0MsVUFBVU0sSUFBSSxDQUFDLEtBQUssT0FBcUIsT0FBZEosZUFBYztJQUN6RjtJQUVBLHFDQUFxQztJQUNyQyxNQUFNSyxhQUFhVCxrQkFBa0JVLEtBQUssQ0FBQyxNQUFNQyxNQUFNLENBQUNDLENBQUFBLFlBQWFBLFVBQVVMLElBQUksT0FBTztJQUUxRix1RUFBdUU7SUFDdkUsT0FBT0UsV0FBV0osR0FBRyxDQUFDTyxDQUFBQSxZQUFhLGdDQUFpRCxPQUFqQkEsVUFBVUwsSUFBSSxJQUFHLFNBQU9DLElBQUksQ0FBQztBQUNsRyxFQUFFO0FBaUJGLE1BQU1LLGNBQTBDO1FBQUMsRUFBRWQsUUFBUSxFQUFFZSxnQkFBZ0IsSUFBSSxFQUFFOztJQU1qRixxRUFBcUU7SUFDckUsb0VBQW9FO0lBSXBFLE1BQU0sQ0FBQ0Msa0JBQWtCQyxvQkFBb0IsR0FBR3JCLCtDQUFRQSxDQUFTbUIsZ0JBQWdCLEtBQUtoQixlQUFlQyxTQUFTQSxRQUFRO0lBRXRILE1BQU0sQ0FBQ2tCLFVBQVVDLFlBQVksR0FBR3ZCLCtDQUFRQSxDQUFVbUI7SUFDbEQsTUFBTSxDQUFDSyxlQUFlQyxpQkFBaUIsR0FBR3pCLCtDQUFRQSxDQUFnQjtJQU1sRUMsZ0RBQVNBLENBQUM7UUFDUixJQUFJa0IsZUFBZTtZQUNqQkksWUFBWTtZQUNaRixvQkFBb0I7UUFDdEIsT0FBTztZQUNMRSxZQUFZO1lBQ1pGLG9CQUFvQmpCLFNBQVNBLFFBQVE7UUFDdkM7SUFDRixHQUFHO1FBQUNBO1FBQVVlO0tBQWM7SUFFNUJsQixnREFBU0EsQ0FBQztRQUNSLElBQUlxQixZQUFZRixpQkFBaUJNLE1BQU0sR0FBR3RCLFNBQVNBLFFBQVEsQ0FBQ3NCLE1BQU0sRUFBRTtZQUNsRSxNQUFNQyxRQUFRQyxXQUFXO2dCQUN2QlAsb0JBQW9CakIsU0FBU0EsUUFBUSxDQUFDeUIsS0FBSyxDQUFDLEdBQUdULGlCQUFpQk0sTUFBTSxHQUFHO1lBQzNFLEdBQUc7WUFDSCxPQUFPLElBQU1JLGFBQWFIO1FBQzVCLE9BQU8sSUFBSUwsVUFBVTtZQUNuQkMsWUFBWTtRQUNkO0lBQ0YsR0FBRztRQUFDRDtRQUFVRjtRQUFrQmhCO0tBQVM7SUFFekMsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQiwrQkFBK0I7SUFDL0IseUJBQXlCO0lBQ3pCLGFBQWE7SUFDYiw4Q0FBOEM7SUFDOUMsTUFBTTtJQUNOLDRCQUE0QjtJQUU1QixNQUFNMkIsbUJBQW1CNUIsZUFBZWlCO0lBRXhDLE1BQU1ZLG1CQUFtQlYsV0FBV1MsbUJBQW1CQTtJQUd2RCxxQkFDRSw4REFBQ0U7a0JBQ0MsNEVBQUNBO1lBQ0NDLHlCQUF5QjtnQkFBRUMsUUFBUUg7WUFBaUI7WUFDcERJLFdBQVdsQyw4RUFBb0I7Ozs7Ozs7Ozs7O0FBSXZDO0dBL0RNZ0I7S0FBQUE7QUFpRU4sK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9haS9jaGF0L2NvbXBvbmVudHMvQ2hhdE1lc3NhZ2VDb250YWluZXIudHN4PzgwZjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vLi4vLi4vLi4vc3R5bGVzL2NoYXQubW9kdWxlLmNzc1wiXG5cblxuZXhwb3J0IGNvbnN0IGZvcm1hdFJlc3BvbnNlID0gKHJlc3BvbnNlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAvLyBSZXBsYWNlICoqdGV4dCoqIHdpdGggPHN0cm9uZz50ZXh0PC9zdHJvbmc+XG4gIGxldCBmb3JtYXR0ZWRSZXNwb25zZSA9IHJlc3BvbnNlLnJlcGxhY2UoL1xcKlxcKiguKj8pXFwqXFwqL2csICc8c3Ryb25nPiQxPC9zdHJvbmc+Jyk7XG5cbiAgXG4gIC8vIEhhbmRsZSBudW1iZXJlZCBsaXN0IGl0ZW1zIGFuZCBwYXJhZ3JhcGhzXG4gIGNvbnN0IGxpc3RJdGVtcyA9IGZvcm1hdHRlZFJlc3BvbnNlLm1hdGNoKC8oXFxkK1xcLi4qPykoPz0oXFxkK1xcLil8JCkvZ3MpO1xuICBpZiAobGlzdEl0ZW1zKSB7XG4gICAgY29uc3QgbGlzdEZvcm1hdHRlZCA9IGxpc3RJdGVtcy5tYXAoaXRlbSA9PiBgPGxpPiR7aXRlbS50cmltKCl9PC9saT5gKS5qb2luKCc8YnIgLz4nKTtcbiAgICBmb3JtYXR0ZWRSZXNwb25zZSA9IGZvcm1hdHRlZFJlc3BvbnNlLnJlcGxhY2UobGlzdEl0ZW1zLmpvaW4oJycpLCBgPHVsPiR7bGlzdEZvcm1hdHRlZH08L3VsPmApO1xuICB9XG5cbiAgLy8gU3BsaXQgdGhlIHJlc3BvbnNlIGludG8gcGFyYWdyYXBoc1xuICBjb25zdCBwYXJhZ3JhcGhzID0gZm9ybWF0dGVkUmVzcG9uc2Uuc3BsaXQoJ1xcbicpLmZpbHRlcihwYXJhZ3JhcGggPT4gcGFyYWdyYXBoLnRyaW0oKSAhPT0gJycpO1xuXG4gIC8vIFdyYXAgZWFjaCBwYXJhZ3JhcGggaW4gPHA+IHRhZ3MgYW5kIGFkZCA8YnI+IHRhZ3MgYmV0d2VlbiBwYXJhZ3JhcGhzXG4gIHJldHVybiBwYXJhZ3JhcGhzLm1hcChwYXJhZ3JhcGggPT4gYDxwIGNsYXNzTmFtZT1cInVzZXJfTWVzc2FnZXNcIj4ke3BhcmFncmFwaC50cmltKCl9PC9wPmApLmpvaW4oJzxicj4nKTtcbn07XG5cblxuXG5pbnRlcmZhY2UgUmVzcG9uc2VPYmplY3QgeyBcbiAgcXVlc3Rpb246IHN0cmluZztcbiAgcmVzcG9uc2U6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENoYXRNZXNzYWdlUHJvcHMge1xuICByZXNwb25zZTogUmVzcG9uc2VPYmplY3Q7XG4gIHNob3VsZEFuaW1hdGU/OiBib29sZWFuO1xufVxuXG5cblxuY29uc3QgQ2hhdE1lc3NhZ2U6IFJlYWN0LkZDPENoYXRNZXNzYWdlUHJvcHM+ID0gKHsgcmVzcG9uc2UsIHNob3VsZEFuaW1hdGUgPSB0cnVlIH0pID0+IHtcblxuXG5cblxuXG4gIC8vIGNvbnNvbGUubG9nKFwiTG9nZ2luZyB0aGUgcmVzcG9uc2VzIGluIHRoZSBtYWluIG1lc3NhZWdcIiwgcmVzcG9uc2UpXG4gIC8vIGNvbnNvbGUubG9nKFwiTG9nZ2luZyB0aGUgcmVzcHNvbmVPYmVqY3QgSW4gbWFpblwiLCByZXNwb25zZU9iamVjdClcblxuXG5cbiAgY29uc3QgW2Rpc3BsYXllZE1lc3NhZ2UsIHNldERpc3BsYXllZE1lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nPihzaG91bGRBbmltYXRlID8gXCJcIiA6IGZvcm1hdFJlc3BvbnNlKHJlc3BvbnNlLnJlc3BvbnNlKSlcblxuICBjb25zdCBbaXNUeXBpbmcsIHNldElzVHlwaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHNob3VsZEFuaW1hdGUpO1xuICBjb25zdCBbbGFzdE1lc3NhZ2VJZCwgc2V0TGFzdE1lc3NhZ2VJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuXG5cblxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZEFuaW1hdGUpIHtcbiAgICAgIHNldElzVHlwaW5nKHRydWUpO1xuICAgICAgc2V0RGlzcGxheWVkTWVzc2FnZSgnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldElzVHlwaW5nKGZhbHNlKTtcbiAgICAgIHNldERpc3BsYXllZE1lc3NhZ2UocmVzcG9uc2UucmVzcG9uc2UpO1xuICAgIH1cbiAgfSwgW3Jlc3BvbnNlLCBzaG91bGRBbmltYXRlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNUeXBpbmcgJiYgZGlzcGxheWVkTWVzc2FnZS5sZW5ndGggPCByZXNwb25zZS5yZXNwb25zZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldERpc3BsYXllZE1lc3NhZ2UocmVzcG9uc2UucmVzcG9uc2Uuc2xpY2UoMCwgZGlzcGxheWVkTWVzc2FnZS5sZW5ndGggKyAxKSk7XG4gICAgICB9LCAxNSk7XG4gICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9IGVsc2UgaWYgKGlzVHlwaW5nKSB7XG4gICAgICBzZXRJc1R5cGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbaXNUeXBpbmcsIGRpc3BsYXllZE1lc3NhZ2UsIHJlc3BvbnNlXSk7XG5cbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBpZiAoaXNUeXBpbmcpIHtcbiAgLy8gICAgIHNldERpc3BsYXllZE1lc3NhZ2UoJycpO1xuICAvLyAgICAgc2V0SXNUeXBpbmcodHJ1ZSk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHNldERpc3BsYXllZE1lc3NhZ2UocmVzcG9uc2UucmVzcG9uc2UpO1xuICAvLyAgIH1cbiAgLy8gfSwgW2lzVHlwaW5nLCByZXNwb25zZV0pO1xuXG4gIGNvbnN0IGZvcm1hdHRlZE1lc3NhZ2UgPSBmb3JtYXRSZXNwb25zZShkaXNwbGF5ZWRNZXNzYWdlKVxuXG4gIGNvbnN0IHBsYWluVGV4dE1lc3NhZ2UgPSBpc1R5cGluZyA/IGZvcm1hdHRlZE1lc3NhZ2UgOiBmb3JtYXR0ZWRNZXNzYWdlO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHBsYWluVGV4dE1lc3NhZ2UgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMudXNlcl9NZXNzYWdlc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDaGF0TWVzc2FnZTsiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJzdHlsZXMiLCJmb3JtYXRSZXNwb25zZSIsInJlc3BvbnNlIiwiZm9ybWF0dGVkUmVzcG9uc2UiLCJyZXBsYWNlIiwibGlzdEl0ZW1zIiwibWF0Y2giLCJsaXN0Rm9ybWF0dGVkIiwibWFwIiwiaXRlbSIsInRyaW0iLCJqb2luIiwicGFyYWdyYXBocyIsInNwbGl0IiwiZmlsdGVyIiwicGFyYWdyYXBoIiwiQ2hhdE1lc3NhZ2UiLCJzaG91bGRBbmltYXRlIiwiZGlzcGxheWVkTWVzc2FnZSIsInNldERpc3BsYXllZE1lc3NhZ2UiLCJpc1R5cGluZyIsInNldElzVHlwaW5nIiwibGFzdE1lc3NhZ2VJZCIsInNldExhc3RNZXNzYWdlSWQiLCJsZW5ndGgiLCJ0aW1lciIsInNldFRpbWVvdXQiLCJzbGljZSIsImNsZWFyVGltZW91dCIsImZvcm1hdHRlZE1lc3NhZ2UiLCJwbGFpblRleHRNZXNzYWdlIiwiZGl2IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJjbGFzc05hbWUiLCJ1c2VyX01lc3NhZ2VzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/ai/chat/components/ChatMessageContainer.tsx\n"));

/***/ })

});