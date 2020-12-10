//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/crm/company/own.mjs
//================================================================================
'use strict';

import MneElement from '/weblet/basic/element.mjs'
import MneText     from '/js/basic/text.mjs'
import MneLog      from '/js/basic/log.mjs'
import MneRequest  from '/js/basic/request.mjs'

import MneDbView   from '/weblet/db/view.mjs'

class MneCrmCompanyOwn extends MneDbView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
      schema        : 'mne_crm',
      query         : 'companyown',
      table         : 'companyown',
      showids       : ['companyid'],
      delconfirmids : [ 'company'],

       okids : ['companyownid'],
      delids : ['companyownid'],
      
      defalias :  { companyid : 'companyid', company : 'company' },
      
      hinput : false 
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }

  getViewPath() { return this.getView(import.meta.url) }

  async ok()
  {
    if ( this.obj.files.reportheader.getModify() )
    {
      var data = new FormData();
      data.append('companyownprefix', this.obj.inputs.prefix.getValue());
      data.append('data', this.obj.files.reportheader.files[0], this.obj.files.reportheader.files[0].name);
      var res = await MneRequest.fetch('/report/header.html', data);
      res = res.replace(/^\n*/,'');
      
      if ( res.split('\n').pop() != 'ok' )
        throw new Error(res);
      else if ( res != 'ok')
        MneLog.warning(res)
    }

    return super.ok();
  }
}

export default MneCrmCompanyOwn;
