update mne_application.menu set action = regexp_replace(regexp_replace(regexp_replace(action, '^show', '{ "action" :  "show", '),'\(', ' "parameter" : [ '), '\)', '] }')
update mne_application.menu set action =  '{ "action" : "submenu", "parameter" : "" }' where action = 'submenu'
update mne_application.menu set action = regexp_replace(action, E'\'', '"', 'g' ) where action like E'%\'%'