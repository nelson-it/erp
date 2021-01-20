//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/order/productlist.mjs
//================================================================================
'use strict';

import MneTableWeblet from '/weblet/allg/table/fix.mjs'

class MneErpOrderProductlist extends MneTableWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        tableweblet : '/weblet/crm/order/productlisttable',
        
        schema    : 'mne_crm',
        query     : 'orderproduct_list', 
        table     : 'orderproduct',
        cols      : 'orderproductid,productnumber,productname,fromoffer,productcount,actcount,productunit',
        scols     : 'sortcol,position',
        showids   : [ 'orderid', 'orderproducttype' ],
        showalias : [ 'orderid', '#' ], 

        wcol      : 'sortcol',
        wop       : '=',
        wval      : '1',

        primarykey : [ 'orderproductid' ],

        tablehidecols    : ['orderproductid'], 
        tablerowstyle    : ['sum',''],
        tablerowstylecol : ['sortcol','result'],
        tablecoltype     : { actcount : 'text' },
        
        okids : [ 'orderproductid' ],

        adddetail    : true,
        detailweblet : 'productdetail',
        delbutton    : 'add,del',

        delconfirmids : [ 'productname'],

        calcfunction    : 'orderproduct_calculate',
        calcfunctionall : 'orderproduct_calculate_all',

        savedependvalues : true
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneErpOrderProductlist;
