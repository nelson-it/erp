//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/purchase/detail.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehousePurchase extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'purchase',
      showids   : [ 'purchaseid'],

      okfunction   : 'purchase_ok',
      okcols       : [ 'purchaseid', 'partid', 'partvendorid', 'count', 'expected', 'ownerid', 'crmorderid' ],
      oktyps       : { count : 'long', expected : 'long'},

      delfunction  : 'purchase_del',
      delcols       : [ 'purchaseid', 'force' ],
      deltyps       : {  force : 'bool'},
      delconfirmids : [ 'ordernumber'],

      sendfunction : 'purchase_send',
      sendcols       : [ 'purchaseid', 'single' ],
      sendtyps       : {  single : 'bool'},

      deliveredfunction : 'purchase_delivered',
      deliveredcols     : [ 'purchaseid' ],
      deliveredtyps     : {},

      report       : 'report',
      reportall    : 'mne_warehouse_purchase',
      reportsingle : 'mne_warehouse_purchase_single',

      orderpartschema : 'mne_warehouse',
      orderpartquery : 'orderproductpart',

      regexp    : { crmordernumber : 'ok', crmorder : 'ok', ownername : 'notempty', vendorname : 'notempty' },
      defalias  : { partid : 'partid', partname : 'partname', rescount : 'rescount' },
      defvalues : { ownerid : MneConfig.personid, ownername : MneConfig.fullname },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id: "printsingle", value : MneText.getText("#mne_lang#Einzeldruck#"), space : "before" });
    this.obj.mkbuttons.push( { id: "send", value : MneText.getText("#mne_lang#Versenden#") });
    this.obj.mkbuttons.push( { id: "sendsingle", value : MneText.getText("#mne_lang#Einzeln versenden#") });

    this.obj.enablebuttons.buttons.push('printsingle');
    this.obj.enablebuttons.buttons.push('send');
    this.obj.enablebuttons.buttons.push('sendsingle');

    this.obj.enablebuttons.values.push('printsingle');
    this.obj.enablebuttons.values.push('send');
    this.obj.enablebuttons.values.push('sendsingle');
  }
  
  async send()
  {
    this.obj.run.values.single = false;
    
    await this.func('send');
    this.dependweblet = this;
    await this.check_values();
    
    await this.print();

    return false;
  }

  async sendsingle()
  {
    this.obj.run.values.single = true;
    
    await this.func('send');
    this.dependweblet = this;
    await this.check_values();
    
    await this.printsingle();

    return false;
  }
  

  getPrintParam()
  {
    this.obj.printparam =
    {
        wval : this.obj.inputs.purchaseid.getValue(),
        wop  : "=",
        wcol : 'purchaseid',
        sort : '',
    }

    if ( this.obj.outputs.orderdate.getValue() == '' )
      this.obj.printparam.macro0 = 'watermark,' + MneText.getText('#mne_lang#Entwurf');

    return super.getPrintParam();
  }

  async printsingle()
  {
    this.initpar.report = this.initpar.reportsingle;
    return super.print();
  }

  async print()
  {
    this.initpar.report = this.initpar.reportall;
    return super.print();
  }
  
  async values()
  {
    super.values();
    MneElement.mkClass( this.obj.container.weblet, 'ignorewrong', !! this.obj.run.values.deliverydate )

  }
}

export default MneErpWarehousePurchase;
