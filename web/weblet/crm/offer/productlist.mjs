//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/offer/productlist.mjs
//================================================================================
'use strict';

import MneTableWeblet from '/weblet/allg/table/fix.mjs'

class MneErpOfferProductlist extends MneTableWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        tableweblet : (new URL(import.meta.url)).pathname.replace(/\/[^\/]+\.mjs$/, '/productlisttable'),
        
        schema : 'mne_crm',
        query : 'offerproduct_list', 
        table : 'offerproduct',
         cols : 'sortcol,result,offerproductid,isproduct,productname,productnumber,productcount,productunit,productprice,productcost,pricechange,sumnet,pcurrency,sumcost,sumdiff', 
        scols : 'sortcol,position', 

       primarykey : [ 'offerproductid' ],

          tablehidecols : ['sortcol','result','offerproductid'], 
          tablerowstyle : ['sum',''],
       tablerowstylecol : ['sortcol','result'],
          tablecoltype  : { productname : 'text', productnumber : 'text', productcount : 'text', productunit : 'text', productprice : 'text' },

       modfunction : 'offerproduct_update',
           modcols : [ 'offerproductid','productname','productnumber','productcount','productprice','productcost'],
           modtyps : { productcount : 'double', productprice : 'double', productcost : 'double' },

         showids : [ 'offerid', 'offerproducttype' ],
       showalias : [ 'offerid', '#' ], 

          adddetail : true,
       detailweblet : 'productdetail',
          delbutton : 'add,del',
       
       delconfirmids : [ 'productname'],
       
       calcfunction    : 'offerproduct_calculate',
       calcfunctionall : 'offerproduct_calculate_all',

       savedependvalues : true
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  async values(param)
  {
    await super.values(param);
    
    this.obj.run.origvalues = Object.assign(this.obj.run.origvalues, { offerproducttype : this.initpar.showalias[1]() } );
    this.obj.run.values = Object.assign({}, this.obj.run.origvalues);
  }

}

export default MneErpOfferProductlist;
