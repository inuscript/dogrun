System.register(["./module.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var module_js_1, mod2, a;
    return {
        setters: [
            function (module_js_1_1) {
                module_js_1 = module_js_1_1;
                mod2 = module_js_1_1;
            }
        ],
        execute: function () {
            a = function () {
                module_js_1["default"]();
                mod2();
            };
            a();
        }
    };
});
