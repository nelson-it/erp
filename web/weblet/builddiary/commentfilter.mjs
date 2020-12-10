//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/commentfilter.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpBuilddiaryOverviewfilter extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    this.obj.run.btnrequest.read = '';
  }

  getViewPath() { return this.getView(import.meta.url) }

  async load()
  {
    await super.load();
    
    this.obj.observer.content.disconnect();
    delete this.obj.observer.content;
  }

  focus()
  {
  }
  
  get wcol()
  {
    var retval = 'orderid';
    if ( this.obj.inputs.important.getValue() ) retval += ',important';
    if ( this.obj.inputs.comment.getValue() ) retval += ',comment';
    
    return retval;
  }
  
  get wop()
  {
    var retval = '=';
    if ( this.obj.inputs.important.getValue() ) retval += ',=';
    if ( this.obj.inputs.comment.getValue() ) retval += ',like';
    
    return retval;
  }
   get wval()
   {
     var retval = this.obj.inputs.orderid.getValue();
     if ( this.obj.inputs.important.getValue() ) retval += ',true';
     if ( this.obj.inputs.comment.getValue() ) retval += ',%' + this.obj.inputs.comment.getValue() + '%';
     
     return retval;
   }
  
  async enter(data, obj, evt )
  {
    await this.obj.table.values();
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

export default MneErpBuilddiaryOverviewfilter;
