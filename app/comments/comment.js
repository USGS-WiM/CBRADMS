System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Comment;
    return {
        setters:[],
        execute: function() {
            Comment = (function () {
                function Comment(caseid, comment, id) {
                    this.caseid = caseid;
                    this.comment = comment;
                    this.id = id;
                }
                return Comment;
            }());
            exports_1("Comment", Comment);
        }
    }
});
//# sourceMappingURL=comment.js.map