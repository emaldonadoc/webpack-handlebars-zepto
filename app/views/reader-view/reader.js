import View from "../../base/view"
import template from './reader-view.hbs'
import utils from '../../utils/utils'
import Globals from "../../utils/globals"
import Preview from '../preview-view/preview'
var container = "#app";
var readerInterval;
var that;
//var licenseTest = 'ANSI 636015030002DL00410233ZT02740015DLDCACMDCBNONEDCDNONEDBA03222019DCSWORRELLDCTMICHAEL ALLANDBD03212013DBB03221960DBC1DAYGRNDAU 70 INDAG25 W BROKEN OAK CTDAITHE WOODLANDSDAJTXDAK773810000  DAQ24356087DCF24211320037251807457DCGUSADCHNONEDAZBRODCUZTZTA210ZTBW'
export default class Reader extends View {

  constructor (data) {
    super(container, template, data);
    that = this;
    this.readInterval();
  }

  attach () {
    this.message = $('#rtx-message');
    this.nextBtn = $('#rtx-reading-next');
    this.cancelBtn = $('#rtx-reading-cancel');
    this.cancelBtn.click(utils.goHome.bind(this));
    this.nextBtn.click(this.finishBol.bind(this));
    this.hiddenInput = $('#reader-hidden-license');
    this.hiddenInput.focus();
  }

  parseHiddenInput(text){
    console.log(["text", text]);

    let licenseObj = {
      name: this.findName(text),
      state: this.findState(text),
      licenseNumber: this.findLicenseNumber(text)
    };

    return licenseObj;
  }

  findName (text) {
    console.log(["text lenght", text.length]);

    let fullname ="";
    let index = text.indexOf("DAA")
    console.log(["Seaching Fullname"]);
    fullname = this.existValue(text, index);
    /*GET FULL NAME */
    if(fullname){
      return fullname;
    }
    /*FIND FIRST AND LASTNAME*/
    let indexFirst = text.indexOf("DCT");

    let lastName ="";
    console.log(["Searching Firstname DCT"]);

    let firstName = this.existValue(text, indexFirst);
    let indexLast = text.indexOf("DCS");
    if(firstName){
      console.log("firstName found")
      console.log(["searching second name DCS index", indexLast]);
      lastName = this.existValue(text, indexLast);
      return firstName + " " +(lastName ? lastName : "");
    }

    indexFirst = text.indexOf("DAC");
    console.log(["Searching Firstname DAC"]);
    firstName = this.existValue(text, indexFirst);
    if(firstName){
      console.log("firstName found")
      lastName = this.existValue(text, indexLast);
      return firstName + " " +(lastName ? lastName : "");
    }

  }

  findState (text) {
    let index = text.indexOf("DAJ")
    console.log(["Seaching State"]);
    return this.existValue(text, index);
  }

  findLicenseNumber (text) {
    let index = text.indexOf("DAQ")
    console.log(["Seaching License number DAQ"]);
    return this.existValue(text, index);
  }

  existValue (text, index) {
    let value= "";
    if(index > -1 ){
      value= this.getValue(text, index);
      return value;
    }
    return false;
  }

  getValue (text, index) {

    let keys = utils.keys;
    let sub = text.substring(index);
    console.log(["Substring to split", sub]);
    let minIndexKey = 1000;

    for(let i=0; i < keys.length; i++) {
      let indexKey= sub.indexOf( keys[i], 5 );
       if( indexKey> -1 && minIndexKey > indexKey ){
         minIndexKey= indexKey;
       }
    }

    console.log(["Min index found", minIndexKey]);
    let value  = sub.substring(3, minIndexKey);
    console.log(["VALUE GOT:", value]);
    return value;
  }

  readInterval () {
    readerInterval = window.setInterval(this.inputHandling , 3000);
  }

  inputHandling() {
    let value = that.hiddenInput.val();
    if(value != ""){
      clearInterval(readerInterval);
      $('#magnify').hide();
      that.cancelBtn.hide();
      that.hiddenInput.hide();
      that.nextBtn.show();
      $('#rtx-reader-title').text("Driver's license has been read.");
    }
    that.hiddenInput.focus();
  }


  finishBol (e) {
    e.preventDefault();
    e.stopPropagation();
    let licenseObj =  this.parseHiddenInput(this.hiddenInput.val());
    this.message.text("");
    that.nextBtn.hide();

    this.saveRawRequest( {bol: $('#rtx-reader').data('id'), raw: this.hiddenInput.val() } );

    if(!this.validLicenseData(licenseObj)) {
      this.message.css('color', 'red');
      this.message.text("ERROR: Problem reading DL data. Please click Return and try again.");
      this.cancelBtn.show();
      return;
    }

    this.cancelBtn.hide();

    this.doRequest({
      id: $('#rtx-reader').data('id'),
      name: licenseObj.name,
      license: licenseObj.licenseNumber,
      state: licenseObj.state
    });
  }

  saveRawRequest (json) {
    utils.ajax('POST', "/CommandCenter/kiosk/SaveRecord.rlx",
      this,
      $.noop,
      $.noop,
      $.noop,
      json);
  }

  validLicenseData (licenseObj) {
    return (licenseObj.name && licenseObj.licenseNumber && licenseObj.state);
  }

  doRequest(json){
    utils.ajax('POST', "/CommandCenter/kiosk/FinishBOL.rlx",
      this,
      this.confirmBOLSuccess,
      this.confirmBOLError,
      $.noop,
      json);
  }

  confirmBOLSuccess (data) {
    console.debug(["CONFIRM BOL SUCCESS", data]);
    this.hiddenInput.val('');
    let json = JSON.parse(data)
    if (json.success) {
      this.message.css('color', 'blue');
      this.message.text("BOL has been finish !!");
      window.setTimeout ( () =>{
          utils.goHome();
      },7000);
      return;
    }

    this.confirmBOLError(json);
  }

  confirmBOLError (json) {
    this.hiddenInput.val('');
    let number = $('#rtx-reader').data('number');
    this.message.css('color', 'red');
    this.message.text(json.message || `Error on Finish BOL ${number}, please try again`);
    this.cancelBtn.show();
  }

}
