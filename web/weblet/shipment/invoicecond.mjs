//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/shipment/invoicecond.mjs
//================================================================================
'use strict';

import MneElement from '/weblet/basic/element.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneConfig   from '/js/basic/config.mjs'

import MneDbView   from '/weblet/db/view.mjs'

class MneErpShipmentInvoicecond extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema        : 'mne_shipment',
        query         : 'invoicecond',
        table         : 'invoicecond',
        showids       : ['invoicecondid'],
        delconfirmids : ['description'],
        
        hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  getViewPath() { return this.getView(import.meta.url) }

}

export default MneErpShipmentInvoicecond
