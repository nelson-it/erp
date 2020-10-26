//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/offer/producttime.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpPersonnalOfferproductTime extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_personnal',
        query     : 'offerproducttime',
      showids     : ['offerproducttimeid'],

      okfunction  : 'offerproducttime_ok',
      okcols      : [ 'offerproducttimeid','offerproductid','skillid','setduration','step','description','longdesc' ],
      oktyps      : { 'setduration' : 'long', 'step' : 'long' },

      delfunction   : 'offerproducttime_del',
      delcols       : [ 'offerproducttimeid' ],
      deltyps       : {},
      delconfirmids : [ 'description'],
      
      defalias      : { offerid : 'offerid', offerproductid : 'offerproductid', productname : 'productname', productoptid : 'productoptid', count : 'count', skillid : 'skillid', setduration : 'setduration', setdurationsum : 'setdurationsum', step : 'step', description : 'description', longdesc : 'longdesc' },

      regexp        : { offerproductid : 'keyvalue', setdurationsum : 'time' },
      checklabel    : { offerproductid : 'productname' },
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async load()
  {
    await super.load();

    this.obj.inputs.setduration.addEventListener('blur', (evt) => { this.obj.inputs.setdurationsum.setValue(this.obj.inputs.setduration.getValue() * this.obj.outputs.count.getValue()); });
    this.obj.inputs.setdurationsum.addEventListener('blur', (evt) => { this.obj.inputs.setduration.setValue(this.obj.inputs.setdurationsum.getValue() / this.obj.outputs.count.getValue()); });
  }

  async ok()
  {
    if ( document.activeElement == this.obj.inputs.setdurationsum )
      this.obj.inputs.setduration.setValue(this.obj.inputs.setdurationsum.getValue() / this.obj.outputs.count.getValue());

    return super.ok();
  }

}

export default MneErpPersonnalOfferproductTime;
