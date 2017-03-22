import $ from "npm-zepto";
import utils from "../utils/utils"

export default class View {
  constructor (container, template, data) {
    this.container = container;
    this.template = template;
    this.data = data;
    this.render();
    this.attach();
  }

  render() {
    utils.render(this.container, this.template, this.data);
  }

  attach() {/*Override this function*/ }

  modelUpdate(data) {
    this.data = data;
    this.render();
    this.attach();
  }

}
