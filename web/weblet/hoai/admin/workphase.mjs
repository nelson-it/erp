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

class MneTemplate extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_hoai',
      query     : 'workphase',
        
      showids : ['law'],
      showalias : ['feenameid'],

      delbutton : 'add,del',

      okfunction : 'workphase_ok',
      okcols     : [ 'law', 'phasename1', 'value1', 'phasename2', 'value2', 'phasename3', 'value3', 'phasename4', 'value4', 'phasename5', 'value5', 'phasename6', 'value6', 'phasename7', 'value7', 'phasename8', 'value8', 'phasename9', 'value9', 
                     'productid1', 'productid2', 'productid3', 'productid4', 'productid5', 'productid6', 'productid7', 'productid8', 'productid9',
                     'oproductnumber1', 'oproductnumber2', 'oproductnumber3', 'oproductnumber4', 'oproductnumber5', 'oproductnumber6', 'oproductnumber7', 'oproductnumber8', 'oproductnumber9'],
      oktyps     : { value1 : 'double', value2 : 'double', value3 : 'double', value4 : 'double', value5 : 'double', value6 : 'double', value7 : 'double', value8 : 'double', value9 : 'double' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
  
  async values ()
  {
    await super.values();
    this.obj.buttons.ok.disabled = ( ! this.config.dependweblet.obj.run.values.feenameid );
  }

}

export default MneTemplate;
