import $ from "npm-zepto";

var RenderUtils ={
  render: (container, template, json) =>{
    $(container).append(template(json));
  }
}

module.exports = RenderUtils;
