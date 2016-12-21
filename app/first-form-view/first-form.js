import $ from "npm-zepto";
import view from "./first-form-view.hbs"
import utils from "../utils/utils"
var container = "#app";

export default class FirsFormView {

  constructor () {
    this.render();
    this.attach();
  }

  render() {
    utils.render(container, view, /*data*/ {name: "death"});
  }

  attach () {
    $('#entry-form').click( (e) =>{
        e.preventDefault;
        console.log("click on entry form");
    });
  }
}
