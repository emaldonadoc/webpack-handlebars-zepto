const normalize =  require("./css/normalize.css")
const skeleton = require("./css/skeleton.css")
const cssApp = require("./css/app.css")

import $ from "npm-zepto"
import Globals from './utils/globals'
import Helpers from './helpers/Helpers'
import Header from './views/header-view/header'
import ListBols from "./views/list-bols-view/list-bols"

/*entry point application*/
export default class Application {
    init () {
      $(document).ready( () => {
         new Helpers();
         new Header();
         new ListBols();
       });
    }
}

var app = new Application();
Globals.app = app;
Globals.app.init();
