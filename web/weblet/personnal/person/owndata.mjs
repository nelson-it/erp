//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/person/owndata.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_personnal',
        query     : 'personowndata',
      showids     : ['personowndataid'],

      addfunction : 'personowndata_add',
      addcols     : ['personid', 'loginname', 'active', 'canlogin', 'validuntil', 'color', 'unitcost', 'wtime' ],
      addtyps     : { active : 'bool', canlogin : 'bool', validuntil : 'long', 'unitcost' : 'double', wtime : 'long'  },

      modfunction : 'personowndata_mod',
      modcols     : [ 'personowndataid', 'personid', 'loginname', 'active', 'canlogin', 'validuntil', 'color', 'unitcost', 'wtime' ],
      modtyps     : { active : 'bool', canlogin : 'bool', validuntil : 'long', 'unitcost' : 'double', wtime : 'long'  },

      delschema     : 'mne_personnal',
      delfunction   : 'personowndata_del',
      delcols       : ['personowndataid'],
      delconfirmids : [ 'fullname'],
      
      defvalues     : { currency : MneConfig.uowncurrency },
      defalias      : { personid : 'personid', fullname : 'fullname' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
 
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

export default MneTemplate;
