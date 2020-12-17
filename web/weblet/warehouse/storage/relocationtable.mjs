//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/relocationtable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpWarehouseStorageRelocationTable extends MneDbTableView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        readyfunction : "relocation_ready",
        readycols     : [ 'relocationid'],
        readytyps     : {},
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'ready', value : MneText.getText("#mne_lang#Fertig#"), space : 'behind', before : 'export' } );

    this.obj.enablebuttons.buttons.push('ready');
    this.obj.enablebuttons.select.push('ready');
  }
  
  async ready()
  {
    await this.func('ready');
    this.dependweblet = this;
  }

}

export default MneErpWarehouseStorageRelocationTable
