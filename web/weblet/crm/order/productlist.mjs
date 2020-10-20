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

class MneErpOrderProductlist extends MneTableWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
 /*   schema : 'mne_crm',
    query : 'orderproduct_list',
    table : 'orderproduct',
    id : 'orderproductid',
    showid : 'orderproductid',

    cols : 'orderproductid,productnumber,productname,fromoffer,productcount,cactcount,productunit',
    scols : 'sortcol,position',

    tablehidecols : '0',
    tablecoltype: ',,,,,text,,',
    tablecolstyle: ',right,,,,input4,,',

    oktable : 'orderproduct',
    okids : 'orderproductid',
    okcols : ',,,,,actcount,',

    showdynpar : '"orderidInput.old" : "orderid", "orderproducttypeInput.old" : "#"',
    showdynparweblet : 'detail',
    shownull : true,
    reshowvalue : true,


    popup : 'productdetail',
*/
    var ivalues = 
    {
        tableweblet : (new URL(import.meta.url)).pathname.replace(/\/[^\/]+\.mjs$/, '/productlisttable'),
        
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
