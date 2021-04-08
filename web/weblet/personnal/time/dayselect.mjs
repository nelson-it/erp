//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/personnal/time/dayselect.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'
import MneConfig   from '/js/basic/config.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpPersonnalTimeDayselect extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      css           : 'personnal/time/day.css',
      schema        : 'mne_personnal',
      query         : 'timeday',

      delbutton : 'cancel',
      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  
  reset()
  {
    super.reset();
    
    var date = new Date();
    this.obj.run.day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    this.obj.run.title.add = this.config.label;
    this.obj.run.title.mod = this.config.label;
  }
  
  async load()
  {
    await super.load();
    ( this.obj.observer.vfullday = new MutationObserver((mut) => { if ( this.obj.outputs.vfullday.getModify() ) this.btnClick('selectday') })).observe(this.obj.outputs.vfullday, { attributes : true, attributeFilter: [ 'newvalue' ] });
  }
  
  getParamShow(p, showids )
  {
      p['personidInput.old'] = MneConfig.personid;
      p['vfulldayInput.old'] = MneText.addNull(this.obj.run.day.getDate(),2) + MneText.addNull(this.obj.run.day.getMonth() + 1,2) + MneText.addNull(this.obj.run.day.getFullYear(),4);
      
      return p;
  }
  
  async prev()
  {
    this.obj.run.day = new Date(this.obj.run.day.getFullYear(), this.obj.run.day.getMonth(), this.obj.run.day.getDate() - 1);
    this.newvalues = true;
  }

  async next()
  {
    this.obj.run.day = new Date(this.obj.run.day.getFullYear(), this.obj.run.day.getMonth(), this.obj.run.day.getDate() + 1);
    this.newvalues = true;
  }
  
  async selectday()
  {
    var val = this.obj.outputs.vfullday.getValue();
    this.obj.outputs.vfullday.modClear();
    this.obj.run.day = new Date(val.substr(4), parseInt(val.substr(2,2)) - 1, val.substr(0,2));
    this.newvalues = true;
  }
  
  async setday(day)
  {
    this.obj.outputs.vfullday.modValue(day);
  }
  
  async values()
  {
    await super.values();
    MneElement.mkClass(this.obj.outputs.duration, 'modifywrong', ( this.obj.run.values.duration < this.obj.run.values.wtime ));
    this.obj.run.values.date = this.obj.run.day.getTime() / 1000;
    
  }

}

export default MneErpPersonnalTimeDayselect;
