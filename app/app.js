import $ from "npm-zepto";
import FirsFormView from "./first-form-view/first-form"
const normalize =  require("./css/normalize.css")
const skeleton = require("./css/skeleton.css")

/*entry point application*/
export default class Application {
    init () {
      $(document).ready( () => { new FirsFormView(); });
    }
}

new Application().init();
