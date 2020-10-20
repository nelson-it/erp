//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/templ/templ.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpPersonnalProucttime extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_personnal',
        query     : 'orderproducttime',
        table     : 'orderproducttime',
        showids   : [ 'orderproducttimeid'],

        okschema   : 'mne_personnal',
        okfunction : 'orderproducttime_ok',
        okcols     : [ 'orderproducttimeid', 'orderproductid', 'skillid', 'setduration', 'step', 'description', 'longdesc', 'ready'] ,
        oktyps     : { setduration : "long", step : "long", checked : "bool" },

        delschema     : 'mne_personnal',
        delfunction   : 'orderproducttime_del',
        delcols       : [ 'orderproductid'],
        delconfirmids : [ 'productname', 'description'],
        
        defalias      : { orderid : 'orderid', orderproductid : 'orderproductid', productname : 'productname', productoptid : 'productoptid', count : 'count'  },
        regexp        : { setdurationsum : 'time' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

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

  async values()
  {
    await super.values();
    if ( this.obj.inputs.orderid.getValue(false) == '################' )
      this.enable('', false);
  }

}

export default MneErpPersonnalProucttime;
