import $ from "npm-zepto";
import firstView from "./first-form-view/first-form-view.hbs"

export default class Application {
    constructor () {
      $(document).ready( () => {
        console.log("Document ready");
        $('#app').append( firstView({name: "death"}) );
      });
    }
}


new Application();
