//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/person/own.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneCrmPersonOwn extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      url           : '',
      schema        : 'mne_crm',
      query         : 'personowndata',
      showids       : ['personid'],
      delconfirmids : [ 'fullname'],

      addfunction : 'personowndata_add',
      addcols : ['personid', 'loginname', 'active', 'canlogin', 'validuntil', 'color' ],
      addtyps : { active : 'bool', canlogin : 'bool', validuntil : 'long'  },

      modfunction : 'personowndata_mod',
      modcols : [ 'personowndataid', 'personid', 'loginname', 'active', 'canlogin', 'validuntil', 'color' ],
      modtyps : { active : 'bool', canlogin : 'bool', validuntil : 'long'  },

      delfunction : 'personowndata_del',
      delcols : [ 'personowndataid' ],
      deltyps : {},
      
      defalias      : { personid : 'personid', fullname : 'fullname' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  async ok()
  {
    if ( this.obj.inputs.loginname.getValue() == '' ) this.obj.inputs.canlogin.modValue(false);
    if ( this.obj.inputs.loginname.getModify() &&  this.obj.inputs.loginname.getValue() != '') this.obj.inputs.canlogin.modValue(true);
    if ( this.obj.inputs.canlogin.getModify() &&  this.obj.inputs.canlogin.getValue() == false ) this.obj.inputs.loginname.modValue('');
    
    return super.ok();
  }

  async values()
  {
    await super.values();
    
    if ( ! this.obj.inputs.personid.getValue() || this.obj.inputs.personid.getValue() == '################' )
      this.enable('', false);
  }
  
}

export default MneCrmPersonOwn;
