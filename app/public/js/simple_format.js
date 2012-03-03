
(function(exports) {

  exports.create_date = function(text) {
    
    if (typeof text == "undefined" || !text.replace) return null;

    // remove characters some browsers don't like
    text = text.replace("T", " ").replace(/\.\d\d\d\w$/, "");

    // split into pieces
    var arr = text.split(/[- :]/);

    return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  };

  exports.simple_format = function(text) {
    
    if (!text) return text;

    text = this.escape_html(text);

    if (typeof module == 'object') return text.replace(/\n/g, "<br>");
    else return text.replace(/\\n/g, "<br>");
  };

  exports.escape_html = function(s) {
    var MAP = {
       // '&': '&amp;',
       '<': '&lt;',
       '>': '&gt;',
       '"': '&#34;',
       "'": '&#39;'
    };
    var repl = function(c) { return MAP[c]; };
    // return s.replace(/[&<>'"]/g, repl);
    return s.replace(/[<>'"]/g, repl);
  };

})(typeof exports === 'undefined' ? this : exports);


