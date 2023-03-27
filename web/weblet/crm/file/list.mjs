//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/allg/file/list.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneFilterTable from '/weblet/allg/table/filter.mjs'

class MneAllgFileList extends MneFilterTable
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
        tableweblet : '/weblet/crm/file/listtable',
        selectsingle : true,

        schema : 'mne_crm',
        query  : 'file',
        table  : 'file',
        cols   : 'fileid,refid,secondrefid,datatype,havesource,name,description,source,xsource,data,typ,author,createdate,secondrefname',
        scols  : '!createdate,description',
        selcol : 'description',
        selop  : 'like',

        tablehidecols : ['fileid','refid','secondrefid','data', 'datatype','havesource', 'source', 'xsource'],
        tablecoltype  : { name : 'file', description : 'text', typ : 'selection' },

        defvalues : { typ : 'notice', datatype : 'text/plain' },

        oktable : 'file',
        okids   : [ 'fileid' ],
        okcols  : [ 'fileid', 'refid','secondrefid','name','typ','description', 'datatype', 'author' ],

        delconfirmids : ['description'],
        
        primarykey : [ 'fileid' ],
        
        idname          : 'fileid',
        namename        : 'name',
        descriptionname : 'description',
        datatypename    : 'datatype',
        dataname        : 'data',

        report    : "mne_filedata",
        delbutton : [ 'print', 'export']
    };
    
    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
}

export default MneAllgFileList;
