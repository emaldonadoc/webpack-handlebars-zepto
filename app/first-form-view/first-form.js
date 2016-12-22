import $ from "npm-zepto";
import View from "../base/view"
import template from "./first-form-view.hbs"
var container = "#app";

export default class FirsFormView extends View {

  constructor (data) {
    super(container, template, data);
  }

  attach () {
    console.log("ATTACH FUNCTION ");
    $('#entry-form').click( (e) =>{
        e.preventDefault;
        console.log("click on entry form");
    });
  }
}
