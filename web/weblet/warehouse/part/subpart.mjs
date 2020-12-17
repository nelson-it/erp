//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/part/subpart.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseSubpart extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'partsubpart',
      table     : 'partsubpart',
      
      showids   : [ 'partsubpartid' ],
      delconfirmids : [ 'name'],

      okfunction : 'partsubpart_ok',
      okcols     : [ 'partsubpartid', 'partid', 'subpartid', 'count' ],

      defalias   : { partid : 'partid' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async values()
  {
    await super.values();
    if ( ! this.config.dependweblet.obj.run.values.partid || this.config.dependweblet.obj.run.values.partid == '################')
      this.enable ('', false );
  }
}

export default MneErpWarehouseSubpart;
