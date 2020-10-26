//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/offer/productpart.mjs
//================================================================================
'use strict';

import MneConfig  from '/js/basic/config.mjs'
import MneText    from '/js/basic/text.mjs'
import MneLog     from '/js/basic/log.mjs'
import MneRequest from '/js/basic/request.mjs'

import MneElement from '/weblet/basic/element.mjs'
import MneDbView  from '/weblet/db/view.mjs'

class MneErpWarehouseOfferProductpart extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema     : 'mne_warehouse',
        query      : 'offerproductpart',
        table      : 'offerproductpart',
        showids    : ['offerproductpartid'],

        okfunction  : 'offerproductpart_ok',
        okcols      : [ 'offerproductid', 'offerproductpartid', 'partgroup', 'partdescription', 'partid', 'fixturetypeid', 'count', 'partcost', 'unit', 'pownerid' ], 
        oktyps      : { count : 'double', partcost : 'double' },

        delfunction : 'offerproductpart_del',
        delcols     : [ 'offerproductpartid' ],
      delconfirmids : [ 'partdescription'],

       defvalues    : { partcurrency : MneConfig.uowncurrency, partcurrencysum : MneConfig.uowncurrency },
       defalias     : {
                         offerid            : 'offerid',
                         offerproductid     : 'offerproductid',
                         offerproductpartid : 'rofferproductpartid',
                         partid             : 'partid',
                         fixturetypeid      : 'fixturetypeid',
                         pownerid           : 'pownerid',
                         productid          : 'productid',
                         productname        : 'productname',
                         partgroup          : 'partgroup',
                         partdescription    : 'partdescription',
                         count              : 'count',
                         unit               : 'unit',
                         partcost           : 'partcost',
                         partcostsum        : 'partcostsum',
                         productcount       : 'productcount',
                         partname           : 'partname',
                         fixturetype        : 'fixturtype',
                         powner             : 'powner'
                      },
        regexp      : { offerproductid : 'keyvalue' },
        checklabel  : { offerproductid : 'productname' },

      hinput : false
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

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
  
  async add()
  {
    this.obj.noclearadd = true;
    await super.add();
    if ( this.obj.noclearadd && this.obj.inputs.offerproductpartid.getValue() != '################' )
    {
      this.obj.inputs.offerproductpartid.setValue('################');
      [ 'partid', 'fixturetypeid', 'pownerid', 'count', 'partcost', 'partcostsum', 'partdescription', 'partname', 'fixturetype' ].forEach( ( item ) =>
      {
        if ( this.obj.inputs[item] ) this.obj.inputs[item].setValue('');
        if ( this.obj.outputs[item] ) this.obj.outputs[item].setValue('');
      })
    }
  }

  async ok(data)
  {
    this.obj.noclearadd = false;
    return super.ok(data);
  }
  
}

export default MneErpWarehouseOfferProductpart;
