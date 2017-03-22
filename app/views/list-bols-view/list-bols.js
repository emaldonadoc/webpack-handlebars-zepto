import $ from "npm-zepto";
import utils from "../../utils/utils"
import Globals from "../../utils/globals"
import View from "../../base/view"
import template from "./list-bols-view.hbs"
import PreviewView from "../preview-view/preview"
var container = "#app";
var bolsInterval;

export default class ListBols extends View {

  constructor (data) {
    super(container, template, data);
    this.doRequest(this);
    this.startInterval();
  }

  attach () {
    $('.list-bols-tr').click( this.showReader.bind(this) );
    this.divLoading = $('#list-bols-loading');
    this.divLoading.hide();
  }

  showReader (e){
    e.preventDefault;
    let currentTarget = $(e.currentTarget);
    let id = currentTarget.data('id');

    let index = this.findIdOnData(id);
    let bolData = Globals.data.bols[index];

    clearInterval(bolsInterval);
    new PreviewView(bolData);
  }

  findIdOnData (id) {
    let index = null;
    let bols = Globals.data.bols;
    for(let i=0; i< bols.length; i ++ ){
      if (bols[i].bolId == id){
        index = i;
        break;
      }
    }
    return index;
  }

  getBolsSuccess (data) {
    let json = JSON.parse(data);
    Globals.data = json;
    super.modelUpdate(json);
  }

  getBolsComplete () {
    let that = this;
    window.setTimeout( () => {
      this.divLoading.hide();
    }, 1500);
  }

  startInterval () {
    let that = this;
    bolsInterval = window.setInterval( () => { that.doRequest(that) }, 5000 );
  }

  doRequest( that) {
      that.divLoading.show();
      utils.ajax('GET', "/CommandCenter/kiosk/KioskBOLs.rlx",
        that,
        that.getBolsSuccess,
        $.noop,
        that.getBolsComplete);
  }
}
