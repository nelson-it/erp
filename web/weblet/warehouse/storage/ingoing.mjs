//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/ingoing.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema     : 'mne_warehouse',
      query      : 'partingoing',
      showids    : ['partingoingid'],
        
      okfunction : 'partingoing_ok',
      okcols     : [ 'partingoingid', 'purchasedeliveryid', 'partstoragelocationid', 'storagelocationid' ],

      delfunction   : 'partingoing_del',
      delcols       : [ 'partingoingid' ],
      delconfirmids : [ 'part', 'partid', 'deliverynotenumber'],

      links : { partname : { name : 'warehouse_part', values : { partid : 'partid' }},  deliverynotenumber : { name : 'warehouse_purchasedelivery', values : { purchasedeliveryid : 'purchasedeliveryid' }} },
      
      defalias : { deliverynotenumber : 'deliverynotenumber', purchasedeliveryid : 'purchasedeliveryid', deliverydate : 'deliverydate', rvendor : 'vendor', part : 'part', parttype : 'parttype' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async values()
  {
    await super.values();
    MneElement.mkClass( this.obj.container.weblet, 'ignorewrong', this.obj.run.values.stocked )
    this.enable('values', ! this.obj.run.values.stocked );
    this.obj.buttons.add.disabled = false;
  }
}

export default MneTemplate;
