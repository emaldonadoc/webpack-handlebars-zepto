import $ from "npm-zepto";
import FirsFormView from "./first-form-view/first-form"

/*entry point application*/
export default class Application {
    init () {
      $(document).ready( () => { new FirsFormView(); });
    }
}

new Application().init();
