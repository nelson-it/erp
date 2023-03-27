//================================================================================
//
// Copyright: M.Nelson - technische Informatik
// Die Software darf unter den Bedingungen 
// der APGL ( Affero Gnu Public Licence ) genutzt werden
//
// datei: weblet/allg/file/listtable.mjs
//================================================================================
'use strict';

import MneConfig    from '/js/basic/config.mjs'
import MneText      from '/js/basic/text.mjs'
import MneLog       from '/js/basic/log.mjs'
import MneRequest   from '/js/basic/request.mjs'
import MneElement from '/weblet/basic/element.mjs'

import MneDbTableView from '/weblet/db/table/view.mjs'

class MneAllgFileListTable extends MneDbTableView
{
  constructor(parent, frame, id, initpar = {}, config = {} )
  {
    var ivalues = 
    {
    };

    super(parent, frame, id, Object.assign(ivalues, initpar), config );
  }
  
  reset()
  {
    super.reset();
    
    this.obj.mkbuttons.push({ id: 'data',     value : MneText.getText('#mne_lang#Editor#'), space : 'before' } );
    this.obj.mkbuttons.push({ id: 'download', value : MneText.getText('#mne_lang#Ansehen#'), behind : 'data' } );
    
    this.obj.enablebuttons.buttons.push('data');
    this.obj.enablebuttons.buttons.push('download');
    
    this.obj.enablebuttons.select.push('data');
    this.obj.enablebuttons.select.push('download');
    
    this.obj.enablebuttons.add.push('data');
    
    this.obj.defvalues.author = ( MneConfig.fullname ) ? MneConfig.fullname : MneConfig.loginname;
    this.obj.defvalues.name = MneText.getText("#mne_lang#Neue Notiz");
  }
  
  async selectRow(data, row, evt = {})
  {
    await super.selectRow(data, row, evt);
    if ( ! this.obj.run.act_row || ! this.obj.run.values.havesource)
      {
      this.obj.buttons.data.disabled = true;
      
      }
  }
  
  async mkRow(row)
  {
    await super.mkRow(row);
    row.obj.files.name.ignoredefaultlistener = true;
    
    row.obj.files.name.addEventListener('change', (evt) =>
    {
      if ( evt.target.files[0].size > 5000000 )
      {
        MneLog.error(MneText.getText('#mne_lang#Datei ist grösser als 5MB'));
        row.obj.outputs[this.initpar.dataname].modValue('');
        row.obj.outputs[this.initpar.datatypename].modValue('text/plain');
        return;
      }
      
      row.obj.outputs.havesource.modValue(false);
      row.obj.outputs.source.modValue('');
      
      var out = row.obj.files.name.mne_output;
      if ( ! out.getValue(false) || out.getValue(false) == this.obj.defvalues.name )
      {
        out.modValue(evt.target.files[0].name);
        row.obj.inputs[this.initpar.descriptionname].modValue(evt.target.files[0].name.substring(0, evt.target.files[0].name.lastIndexOf(".")));
      }
      row.obj.outputs[this.initpar.datatypename].modValue(evt.target.files[0].type);

      var reader = new FileReader();
      reader.addEventListener('load', (evt) =>
      {
        row.obj.outputs[this.initpar.dataname].modValue(evt.target.result.split(',')[1]);
      });
      reader.readAsDataURL(evt.target.files[0]);
    }, true);
    
  }
  
  async data()
  {
    var w = await this.openpopup('rte');
    
    if ( this.obj.tables.content.querySelector('tbody td') == null || this.obj.run.act_row == null || ( this.obj.run.okaction != 'add' && this.obj.run.values.havesource != true ) )
      await this.add();
    
    if ( ! this.obj.inputs.description.getValue(false) )
      this.obj.inputs.description.modValue(MneText.getText("#mne_lang#Neue Notiz"));
    
    w.setValue(this.obj.run.values.source);
    
    this.obj.buttons.ok.disabled = true;
    this.obj.run.act_row.obj.outputs[this.initpar.datatypename].modValue('application/pdf'); 
    
    var act_row = this.obj.run.act_row;
    var ok = async () => 
    {
      act_row.obj.outputs.source.modValue( w.getValue());
      act_row.ismodify = true;
      
      w.close();
      await this.ok();
    }
    
    var cancel = async () =>
    {
      w.close();
      this.refresh();
    }

    w.ok = ok;
    w.cancel = cancel;

    return false;
  }
  
