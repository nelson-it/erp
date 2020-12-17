//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/purchase/invoice.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehousePurchaseInvoice extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_warehouse',
        query     : 'purchaseinvoice',
        table     : 'purchaseinvoice',
        showids   : ['purchaseinvoiceid'],
        
        okschema   : 'mne_warehouse',
        okfunction : 'purchaseinvoice_ok',
        okcols     : [ 'purchaseinvoiceid', 'documentnumber', 'invoicenumber', 'invoicedate', 'amount', 'accountnumber', 'bankcode', 'remittee', 'purpose', 'ownaccount' , 'companyid'],
        oktyps     : { invoicedate : 'long',  amount : 'double'},
        
        delids        : ['purchaseinvoiceid'],
        delconfirmids : ['documentnumber'],

        payschema : 'mne_warehouse',
        payfunction : 'purchaseinvoice_pay',

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

}

export default MneErpWarehousePurchaseInvoice;
