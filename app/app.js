import $ from "npm-zepto";
import firstView from "./first-form-view/first-form-view.hbs"
import utils from "./utils/utils"

export default class Application {
    constructor () {}

    init () {
      $(document).ready( () => {
        utils.render('#app', firstView, {name: "death"});

        $('#entry-form').click( (e) =>{
            e.preventDefault;
            console.log("click on entry form");
        });

      });
    }
}


new Application().init();
