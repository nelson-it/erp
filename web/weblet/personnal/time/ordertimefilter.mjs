//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/ordertimefilter.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneInput    from '/js/basic/input.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        starttimename : 'starttime',
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  reset()
  {
    super.reset();
    
    this.obj.run.btnrequest.read = '';
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  async load()
  {
    await super.load();
    
    this.obj.observer.content.disconnect();
    delete this.obj.observer.content;
    
    this.obj.inputs.startdate.setTyp('date', MneInput.checktype.date, '');
    this.obj.inputs.enddate.setTyp('date', MneInput.checktype.date, '');
    this.obj.inputs.month.setTyp('char', '', '');

    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setDate(1);
    this.obj.inputs.startdate.setValue(parseInt(date.getTime() / 1000));
    
    date.setFullYear( ( date.getMonth() == 11 ) ? date.getFullYear() + 1 : date.getFullYear());
    date.setMonth( ( date.getMonth() == 11 ) ? 0 : date.getMonth() + 1);
    this.obj.inputs.enddate.setValue(parseInt(date.getTime() / 1000));

    this.obj.inputs.month.setValue(-1);
   
    this.obj.inputs.month.addEventListener('change', (evt) => { this.btnClick('newmonth', {}, this.obj.inputs.month, evt) });
  }
  
  async newmonth()
  {
    if ( this.obj.inputs.month.getValue(false) == -2 ) return;
    
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setDate(1);
    if ( this.obj.inputs.month.getValue() != -1 ) date.setMonth( this.obj.inputs.month.getValue() );

    this.obj.inputs.startdate.setValue(parseInt(date.getTime() / 1000));
    
    date.setFullYear( ( date.getMonth() == 11 ) ? date.getFullYear() + 1 : date.getFullYear());
    date.setMonth( ( date.getMonth() == 11 ) ? 0 : date.getMonth() + 1);
    this.obj.inputs.enddate.setValue(parseInt(date.getTime() / 1000));
    
    this.parent.newvalues = true;
  }


  focus()
  {
  }
  
  get wcol()
  {
    var retval = this.initpar.starttimename + "," + this.initpar.starttimename + ',orderid';
    if ( this.obj.inputs.my.checked == true )
      retval += ',loginname';
    
    return retval;
  }

  get wop()
  {
    var retval = ">=,<,=";
    if ( this.obj.inputs.my.checked == true )
      retval += ',=';
    
    return retval;
   }
  
  get wval()
  {
    var retval = this.obj.inputs.startdate.getValue() + "," + (this.obj.inputs.enddate.getValue() + 86400) + ',' + this.obj.inputs.orderid.getValue();
    if ( this.obj.inputs.my.checked == true )
      retval += ',session_user';
    
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

export default MneTemplate;
