//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/shipment/invoice.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpShipmentInvoice extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {

      schema   : 'mne_shipment',
      query    : 'invoice_detail',
      showids  : ['invoiceid'],
      distinct : 'true',

      orderweblet : 'crm_order',
      orderselect : 'all',

      report : 'mne_invoice',
      invoicereport : 'mne_invoice',
      reminder1report : 'mne_reminder1',
      reminder2report : 'mne_reminder2',
      reminder3report : 'mne_reminder3',

      okfunction : 'invoice_ok',
      okcols  : [ 'invoiceid','ownerid','textid','condid','withtimesheet','paysum','invoicetime' ],
      oktyps  : { 'checked' : 'bool', 'checked' : 'double', 'invoicetime' : 'long' },

      delfunction   : 'invoice_del',
      delcols       : [ 'invoiceid' ],
      deltyps       : {},
      delconfirmids : [ 'num'],

      sendfunction      : 'invoice_send',
      payedfunction     : 'invoice_payed',
      reminder1function : 'invoice_reminder1',
      reminder2function : 'invoice_reminder2',
      reminder3function : 'invoice_reminder3',
        
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
  
  reset()
  {
    super.reset();

    this.obj.mkbuttons.push( { id : "send",      value : MneText.getText('#mne_lang#Versenden#'),  space : 'before' });
    this.obj.mkbuttons.push( { id : "payed",     value : MneText.getText('#mne_lang#Bezahlt#'),    space : 'before' });
    this.obj.mkbuttons.push( { id : "reminder1", value : MneText.getText('#mne_lang#1. Mahnung#'), space : 'before' });
    this.obj.mkbuttons.push( { id : "reminder2", value : MneText.getText('#mne_lang#2. Mahnung#')});
    this.obj.mkbuttons.push( { id : "reminder3", value : MneText.getText('#mne_lang#3. Mahnung#')});

    this.obj.enablebuttons.buttons.push('send');
    this.obj.enablebuttons.buttons.push('payed');
    this.obj.enablebuttons.buttons.push('reminder1');
    this.obj.enablebuttons.buttons.push('reminder2');
    this.obj.enablebuttons.buttons.push('reminder3');
    
    this.obj.enablebuttons.values.push('send');
    this.obj.enablebuttons.values.push('payed');
    this.obj.enablebuttons.values.push('reminder1');
    this.obj.enablebuttons.values.push('reminder2');

  }
  
  getPrintParam()
  {
    this.obj.printparam =
    {
        wval : this.obj.inputs.invoiceid.getValue(),
        wop  : "=",
        wcol : 'invoiceid',
        sort : '',
        macro0 : "lettersubject,\\Hordernumber: \\Bordernumber\\newline\\Hnum: \\Bnum",
        macro1 : "nosalutation,true",
        language : this.obj.outputs.language.getValue(),

        sqlstart : 1,
        sqlend   : 1
    };

    if ( this.obj.run.values.condid == '' ) 
    {
      MneLog.warning(MneText.getText('#mne_lang#Bitte Rechnungskonditionen auswählen'));
      return;
    }

    if ( this.obj.run.values.textid == '' ) 
    {
      MneLog.warning(MneText.getText('#mne_lang#Bitte Rechnungstext auswählen'));
      return;
    }

    return super.getPrintParam();
  }
  
  async send()
  {
    await this.func('send');
    this.print();
    this.dependweblet = this;
  }

  async payed()
  {
    await this.func('payed');
    this.dependweblet = this;
  }

  async print()
  {
    this.initpar.report = this.initpar.invoicereport;
    return super.print();
  }

  async reminder1()
  {
    await this.func('reminder1');
    this.initpar.report = this.initpar.reminder1report;
    super.print();
    this.dependweblet = this;
  }

  async reminder2()
  {
    await this.func('reminder2');
    this.initpar.report = this.initpar.reminder2report;
    super.print();
    this.dependweblet = this;
  }

  async reminder3()
  {
    await this.func('reminder3');
    this.initpar.report = this.initpar.reminder3report;
    super.print();
    this.dependweblet = this;
  }

}

export default MneErpShipmentInvoice;
