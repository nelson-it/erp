//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/user/settings.mjs
//================================================================================
'use strict';

import MneConfig from '/js/basic/config.mjs'
import MneText   from '/js/basic/text.mjs'
import MneLog    from '/js/basic/log.mjs'


import MneDbViewWeblet     from '/weblet/db/view.mjs'

class MneErpUserSettingsWeblet extends MneDbViewWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_personnal',
      table     : 'userpref',
      showids   : [ 'username' ],
      defvalues : { username : '' },
      
      ignore_notfound : true,
      
      hinput    : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  getViewPath() { return this.getView(import.meta.url) }
  
  async values()
  {
    var weblet = this.config.dependweblet;
    this.obj.defvalues.username = ( weblet && weblet.obj.run.values.username ) ? weblet.obj.run.values.username : '';
    
    await super.values();
  }
}
  


  export default MneErpUserSettingsWeblet;
  
