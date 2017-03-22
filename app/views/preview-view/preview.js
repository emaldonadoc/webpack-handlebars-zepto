import View from "../../base/view"
import template from "./preview-view.hbs"
import utils from '../../utils/utils';
import ReaderView from '../reader-view/reader'
var container = "#app";

export default class Preview extends View {

  constructor (data) {
    super(container, template, data);
    this.data = data;
  }

  attach () {
      $('#rtx-cancel-preview').click(utils.goHome);
      $('#rtx-submit-preview').click(this.confirmBol.bind(this));
  }

  confirmBol (e) {
    e.preventDefault;
    e.stopPropagation();
    new ReaderView({id: this.data.bolId, number:this.data.bolNumber});
  }
}
