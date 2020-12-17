//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/part/detail.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehousePart extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'part',
      table     : 'part',
      
      showids   : [ 'partid' ],
      
      addschema     : 'mne_warehouse',
      addfunction   : 'part_add',
      addcols       : [ 'part', 'parttype', 'treeparentid' ],

      modschema     : 'mne_warehouse',
      modfunction   : 'part_mod',
      modcols       : [ 'partid', 'part', 'parttype', 'treeparentid', 'treeid' ],

      delschema     : 'mne_warehouse',
      delfunction   : 'part_del',
      delcols       : [ 'partid'],
      delconfirmids : [ 'part', 'partid'],
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

}

export default MneErpWarehousePart;
