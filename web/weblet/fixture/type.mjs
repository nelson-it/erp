//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/fixture/type.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpFixtureTyp extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_fixture',
      query     : 'fixturetype',
      showids       : ['fixturetypeid'],

      addfunction : 'fixturetype_add',
      addcols     : [ 'description', 'fixturetype', 'treeparentid' ],
      
      modfunction : 'fixturetype_mod',
      modcols     : [ 'fixturetypeid', 'description', 'fixturetype', 'treeparentid' ],
      
      delfunction : 'fixturetype_del',
      delcols     : [ 'fixturetypeid'],
      delconfirmids : [ 'description'],
      
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

}

export default MneErpFixtureTyp;
