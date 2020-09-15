//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/templ/templ.mjs
//================================================================================
'use strict';

import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneCrmProuctPrice extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_crm',
        query     : 'productprice',

        showids   : [ 'productid'],
        
        okfunction : 'productprice_ok',
        okcols     : ['productid', 'unitcost', 'unitprice', 'unit', 'vat', 'currencyid'],
        oktyps     : { unitcost : 'double', unitprice : 'double', vat : 'double'},
        
        delfunction : 'productprice_del',
        delcols     : [ 'productid'],
        deltyps     : {},
        
      delconfirmids : [ 'unitprice'],

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push( { id : 'calculate',  value : MneText.getText('#mne_lang#Berechne Kosten'), behind : 'del', space : 'before' },
)
  }
}

export default MneCrmProuctPrice;
