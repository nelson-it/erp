//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/create.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseStorageCreate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
     schema    : 'mne_warehouse',
     query     : 'storage',
     showids   : ['storageid'],

     okschema   : 'mne_warehouse',
     okfunction : 'storagecreate_ok',
     okcols     : [ 'storageid', 'xcount', 'ycount', 'zcount', 'xsname', 'ysname', 'zsname' ],
     oktyps     : { xcount : 'long', ycount : 'long', zcount : 'long' },

     
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    this.delbutton('del,add');
  }
  
  async cancel()
  {
    return this.close();
  }

  
}

export default MneErpWarehouseStorageCreate;
