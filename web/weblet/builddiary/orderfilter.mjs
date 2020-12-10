//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/orderfilter.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpBuilddiaryOrderfilter extends MneDbView
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
  
  get wcol() { return 'orderid'; }
  get wop()  { return "="; }
  get wval() { return this.obj.inputs.orderid.getValue(); }
  
  set orderid(orderid)
  {
    this.obj.inputs.orderid.setValue(orderid);
    var p =
    {
      schema : 'mne_crm',
      query  : 'order_detail',
      cols   :  'ordernumber,description',
      
      "orderidInput.old" : orderid,
      
      sqlstart : 1,
      sqlend   : 1
    }
    
    MneRequest.fetch('/db/utils/query/data.json', p).then( (res) =>
    {
      if ( res.values.length > 0 )
      {
        this.obj.outputs.ordernumber.setValue(res.values[0][0]);
        this.obj.outputs.orderdescription.setValue(res.values[0][1]);
      }
    }).catch((e) => 
    {
        MneLog.exception('set orderid', e)
    });
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

export default MneErpBuilddiaryOrderfilter;
