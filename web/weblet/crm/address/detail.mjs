//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/address/detail.mjs
//================================================================================
'use strict';

import MneElement from '/weblet/basic/element.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneDbView   from '/weblet/db/view.mjs'

class MneCrmAddressDetail extends MneDbView
{
    constructor(parent, frame, id, initpar = {}, config = {} )
    {
      var ivalues = 
      {
        schema        : 'mne_crm',
        query         : 'address',
        table         : 'address',
        showids       : ['addressid'],
        delconfirmids : [ 'city', 'street'],

        hinput : false
      };
           
      super(parent, frame, id, Object.assign(ivalues, initpar), config );
    }
    
    getViewPath() { return this.getView(import.meta.url) }
    
    async values(param)
    {
      if ( this.config.dependweblet ) this.obj.defvalues.refid = this.config.dependweblet.obj.run.values['refid'];
      await super.values(param);
      this.enable(this.obj.run.okaction, !! this.obj.inputs.refid.getValue(false));
    }

}

export default MneCrmAddressDetail;
