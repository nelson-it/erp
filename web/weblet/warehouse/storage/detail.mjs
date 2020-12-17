//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/detail.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseStorageDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_warehouse',
        query     : 'storage',
        table     : 'storage',
        showids   : [ 'storageid' ],

        delschema     : 'mne_warehouse',
        delfunction   : 'storage_del',
        delcols       : ['storageid'],
        delconfirmids : ['description'],

        createdetail : 'create',
        optimizedetail : 'optimize',

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id: "create", value : MneText.getText("#mne_lang#Erstellen#"), space : 'before' } );
    this.obj.mkbuttons.push( { id: "optimize", value : MneText.getText("#mne_lang#Optimierung#") } );

    this.obj.enablebuttons.buttons.push('create');
    this.obj.enablebuttons.buttons.push('optimize');

    this.obj.enablebuttons.values.push('create');
    this.obj.enablebuttons.values.push('optimize');
  }
  
  async create()
  {
    return this.openpopup(this.initpar.createdetail);
  }
  
  async optimize()
  {
    return this.openpopup(this.initpar.optimizedetail);
  }
}

export default MneErpWarehouseStorageDetail;
