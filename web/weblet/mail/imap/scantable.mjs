//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/mail/imap/scantable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneInput     from '/js/basic/input.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneErpMailImapScanTable extends MneDbTableView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      hinput : false
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push({ id : 'scan', value : MneText.getText("#mne_lang#Lesen" )});
    this.obj.mkbuttons.push({ id : 'fullscan', value : MneText.getText("#mne_lang#Komplett lesen" ) });
    
    this.delbutton('add,del,cancel,ok,export,refresh');
    
    this.obj.fullscan = 0;
    this.obj.no_vals = true;
  }
  
  scan()
  {
    this.obj.fullscan = 0;
    this.obj.no_vals = false;
    this.newvalues = true;
  }
  
  fullscan()
  {
    this.obj.fullscan = 1;
    this.obj.no_vals = false;
    this.newvalues = true;
  }
  
  async values()
  {
    console.log(this.config.dependweblet.obj.run.values)
    await super.values({ fullscan : this.obj.fullscan, no_vals : this.obj.no_vals });
    this.obj.fullscan = 0;
    this.obj.no_vals = true;
  }
  
}

export default MneErpMailImapScanTable
