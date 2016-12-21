import $ from "npm-zepto";
import FirsFormView from "./first-form-view/first-form"


export default class Application {
    init () {
      $(document).ready( () => { new FirsFormView(); });
    }
}


new Application().init();
