//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/relocate.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpStorageRelocate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
     schema    : 'mne_warehouse',
     query     : 'relocation',
     showids   : [ 'relocationid' ],
        
     okfunction : "relocation_ok",
     okcols     : [ 'relocationid', 'partstoragelocationid', 'newstoragelocationid', 'personid', 'count', 'sequence' ],
     oktyps     : { count : 'long', sequence : 'long' },

     delfunction   : "relocation_del",
     delcols       : [ 'relocationid' ],
     deltyps       : {},
     delconfirmids : [ 'oldstoragelocationname', 'newstoragelocationname' ],
        
     readyfunction : "relocation_ready",
     readycols     : [ 'relocationid'],
     readytyps     : {},
        
     defalias : { partid : 'partid', partname : 'partname', count : 'rcount', oldstorageid : 'storageid', partstoragelocationid : 'partstoragelocationid', oldstoragelocationid : 'storagelocationid', oldstoragelocationname : 'storagelocationname' },

      hinput :  false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'ready', value : MneText.getText("#mne_lang#Fertig#"), space : 'before' } );

    this.obj.enablebuttons.buttons.push('ready');
    this.obj.enablebuttons.values.push('ready');
  }
  
  async ready()
  {
    await this.func('ready');
    this.dependweblet = this;
  }
  
  async add(data)
  {
    if ( ! data.nomod ) await this.obj.inputs.oldstorageid.refresh();
    return super.add(data);
  }
  
  async values()
  {
    await super.values();
    
    if ( this.obj.run.values.relocationid == '################' && this.config.dependweblet.obj.run.values[this.initpar.defalias.count] != undefined &&  this.config.dependweblet.obj.run.values[this.initpar.defalias.count] == 0 )
      this.enable('', false);
  }
}

export default MneErpStorageRelocate;
