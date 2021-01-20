//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/product/time.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpPersonalProductTime extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_personnal',
      query         : 'producttime',
      showids       : ['producttimeid'],
      
      defalias : { productid : 'productid', name : 'name' },

      okfunction  : 'producttime_ok',
      okcols  : ['producttimeid','productid','skillid','duration','step','description','longdesc'],
      oktyps  : { duration : 'long',  step : 'long' },

      delfunction   : 'producttime_del',
      delcols       : [ 'producttimeid' ],
      deltyps       : [],
      delconfirmids : [ 'description'],

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
  
  async values()
  {
    console.log(this.config.dependweblet.obj.run.values);
    return super.values();
  }

}

export default MneErpPersonalProductTime;
