//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/shipment/deliverynote.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpShipmentDeliverynote extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema      : 'mne_shipment',
        query       : 'deliverynote_detail',
        showids     : ['deliverynoteid'],

        okfunction  : 'deliverynote_ok',
        okcols      : [ 'deliverynoteid', 'ownerid', 'contactid'],

        delfunction   : 'deliverynote_del',
        delcols       : [ 'deliverynoteid' ],
        delconfirmids : [ 'deliverynotenumber'],

        report : "mne_deliverynote",

        deliverfunction : 'deliverynote_ready',
        invoicefunction : 'deliverynote_invoice',

        invoicenumscreen   : 'shipment_invoice',
        ordernumberscreen  : 'crm_order',
        contactnamescreen  : 'crm_person',
        companyscreen   : 'crm_company',
        personscreen    : 'crm_person',

        linkspar        : { 
                            ordernumber :  { orderid   : 'orderid'   },
                            invoicenum  :  { invoiceid : 'invoiceid' },
                            contactname :  { personid  : 'contactid' },
                          },
                          
        delbutton : 'add',
        hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();

    this.obj.mkbuttons.push({ id: 'deliver', value : MneText.getText('#mne_lang#Ausliefern#'), space : 'before' });
    this.obj.mkbuttons.push({ id: 'invoice', value : MneText.getText('#mne_lang#Rechnung#') });

    this.obj.enablebuttons.buttons.push('invoice');
    this.obj.enablebuttons.buttons.push('deliver');

    this.obj.enablebuttons.values.push('invoice');
    this.obj.enablebuttons.values.push('deliver');

  }
  
  async print()
  {
    var p =
    {
        wval : this.obj.inputs.deliverynoteid.getValue(),
        wop  : "=",
        wcol : 'deliverynoteid',
        sort : '',
        macro0 : "lettersubject,\\Hordernumber: \\Bordernumber\\newline\\Hdeliverynotenumber: \\Bdeliverynotenumber",
        macro1 : "nosalutation,true",
        language : this.obj.outputs.language.getValue(),
        sqlstart : 1,
        sqlend : 1
    };

    return super.print({ param : p });
  }

  async deliver()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.deliverfunction,
        par0 : this.obj.inputs.deliverynoteid.getValue(),
        typ0 : "text",

        sqlstart : 1,
        sqlend   : 1
    };

    await MneRequest.fetch('/db/utils/connect/func/execute.json', p );
    await this.print();
    this.dependweblet = this;
  }
  
  async invoice()
  {
    var p =
    {
        schema : this.initpar.schema,
        name : this.initpar.invoicefunction,
        par0 : this.obj.inputs.deliverynoteid.getValue(),
        typ0 : "text",

        sqlstart : 1,
        sqlend   : 1
    };

    var res = await MneRequest.fetch('/db/utils/connect/func/execute.json', p);
    this.showweblet(this.initpar.invoicenumscreen, { invoiceid : res.result })
  }


  async add()
  {
    this.initpar.links.refid = undefined;
    return super.add();
  }

  async values()
  {
    await super.values();
    
    if ( this.obj.run.values.refid && this.obj.run.values.refid != '' )
      this.initpar.links.refname  = ( this.obj.run.values.refiscompany ) ? { name : this.initpar.companyscreen, values : { companyid : 'refid' }} : { name : this.initpar.personscreen, values : { personid : 'refid' }};
      
    this.obj.buttons.deliver.disabled = this.obj.run.values.delivered;
    this.obj.buttons.invoice.disabled = ( !! this.obj.run.values.invoiceid );
    this.obj.buttons.del.disabled     = this.obj.run.values.delivered || ( !! this.obj.run.values.invoiceid );

    if ( ! this.obj.run.values.deliverynoteid || this.obj.run.values.deliverynoteid == '################' )
      this.enable('', false);
    
  }

}

export default MneErpShipmentDeliverynote;
