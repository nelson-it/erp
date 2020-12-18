//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/purchase/delivery.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehousePurchaseDelivery extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'purchasedelivery_detail',
      table     : 'purchasedelivery',
      showids   : [ 'purchasedeliveryid'],

      okschema   : 'mne_warehouse',
      okfunction : 'purchasedelivery_ok',
      okcols     : [ 'purchasedeliveryid', 'purchaseid', 'partid', 'deliverynotenumber', 'deliverydate', 'count', 'documentnumber', 'overwrite', 'partingoingid', 'partstoragelocationid', 'storagelocationid', 'partvendorid'], 
      oktyps     : { deliverydate : 'long', count : 'long', overwrite : 'bool'},
      
      delschema   : 'mne_warehouse',
      delfunction : 'purchasedelivery_del',
      delcols     : ['purchasedeliveryid'], 
      deltyps     : {},
      delconfirmids : ['deliverynotenumber'],

      purchaseschema    : 'mne_warehouse',
      purchasequery     : 'purchase',
        
      defalias : { purchaseid : 'purchaseid', ordernumber : 'ordernumber', partid : 'partid', partname : 'partname', partvendorid : 'partvendorid', vendorid : 'vendorid', vendorname : 'vendorname', spack : 'count' },
      regexp : { storageid : 'ok', storagelocation : 'ok', spack : 'ok' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  async ok()
  {
    if ( this.obj.inputs.purchaseid.getValue(false) ) this.obj.inputs.partid.modValue('');
    return super.ok();
  }
}

export default MneErpWarehousePurchaseDelivery;
