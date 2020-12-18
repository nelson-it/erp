//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/fixture/detail.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpFixtureDetail extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_fixture',
      query     : 'fixture',
      showids : ['fixtureid'],
      
      addfunction : 'fixture_add',
      addcols     : [ 'fixturenumber', 'description', 'fixturetypeid', 'ownerid', 'partid', 'purchasedeliveryid', 'treeparentid' ],
      
      modfunction : 'fixture_mod',
      modcols     : [ 'fixtureid', 'fixturenumber', 'description', 'fixturetypeid', 'ownerid', 'partid', 'purchasedeliveryid', 'treeparentid' ],
      
      delfunction : 'fixture_del',
      delcols     : [ 'fixtureid'],
      delconfirmids : [ 'fixturenumber', 'description'],
      
      links :
      {
        partname           : { name : 'warehouse_part',             values : { partid : 'partid' }},
        deliverynotenumber : { name : 'warehouse_purchasedelivery', values : { purchasedeliveryid : 'purchasedeliveryid' }},
        fixturetype        : { name : 'fixture_fixturetype',        values : { fixturetypeid : 'fixturetypeid' }}
      },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

}

export default MneErpFixtureDetail;
