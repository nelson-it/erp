//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/timemanagement/edit.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpTimemanagementEdit extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema      : 'mne_personnal',
        query       : 'persontimemanagement',
        showids     : ['timemanagementid'],
        
        okschema    : 'mne_personnal',
        okfunction  : 'timemanagement_mod',
        okcols      : [ 'timemanagementid', 'timetyp', 'personid', 'start', 'duration', 'orderproducttimeid', 'note' ],
        oktyps      : { timetyp : 'long', start : 'long', duration : 'long' },
        
        delschema   : 'mne_personnal',
        delfunction : 'timemanagement_del',
        delcols     : ['timemanagementid'],
        delconfirmids : ['steptext', 'startday', 'starttime'],

        defvalues   : { timetyp : 0, starttime : -1 },
        selectlists : { starttime : 'timemanagementslot' },
        regexp      : { description : 'ok' },
        
        cleanschema    : 'mne_personnal',
        cleanfunction  : 'timemanagement_cleanup',
        cleancols      : [],
        cleantyps      : {},
        
        hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  reset()
  {
    super.reset();
    this.obj.mkbuttons.push( { id : 'clean',     value : MneText.getText('#mne_lang#Bereinigen'), after : 'del', space : 'before'})
  }
  
  async clean()
  {
    await super.func('clean');
    this.dependweblet = this;
  }
  async ok()
  {
    if ( this.obj.inputs.orderproducttimeid.getValue() == '' && this.obj.inputs.timetyp.value == '0' )
      throw "#mne_lang#Bitte Arbeitsschritt auswählen";
    
    if ( this.obj.inputs.personid.getValue() == '' )
      throw "#mne_lang#Bitte eine Person auswählen";
 
    if ( this.obj.inputs.timetyp.getValue() != 0 )
      this.obj.inputs.orderproducttimeid.modValue('');
    
    this.obj.inputs.start.modValue(this.obj.inputs.startday.getValue() + this.obj.inputs.starttime.getValue());
    
    return super.ok();
  }
  
  async values()
  {
    var i,d;
    
    this.obj.defvalues = Object.assign({}, this.initpar.defvalues );
    if ( this.obj.run.dependweblet == undefined )
      for ( i in this.config.dependweblet.obj.run.values )
        this.obj.defvalues[i] = this.config.dependweblet.obj.run.values[i];
    
    return super.values();
  }
}

export default MneErpTimemanagementEdit;
