//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/dav/card.mjs
//================================================================================
'use strict';

import MneConfig  from '/js/basic/config.mjs'
import MneElement from '/weblet/basic/element.mjs'
import MneText    from '/js/basic/text.mjs'
import MneLog     from '/js/basic/log.mjs'
import MneRequest from '/js/basic/request.mjs'

import MneDbView  from '/weblet/db/view.mjs'

class MneCrmDavCard extends MneDbView
{
    constructor(parent, frame, id, initpar = {}, config = {} )
    {
      var ivalues = 
      {
        schema  : 'mne_crm',
        query   : 'cardsactive',
        table   : 'cardsinactive',
        showids : ['id','userid'],
        
        defvalues : { userid : MneConfig.username },
        delbutton : [ 'add', 'del' ],
        ignore_notfound : true,
        
        hinput : false
      };
           
      super(parent, frame, id, Object.assign(ivalues, initpar), config );
    }
    
    getViewPath() { return this.getView(import.meta.url) }
    
    async values ()
    {
      this.obj.defvalues.id = this.config.dependweblet.obj.run.values.personid ?? this.config.dependweblet.obj.run.values.companyid;
      return super.values();
    }
}

export default MneCrmDavCard;
