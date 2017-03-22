import Handlebars from 'handlebars/runtime';

export default class Helpers {
  constructor(){
    Handlebars.registerHelper('weightFormat', (data) => {
       return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +" lbs";
      }
    );

    Handlebars.registerHelper('getDriverName', (license) => {
       return license.firstName +" "+ license.secondName +" "+ license.lastName;
      }
    );

  }

}