  async download()
  {
    var parent = this.initpar.popupparent ?? this;
    var w;
    
    if ( ! ( w = parent.obj.weblets['show'] ) )
    {
      var self = this;
      w = await this.createpopup('show');
    
      w.getData = async function()
      {
        var res;
        var param =
        {
            schema : self.initpar.schema,
            table  : self.initpar.table,
            cols   : self.initpar.dataname,
            sqlstart : 1,
            sqlend : 1
        };
  
        param[self.initpar.idname + "Input.old"] = self.config.dependweblet.obj.run.values[self.initpar.idname];

        try
        {
          res = await MneRequest.fetch('db/utils/table/' + self.config.dependweblet.obj.run.values[self.initpar.namename], param, true);
          return await res.blob();
        }
        catch(e)
        {
          return new Blob([], {type : 'text/plain;charset=UTF-8'});
        }
      }

    }
    
    await w.show();
    w.newvalues = true;
    await w.check_values();

    return false;
  }
  
  async dblclick()
  {
      return this.download();
  }

  async add(data)
  {
      await super.add(data);
      this.obj.buttons.data.disabled = false;
      
      if ( this.obj.weblets.rte && this.obj.weblets.rte.visible )
        await this.data();
  }

  async ok()
  {
    if ( this.obj.buttons.ok ) 
    {
      var i,j;
      var rows = this.obj.tbody.children;
      var retval = false;
      
      this.obj.run.selectedkeys = [];
      
      for ( i=0; i<rows.length; i++)
      {
        if ( rows[i].ismodify || rows[i].querySelector('.modifyok') != null ) 
        {
          var p = {};

          retval = true;
          await this.selectRow({force : true, type : 'ok'}, rows[i] )
          this.primarykey();

          if ( this.obj.outputs.data.getModify() ) p.dataInput = this.obj.outputs.data.getValue();
          if ( this.obj.outputs.havesource.getValue() ) this.obj.outputs[this.initpar.datatypename].modValue('application/pdf'); 
          p.sourceInput = ( this.obj.outputs.source.getModify() ) ?  this.obj.outputs.source.getValue() : this.obj.outputs.xsource.getValue();
          
          await super.ok(p);
          
          if ( p.sourceInput || this.obj.outputs.havesource.getValue() )
          {
            p =
            {
                schema : this.initpar.schema,
                query : this.initpar.query,
                wval : this.obj.run.values.fileid,
                wop  : "=",
                wcol : 'fileid',
                macro0: 'reptitle,' + this.obj.inputs.description.getValue(),
                macro1: 'preprint,1',
                xml0  : 'pretext,' + ( ( this.obj.outputs.source.getModify() ) ? this.obj.outputs.source.getValue() : this.obj.outputs.xsource.getValue() ),
                sort : '',

                base64 : '1',
                base64schema  : this.initpar.schema,
                base64table   : this.initpar.table,
                base64id      : 'fileid',
                base64idvalue : this.obj.run.values.fileid,
                base64data    : 'data',

                sqlstart : 1,
                sqlend : 1
            };

            var res = await MneRequest.fetch('report/' + this.initpar.report + ".pdf", p);
          }

        }
      }
      this.dependweblet = undefined;
    }
    return retval;
  }

  async values()
  {
    await super.values();

    this.obj.buttons.data.disabled = ( ! this.config.dependweblet.obj.run.values[this.initpar.refidname] );
    this.obj.defvalues.refid = this.config.dependweblet.obj.run.values[this.initpar.refidname];
    
    if ( ! this.config.dependweblet.obj.run.values[this.initpar.refidname]  || this.config.dependweblet.obj.run.values[this.initpar.refidname]  == '################')
      this.enable('', false)
  }
}

export default MneAllgFileListTable
