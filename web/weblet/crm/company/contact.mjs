//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/company/contact.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneFixTableWeblet from '/weblet/allg/table/fix.mjs'

class MneCrmCompanyContact extends MneFixTableWeblet
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      tableweblet  : 'crm/company/contacttable',
        
      schema : 'mne_crm',
      query : 'company_contact',
      table : 'companyperson',
       cols : 'companypersonid,personid,fullname,email,telephonoffice,telephonmobil,description,refname',

      tablehidecols : [ 'companypersonid', 'personid' ], 
      tablecoltype  : { description : 'text' },

      showids       : [ 'companyid' ],
      okids         : [ 'companypersonid'],
      delids        : [ 'companypersonid'],

      delconfirmids : [  'fullname' ],
      
      delbutton : [ 'add', 'cancel' ],
      
      defvalues : { email : '' },
      
      adddetail    : true,
      
      detailscreen    : 'crm_person',
      detailvalues    : { personid : "personid" },
      detaildefvalues : { detail : { refid : 'companyid', refname : 'company' }},

      detailassoz : 'assoz',
      

    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

}

export default MneCrmCompanyContact;
