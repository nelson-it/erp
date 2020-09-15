//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/dbadmin/table/content.mjs
//================================================================================
'use strict';

import MneTableWeblet from '/weblet/allg/table/fix.mjs'

class MneErpWarehouseProductPartlist extends MneTableWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        schema : 'mne_warehouse',
        query : 'productpart_list',
         cols : 'sorting,productid,productpartid,partgroup,partdescription,count,unit,partcost,sumcost,partcostcurrency,partname,fixturetype',
        scols : 'sorting,partdescription',
      showids : [ 'productid' ],
      
      primarykey : ['productpartid'],

      tablehidecols    : ['sorting','productid','productpartid'],
      tablerowstyle    : [ 'sum' ],
      tablerowstylecol : [ 'sorting' ],
      tablecoltype     : { count: 'text', partcost : 'text' },

      modfunction : 'productpart_update',
          modcols : [ 'productpartid', 'count', 'partcost' ],
          modtyps : { count : 'long', partcost : 'double' },

      adddetail : true,
      detailweblet : 'partmanagementedit',
      savedependvalues : true
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  getCssPath()  { return (( super.getCssPath() ) ?  super.getCssPath() + ',' : '') + this.getCss(import.meta.url); }

}

export default MneErpWarehouseProductPartlist;
