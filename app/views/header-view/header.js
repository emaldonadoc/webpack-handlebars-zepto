import utils from '../../utils/utils';
import View from "../../base/view"
import template from "./header-view.hbs"
var container = "header";

export default class Header extends View {
  constructor (data) {
    super(container, template, data);
  }

  attach () {
    $('.header-link').click(utils.goHome);
  }
}
