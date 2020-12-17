//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/optimize.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseStorageOptimize extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'storageopt',
      showids   : ['storageid'],

      okschema   : 'mne_warehouse',
      okfunction : 'storageopt_ok',
      okcols     : [ 'storageid', 'stockpos', 'releasepos', 'xtime', 'ytime', 'ztime' ],
      oktyps     : { stockpos : 'long', releasepos : 'long', xtime : 'long', ytime : 'long', ztime : 'long' },

      defalias   : { storageid : 'storageid' },
      delbutton  : [ 'add' ],
      hinput : true
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
}

export default MneErpWarehouseStorageOptimize;
