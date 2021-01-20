//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/templ/templ.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpHoaiFeeExtra extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_hoai',
      query         : 'feeextra',
      table         : 'feeextra',
      
      showids       : ['feeextraid'],
      delconfirmids : [ 'name'],
      
      defalias      : { law : 'law', lawname : 'law' },
      defvalues     : { year : '2013', name : 'default' },
      
      selectlists : { name : 'hoia_extrafee'},
      regexp      : { productnumber : 'ok'},

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async values()
  {
    console.log(this.config.dependweblet.obj.run.values )
    return super.values();
  }
}

export default MneErpHoaiFeeExtra;
