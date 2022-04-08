//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/warehouse/product/partlist.mjs
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
          modtyps : { count : 'double', partcost : 'double' },

          adddetail : true,
       detailweblet : 'partmanagementedit',
      delconfirmids : ['partdescription'],
      
      savedependvalues : true
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneErpWarehouseProductPartlist;
