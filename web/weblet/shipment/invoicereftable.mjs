//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/shipment/invoicereftable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableViewWeblet from '/weblet/db/table/view.mjs'

class MneErpShipmentInvoiceRef extends MneDbTableViewWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema  : 'mne_shipment',
        query   : 'invoiceref',
        cols    : 'invoicerefid,refid,refname,company,city,paysum,paid',
        showids : [ 'invoiceid'],
        
        primarykey : [ 'invoicerefid'],

        tablehidecols    : ['invoicerefid','refid'],
        tablecoltype     : { paysum : 'text' },
        tablerowstyle    : [ 'invoicerefpaid'],
        tablerowstylecol : ['paid'],

        modschema   : 'mne_shipment',
        modfunction : 'invoiceref_paysum',
        modcols     : [ 'invoicerefid','paysum' ],
        modtyps     : { paysum : 'double' },

        addschema   : 'mne_shipment',
        addfunction : "invoiceref_ok",
        addcols     : [ 'invoiceid', 'refid'],

        delschema     : 'mne_shipment',
        delfunction   : "invoiceref_del",
        delcols       : ['invoicerefid'],
        delconfirmids : [ 'refname'],

        paidschema   : 'mne_shipment',
        paidfunction : "invoiceref_payed",
        paidcols     : [ 'invoicerefid'],

        addweblet : 'referenceadd',

        hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    this.obj.mkbuttons.push( { id : 'paid', value : MneText.getText("#mne_lang#Bezahlt"), before : 'ok', space : 'behind' })
    
    this.obj.enablebuttons.buttons.push('paid');
    this.obj.enablebuttons.select.push('paid');
  }
  
  async selectRow(data, row, evt = {})
  {
    var retval = await super.selectRow(data, row, evt);

    var send = this.config.dependweblet.config.dependweblet.obj.outputs.invoiced.getValue();
    this.obj.buttons.ok.disabled    = !  send;
    this.obj.buttons.paid.disabled  = !  send;
    this.obj.buttons.add.disabled   = !! send;
    this.obj.buttons.del.disabled   = !! send;

    return retval;
  }

  async paid()
  {
    var retval = await this.execute_selected(() => { super.func('paid')});
    this.newvalues = retval;
    return retval;
  }

  async add()
  {
    this.unselectRows();
    
    var w = await this.createpopup(this.initpar.addweblet, {}, { selectok : async (res) =>
    {
      if ( res.values.length )
      {

        this.obj.run.values.refid = res.values[0][res.rids.refid];
        await this.func('add');
        this.newvalues = true;
      }
    }});
    
    await w.show();
    w.newvalues = true;
    await w.check_values();

    return false;

  }
  
  async values()
  {
    var retval = await super.values();
    
    var send = this.config.dependweblet.config.dependweblet.obj.outputs.invoiced.getValue();
    this.obj.buttons.add.disabled   = !! send;
    this.obj.buttons.del.disabled   = !! send;

    return retval;
  }
}

export default MneErpShipmentInvoiceRef;
