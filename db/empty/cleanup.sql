delete from mne_application.joindef
  where joindefid IN (select tt0.joindefid from mne_application.joindef tt0
                               LEFT JOIN mne_application.querytables tt1 ON  (tt0.joindefid = tt1.joindefid ) WHERE tt1.joindefid is null);

delete from mne_application.tablecolnames 
  where tab != '' AND oid IN (select tt0.oid from mne_application.tablecolnames tt0
                               LEFT JOIN ( select nspname, relname from pg_class t0 INNER JOIN pg_namespace t1 ON ( t0.relnamespace = t1.oid )) tt1 
                               ON ( tt0."schema" = tt1.nspname AND tt0."tab" = tt1.relname) where tt1.nspname is null AND tt0.schema != '' );
