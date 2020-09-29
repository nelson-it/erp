//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/templ/templ.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpCrmOfferProbability extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_crm',
      query         : 'offerprobability',
      table         : 'offerprobability',
      showids       : ['offernumber'],
      delconfirmids : [ 'offernumber'],
      
      selectlists : { probability :  'offerprobability'},

      defvalues : { probability : 10 },
      defalias : { offernumber : 'offernumber' },
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  async values()
  {
    await super.values();
    
    if ( ! this.config.dependweblet.obj.run.values.refid )
    {
      this.obj.outputs.offernumber.setValue('');
      this.enable('', false);
    }
    
    if ( this.obj.inputs.probability.getValue(false) == 0 || this.obj.inputs.probability.getValue(false) == 100 )
      this.enable('', false);
  }
}

export default MneErpCrmOfferProbability;
