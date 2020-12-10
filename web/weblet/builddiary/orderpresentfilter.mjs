//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/builddiary/orderpresentfilter.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpBuilddiaryOrdertimefilter extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        hinput : false
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

    this.obj.outputs.starttime.setTyp('datetime', MneInput.checktype.datetime, '');
    ( this.obj.observer.orderid = new MutationObserver((mut) => 
    {
      if ( this.obj.inputs.orderid.getModify() )
      {
        var p =
        {
            schema : 'mne_crm',
            query  : 'order_detail',
            cols   :  'ordernumber,description',

            "orderidInput.old" : this.obj.inputs.orderid.getValue(false),

            sqlstart : 1,
            sqlend   : 1
        }

        MneRequest.fetch('/db/utils/query/data.json', p).then( (res) =>
        {
          var mod = this.obj.inputs.orderid.getModify();
          if ( res.values.length > 0 )
          {
            this.obj.outputs.ordernumber[ (( mod ) ? 'mod' : 'set' ) + 'Value'](res.values[0][0]);
            this.obj.outputs.orderdescription[ (( mod ) ? 'mod' : 'set' ) + 'Value'](res.values[0][1]);
          }
          else
          {
            this.obj.outputs.ordernumber[ (( mod ) ? 'mod' : 'set' ) + 'Value']('');
            this.obj.outputs.orderdescription[ (( mod ) ? 'mod' : 'set' ) + 'Value']('');
          }
        }).catch((e) => 
        {
          MneLog.exception('set orderid', e)
        });
      }
    })).observe(this.obj.inputs.orderid, { attributes : true, attributeOldValue : true, attributeFilter: [ 'newvalue' ] });

    ( this.obj.observer.timeid = new MutationObserver((mut) => 
    {
      if ( this.obj.inputs.timeid.getModify() )
      {
        var val = this.obj.inputs.timeid.getValue();
        MneElement.mkClass( this.obj.container.content, 'ownids', !! (val && ( val != this.obj.run.values.timeid)) );

        if ( this.obj.inputs.timeid.getValue() )
        {
          var p =
          {
              schema : 'mne_builddiary',
              query  : 'time_order',
              cols   :  'starttime',

              "timeidInput.old" : this.obj.inputs.timeid.getValue(false),

              sqlstart : 1,
              sqlend   : 1
          }

          MneRequest.fetch('/db/utils/query/data.json', p).then( (res) =>
          {
            if ( res.values.length > 0 )
              var mod = this.obj.inputs.timeid.getModify();
            if ( res.values.length > 0 )
              this.obj.outputs.starttime[ (( mod ) ? 'mod' : 'set' ) + 'Value'](res.values[0][0]);
            else
              this.obj.outputs.starttime[ (( mod ) ? 'mod' : 'set' ) + 'Value']('');
          }).catch((e) => 
          {
            MneLog.exception('set timeid', e)
          });
        }
        else
        {
          this.obj.outputs.starttime.modValue('');
        }
      }
    })).observe(this.obj.inputs.timeid, { attributes : true, attributeFilter: [ 'newvalue' ] });
  }

  focus()
  {
  }
  
  get wcol() { return 'orderid,timeid,present'; }
  get wop()  { return "=,=,="; }
  get wval() { return this.obj.inputs.orderid.getValue() + ',' + this.obj.inputs.timeid.getValue() + ',true'; }
  
  set date(date)
  {
    this.obj.outputs.date.setValue(date);
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
    
    if ( this.initpar.showalias )
    {
      this.obj.run.values.orderid = this.initpar.showalias[0]();
      this.obj.run.values.timeid = this.initpar.showalias[1]();
    }

    this.obj.inputs.orderid.modValue(this.obj.run.values.orderid);
    this.obj.inputs.timeid.modValue(this.obj.run.values.timeid);
  }

}

export default MneErpBuilddiaryOrdertimefilter;
