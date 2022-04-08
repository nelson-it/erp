//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/order/detail.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneConfig   from '/js/basic/config.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpOrderDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema : 'mne_crm',
        query  : 'order_detail',
        table  : "order",
      showids       : ['orderid'],
      
      okschema   : 'mne_crm',
      okfunction : 'order_ok',
      okcols     : [ 'orderid', 'ownerid', 'contactid', 'refid', 'ordernumber', 'description', 'xtext', 'language', 'withvat', 'lumpsum', 'open', 'closed', 'color'] , 
      oktyps     : { withvat :  "long", lumpsum :  "long", open : "bool", closed : "bool" },

      delschema     : 'mne_crm',
      delfunction   : 'order_del',
      delcols       : [ 'orderid'],
      delconfirmids : [ 'ordernumber', 'description'],

      deliverschema   : 'mne_crm',
      deliverfunction : 'order_deliver',
      deliverscreen   : 'shipment_deliverynote',

      docschema  : 'mne_crm',
      doctable   : 'file',

      links  : {},
      report : 'mne_orderdetail',
      
      regexp : { refname : 'notempty' },
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url).replace(/\.html$/, this.obj.run.viewnum + ".html")  }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    this.obj.run.viewnum = 2;
    
    this.obj.mkbuttons.push( { id : "send", value : MneText.getText("#mne_lang#Versenden#"), space : 'before' });
    this.obj.mkbuttons.push( { id : "deliver", value : MneText.getText("#mne_lang#Ausliefern#",) });
 
    this.obj.enablebuttons.buttons.push('send');
    this.obj.enablebuttons.buttons.push('deliver');

    this.obj.enablebuttons.values.push('send');
    this.obj.enablebuttons.values.push('deliver');
  }
  
  async load()
  {
    await super.load();
    this.obj.checkboxs.view.checked = (this.obj.run.viewnum == 1);
  }
  
  async view(data, obj, evt)
  {
    var text;
    if ( this.obj.inputs.text )
    {
      this.obj.inputs.xtext.modValue(this.obj.inputs.text.getValue());
      text = this.obj.inputs.text.editor.getValue(true);
    }
    else
    {
      text = this.obj.htmlvalue;
    }

    await super.view(data, obj, evt);
    
    if ( text && this.obj.inputs.text )
      this.obj.inputs.text.modValue(text);
    else
      this.obj.htmlvalue = text;

    return false;
  }
  
  async deliver()
  {
    var p =
    {
        schema : this.initpar.deliverschema,
        name : this.initpar.deliverfunction,
        par0 : this.obj.inputs.orderid.getValue(),
        typ0 : "text",
        sqlstart : 1,
        sqlend : 1
    }
    var res = await MneRequest.fetch('/db/utils/connect/func/execute.json', p);

     if ( MneConfig.group.erpshipment == true )
       this.showweblet(this.initpar.deliverscreen, { deliverynoteid : res.result })
  }


  async add(data)
  {
    this.initpar.links.refname = undefined;
    this.initpar.links.contactname = undefined;
    return super.add(data);
  }

  async ok()
  {
    if ( this.obj.inputs.text )
      this.obj.inputs.xtext.modValue(this.obj.inputs.text.getValue());
    
    return super.ok();
  }
  
  getPrintParam()
  {
    this.obj.printparam =
    {
        wval : this.obj.run.values.orderid,
        wop  : "=",
        wcol : 'orderid',
        sort : '',
        language : this.obj.inputs.language.value,
        xml0   : "lettercontent," + (( this.obj.inputs.text  ) ? this.obj.inputs.text.getValue() : this.obj.inputs.xtext.getValue()),
        macro0 : 'havelettercontent,1',
        sqlstart : 1,
        sqlend : 1
    };

    if ( this.obj.inputs.text && this.obj.inputs.text.getModify() )
      this.obj.printparam.macro1 = 'watermark,' + MneText.getText('#mne_lang#Entwurf');

    return super.getPrintParam();
  }
  
  async send()
  {
    if ( this.getModify() )
    {
      MneLog.error('#mne_lang#Zum Versenden muss der Auftrag gespeichert sein');
      return false;
    }
    
    await this.print();
    
    var d = MneText.toDateTime((new Date()).getTime() / 1000);
    var p =
    {
        schema : this.initpar.docschema,
        table  : this.initpar.doctable,

        fileidInput      : '################',
        refidInput       : this.obj.inputs.refid.getValue(),
        secondrefidInput : this.obj.inputs.orderid.getValue(),
        typInput         : 'letter',
        datatypeInput    : 'application/pdf',
        authorInput      : MneConfig.username,
        nameInput        : '#mne_lang#Auftragsbestätigung vom# ' + d,
        descriptionInput : '#mne_lang#Auftragsbestätigung vom# ' + d,
        uidInput         : this.obj.inputs.orderid.value,
        dataInput        : await this.obj.weblets['show'].base64(),

        sqlstart         : 1,
        sqlend           : 1
    };

    await MneRequest.fetch("/db/utils/table/insert.xml",  p );
    this.newselect = true;
  }

  async values()
  {
    await super.values();
    
    if ( this.obj.run.values.refid && this.obj.run.values.refid != '' )
      this.initpar.links.refname  = ( this.obj.run.values.refiscompany ) ? { name : 'crm_company', values : { companyid : 'refid' }} : { name : 'crm_person', values : { personid : 'refid' }};
      
    if ( this.obj.run.values.contactid && this.obj.run.values.contactid != '' )
      this.initpar.links.contactname  = { name : 'crm_person', values : { personid : 'contactid' }};
  }
}

export default MneErpOrderDetail;
