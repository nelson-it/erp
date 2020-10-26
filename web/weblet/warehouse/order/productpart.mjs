//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/order/productpart.mjs
//================================================================================
'use strict';

import MneConfig   from '/js/basic/config.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseOrderProductpart extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema    : 'mne_warehouse',
        query     : 'orderproductpart',
        showids   : ['orderproductpartid'],
        
        okfunction : 'orderproductpart_ok',
        okcols     : [ 'orderproductid', 'orderproductpartid', 'partgroup', 'partdescription', 'partid', 'fixturetypeid', 'count', 'partcost', 'partcostcalc', 'actcount', 'unit', 'pownerid'],
        oktyps     : { count : "double", partcost : "double", partcostcalc : "double", actcount : "double" },

        delfunction : 'orderproductpart_del',
        delcols     : [ 'orderproductpartid'],
        delconfirmids : [ 'partdescription'],

        defvalues    : { partcurrency : MneConfig.uowncurrency, partcurrencysum : MneConfig.uowncurrency, partcostcalc : 0 },
        defalias     : {
                          orderid            : 'orderid',
                          orderproductid     : 'orderproductid',
                          offerproductpartid : 'rofferproductpartid',
                          productid          : 'productid',
                          productname        : 'productname',
                       },
         regexp      : { orderproductid : 'keyvalue', fixturetype : 'ok' },
         checklabel  : { orderproductid : 'productname' },


      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url).replace(/\.html$/, this.obj.run.viewnum + ".html")  }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }
  
  reset()
  {
    super.reset();
    this.obj.run.viewnum = 2;
  }
  
  async load()
  {
    await super.load();
    this.obj.checkboxs.view.checked = (this.obj.run.viewnum == 1);
     
    this.obj.observer.partid = new MutationObserver( (muts) =>
    {
      if ( this.obj.inputs.partid.getValue(false) != '' )
      {
        this.obj.inputs.fixturetypeid.modValue('');
        this.obj.outputs.fixturetype.modValue('');
      }
    });
    
    this.obj.observer.partid.observe(this.obj.inputs.partid, {subtree : true, attributes : true, attributeFilter : ['newvalue'] });

    this.obj.observer.fixturetypeid = new MutationObserver( (muts) =>
    {
      if ( this.obj.inputs.fixturetypeid.getValue(false) != '' )
      {
        this.obj.inputs.partid.modValue('');
        this.obj.outputs.partname.modValue('');
      }
    });
    
    this.obj.observer.fixturetypeid.observe(this.obj.inputs.fixturetypeid, {subtree : true, attributes : true, attributeFilter : ['newvalue'] });
  }

}

export default MneErpWarehouseOrderProductpart;
