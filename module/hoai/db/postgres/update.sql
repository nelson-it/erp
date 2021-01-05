drop schema mne_hoaiupdate cascade;
create schema mne_hoaiupdate;
create table mne_hoaiupdate.product as select t0.productid  from mne_crm.product t0 left join mne_hoai.workphase t1 on ( t0.productid = t1.productid) left join mne_hoai.feeextra t2 on ( t2.productid = t0.productid ) WHERE t1.productid is not null or t2.productid is not null;

delete from mne_hoai.workphase;
delete from mne_hoai.feeextra;
delete from mne_hoai.fee;
delete from mne_hoai.feename;

delete from mne_personnal.producttime where productid in ( select productid from mne_hoaiupdate.product );
delete from mne_warehouse.productpart where productid in ( select productid from mne_hoaiupdate.product );
delete from mne_crm.productprice where productid in ( select productid from mne_hoaiupdate.product );
delete from mne_crm.producttree where productid in ( select productid from mne_hoaiupdate.product );
delete from mne_crm.product where productid in ( select productid from mne_hoaiupdate.product );

delete from mne_crm.producttree where treeid in ( select t0.treeid from mne_crm.producttree t0 left join mne_crm.producttree t1 ON ( t1.parentid = t0.treeid ) where t1.treeid is NULL and t0.productid is null );
delete from mne_crm.producttree where treeid in ( select t0.treeid from mne_crm.producttree t0 left join mne_crm.producttree t1 ON ( t1.parentid = t0.treeid ) where t1.treeid is NULL and t0.productid is null );
delete from mne_crm.producttree where treeid in ( select t0.treeid from mne_crm.producttree t0 left join mne_crm.producttree t1 ON ( t1.parentid = t0.treeid ) where t1.treeid is NULL and t0.productid is null );
delete from mne_crm.producttree where treeid in ( select t0.treeid from mne_crm.producttree t0 left join mne_crm.producttree t1 ON ( t1.parentid = t0.treeid ) where t1.treeid is NULL and t0.productid is null );
delete from mne_crm.producttree where treeid in ( select t0.treeid from mne_crm.producttree t0 left join mne_crm.producttree t1 ON ( t1.parentid = t0.treeid ) where t1.treeid is NULL and t0.productid is null );
