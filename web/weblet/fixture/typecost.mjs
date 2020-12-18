//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/fixture/typecost.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpFixtureTypecost extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_fixture',
      query     : 'fixturetypecost',
      table     : 'fixturetypecost',
      showids   : ['fixturetypecostid'],
        
      okfunction  : 'fixturetypecost_ok',
      okcols      : [ 'fixturetypecostid', 'fixturetypeid', 'unitcost', 'unit' ],
      oktyps      : { unitcost : 'double' },
        
      delfunction : 'fixturetypecost_del',
      delcols     : [ 'fixturetypecostid' ],
      delconfirmids : ['unitcost', 'unit'],
      
      defvalues : { currency : MneConfig.uowncurrency },
      defalias  : { fixturetypeid : 'fixturetypeid', fixturetype : 'fixturetype'},

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  reset()
  {
    super.reset();
    
    var i = this.obj.enablebuttons.values.indexOf('add');
    if ( i >= 0 )this.obj.enablebuttons.values.splice(i, 1);
  }
}

export default MneErpFixtureTypecost;
