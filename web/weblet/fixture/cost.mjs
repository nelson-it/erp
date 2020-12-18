//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/fixture/cost.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpFixtureCost extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_fixture',
      query         : 'fixturecost',
      table         : 'fixturecost',
      showids       : ['fixtureid'],
      
      okids         : ['fixturecostid'],
      delconfirmids : [ 'unit','unitcost','currency'],

      defalias : { fixtureid : 'fixtureid', fixturenumber : 'fixturenumber' },
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async values()
  {
    await super.values();
    [ 'typecost', 'typeunitcost','typecurrency' ].forEach((item) => { this.obj.defvalues[item] = this.obj.run.values[item]});
    if ( this.obj.run.values.fixturecostid == '' )
      this.add({nomod : true});
  }
}

export default MneErpFixtureCost;
