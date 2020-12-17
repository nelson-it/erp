//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/storage/outgoing.mjs
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
        schema     : 'mne_warehouse',
        query      : 'partoutgoing',
        showids    : ['partoutgoingid'],

        okschema   : 'mne_warehouse',
        okfunction : 'partoutgoing_ok',
        okcols     : [ 'partoutgoingid', 'outstoragelocationid', 'spartstoragelocationid', 'orderproductpartid', 'count', 'personid'],
        oktyps     : { count : 'long' },

        delschema   : 'mne_warehouse',
        delfunction : 'partoutgoing_del',
        delcols     : ['partoutgoingid'],
        delconfirmids : ['partname'],

        fetchschema   : 'mne_warehouse',
        fetchfunction : 'partoutgoing_fetch',
        fetchcols     : ['partoutgoingid'],

        orderschema   : 'mne_warehouse',
        orderfunction : 'partoutgoing_order',
        ordercols     : ['partoutgoingid', 'orderproductpartid'],

        regexp : { ordernumber : 'ok', orderdescription : 'ok', customer : 'ok' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push({ id : 'fetch', value : MneText.getText('#mne_lang#Abgeholt'), space : 'before'});
    this.obj.mkbuttons.push({ id : 'order', value : MneText.getText('#mne_lang#Auftrag setzen')});

    this.obj.enablebuttons.buttons.push('fetch');
    this.obj.enablebuttons.values.push('fetch');

    this.obj.enablebuttons.buttons.push('order');
    this.obj.enablebuttons.values.push('order');
  }
  
  async fetch()
  {
    await this.func('fetch');
    this.dependweblet = this;
  }

  async order()
  {
    await this.func('order');
    this.dependweblet = this;
  }
}

export default MneTemplate;
