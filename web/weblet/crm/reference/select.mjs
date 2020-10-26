//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/reference/select.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneTableSelect     from '/weblet/allg/table/select.mjs'

class MneErpCrmReferenceSelect extends MneTableSelect
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        tableweblet : '/weblet/crm/reference/selecttable',
    
        schema : 'mne_crm',
        query  : 'reference',
        
        cols   : 'refid,ref,companyid,personid,ownerrefid,reftyp,ownerrefname,refname',
        showcols : 'refid,refname',
        scols  : 'reftyp,refname',

        tablehidecols : ['refid','ref','companyid','personid','ownerrefid'],
        
        selcol : 'refname',
        notitle : true
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneErpCrmReferenceSelect
