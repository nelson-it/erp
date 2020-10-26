//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/table/productfilter.mjs
//================================================================================
'use strict';

import MneConfig from '/js/basic/config.mjs'
import MneText   from '/js/basic/text.mjs'
import MneLog    from '/js/basic/log.mjs'


import MneDbView from '/weblet/db/view.mjs'

class MneErpCrmTableProductfilter extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
    }

    super(parent, frame, id, Object.assign(ivalues, initpar), config);
  }
  
  reset()
  {
    super.reset();
    
    this.obj.run.btnrequest.read = '';
  }
  
  getViewPath() { return this.getView(import.meta.url) }
 // getCssPath() { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
  
  async load()
  {
    await super.load();
    
    this.obj.observer.content.disconnect();
    delete this.obj.observer.content;
  }

  focus()
  {
    this.obj.inputs.wproductname.focus();
  }
  
  get wcol()
  {
    var retval = ( this.obj.inputs.wproductname.getValue() ) ? 'productname' : '';
    var sep    = ( this.obj.inputs.wproductname.getValue() ) ? ',' : '';
    
    return ( this.obj.inputs.wnosum.getValue() == true ) ? retval + sep + 'rowtyp' : retval;
  }

  get wop()
  {
    var retval = ( this.obj.inputs.wproductname.getValue() ) ? 'like' : '';
    var sep    = ( this.obj.inputs.wproductname.getValue() ) ? ',' : '';
    return ( this.obj.inputs.wnosum.getValue() == true ) ? retval + sep + '='  : retval;
  }
  
  get wval()
  {
    var retval = ( this.obj.inputs.wproductname.getValue() ) ? this.obj.inputs.wproductname.getValue() + '%' : '';
    var sep    = ( this.obj.inputs.wproductname.getValue() ) ? ',' : '';
    return ( this.obj.inputs.wnosum.getValue() == true ) ? retval + sep + this.obj.inputs.wnosum.getValue()  : retval;
  }
  
  async enter(data, obj, evt )
  {
    await this.obj.table.values();
    this.obj.inputs.wproductname.focus();
    
    return false;
  }
  
  async tab(data, obj, evt)
  {
    this.obj.table.values();

    evt.preventDefault();
    evt.stopPropagation();
    
    return false;
  }
  
  async values()
  {
    this.obj.run.values = ( this.config.dependweblet ) ? this.config.dependweblet.obj.run.values : {};
  }
}

export default MneErpCrmTableProductfilter;
