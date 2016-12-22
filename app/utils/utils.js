import $ from "npm-zepto";

var Utils = {
  render: (container, template, json) =>{
    $(container).append(template(json));
  },

  ajax: (type, url, context, success, fail, complete) => {
    $.ajax({
      type: type,
      url: url,
      context: context,
      success: success,
      fail: fail,
      complete: complete
    });
  }
}

module.exports = Utils;
