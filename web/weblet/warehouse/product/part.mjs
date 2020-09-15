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

class MneErpWarehouseProductPart extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema    : 'mne_warehouse',
      query     : 'productpart',
      showids   : ['productpartid'],
      
      defalias  : ['productid'],

      okfunction  : 'productpart_ok',
      okcols  : ['productpartid','productid','count','partgroup','partdescription','partcost','partid','fixturetypeid','unit'],
      oktyps  : { count : 'long', partcost : 'double' },

      delfunction   : 'productpart_del',
      delcols       : [ 'productpartid' ],
      deltyps       : {},
      delconfirmids : [ 'partdescription'],

      hinput : true
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }
  //getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

  reset()
  {
    super.reset();
    
    this.obj.defvalues.partcostsumcurrency = MneConfig.uowncurrency;
    this.obj.defvalues.partcostcurrency = MneConfig.uowncurrency;
  }
  
  async load()
  {
    await super.load();

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

  async values()
  {
    await super.values();

    this.obj.outputs.partname.regexp = MneInput.checktype.ok;
    this.obj.outputs.fixturetype.regexp = MneInput.checktype.ok;
  }
}

export default MneErpWarehouseProductPart;
