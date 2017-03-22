import $ from "npm-zepto"
import Globals from "./globals"

var Utils = {
  render: (container, template, json) =>{
    $(container).html(template(json));
  },

  ajax: (type, url, context, success, fail, complete, data) => {
    $.ajax({
      type: type || 'GET',
      url: url,
      data: data || {},
      context: context,
      success: success,
      fail: fail,
      complete: complete,
      cache: false
    });
  },

  goHome: (e) => {
    if(e) e.preventDefault;
    Globals.app.init();
  },

  keys: ["DA", "DB", "DC", "DD", "ZW"]

}

module.exports = Utils;
