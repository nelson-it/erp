--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.11
-- Dumped by pg_dump version 9.1.9
-- Started on 2014-01-13 09:52:47

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 8 (class 2615 OID 220680)
-- Name: mne_hoai; Type: SCHEMA; Schema: -; Owner: admindb
--

CREATE SCHEMA mne_hoai;


ALTER SCHEMA mne_hoai OWNER TO admindb;

SET search_path = mne_hoai, pg_catalog;

--
-- TOC entry 494 (class 1255 OID 220814)
-- Dependencies: 1591 8
-- Name: mne_history_offer(); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION mne_history_offer() RETURNS trigger
    LANGUAGE plpgsql
    AS $$  DECLARE     str varchar := '';    oldval varchar := '';    newval varchar := '';    modrecord RECORD;  BEGIN   RETURN NULL;  END;$$;


ALTER FUNCTION mne_hoai.mne_history_offer() OWNER TO admindb;

--
-- TOC entry 596 (class 1255 OID 220815)
-- Dependencies: 1591 8
-- Name: mne_history_order(); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION mne_history_order() RETURNS trigger
    LANGUAGE plpgsql
    AS $$  DECLARE     str varchar := '';    oldval varchar := '';    newval varchar := '';    modrecord RECORD;  BEGIN     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.zone;    oldval = OLD.zone;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''zone'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.ansatz;    oldval = OLD.ansatz;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''ansatz'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.kosten;    oldval = OLD.kosten;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''kosten'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.zeit;    oldval = OLD.zeit;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''zeit'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.zuschlag;    oldval = OLD.zuschlag;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''zuschlag'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.besonders;    oldval = OLD.besonders;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''besonders'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.zusatz;    oldval = OLD.zusatz;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''zusatz'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.neben;    oldval = OLD.neben;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''neben'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l1;    oldval = OLD.l1;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l1'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l2;    oldval = OLD.l2;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l2'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l3;    oldval = OLD.l3;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l3'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l4;    oldval = OLD.l4;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l4'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l5;    oldval = OLD.l5;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l5'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l6;    oldval = OLD.l6;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l6'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l7;    oldval = OLD.l7;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l7'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l8;    oldval = OLD.l8;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l8'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.l9;    oldval = OLD.l9;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''l9'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.leistung;    oldval = OLD.leistung;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''leistung'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;     IF ( TG_OP = 'DELETE' ) THEN       modrecord = OLD;    ELSE       modrecord = NEW;    END IF;    newval = modrecord.law;    oldval = OLD.law;  IF ( newval IS NULL ) THEN newval = ''; END IF;  IF ( oldval IS NULL ) THEN oldval = ''; END IF;  IF ( TG_OP = 'DELETE' OR newval <> oldval ) THEN     str = 'INSERT INTO mne_base.history '        || '( operation, createdate, createuser, refid, refcol, '        ||    '  schema, tabname, colname, '        ||    '  oldvalue, newvalue ) '        || 'SELECT ' || quote_literal(TG_OP)        ||    ',' || quote_literal(modrecord.modifydate) || ', session_user, '        ||    quote_literal(modrecord.orderid) || ', '        ||    ' ''orderid'', '        ||    ' ''mne_hoai'',               ''order'', ''law'', '      ||    quote_literal(oldval) || ',' || quote_literal(newval);  EXECUTE str;  END IF;   RETURN NULL;  END;$$;


ALTER FUNCTION mne_hoai.mne_history_order() OWNER TO admindb;

--
-- TOC entry 673 (class 1255 OID 1058090)
-- Dependencies: 1591 8
-- Name: offerhoai_ok(character varying, character varying, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, boolean); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) RETURNS character varying
    LANGUAGE plpgsql
    AS $$ DECLARE
    acttime int4;
    pp_record RECORD;
    pp_offerproductid varchar;
    pp_price float8;
    pp_cost float8;
    pp_unitprice float8;
    pp_unitcost float8;
    pp_timecount float8;
    pp_unit varchar;
    pp_count float8;
    pp_zusatz integer;  
BEGIN
   SELECT INTO acttime
        CAST(FLOOR(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)) AS INTEGER);

    FOR pp_record IN SELECT * FROM mne_hoai.workphase WHERE law = p_law  ORDER BY phase LOOP
     
     IF pp_record.phase = 1 THEN  pp_price = p_l1;
     ELSIF pp_record.phase = 2 THEN pp_price = p_l2;
     ELSIF pp_record.phase = 3 THEN pp_price = p_l3;
     ELSIF pp_record.phase = 4 THEN pp_price = p_l4;
     ELSIF pp_record.phase = 5 THEN pp_price = p_l5;
     ELSIF pp_record.phase = 6 THEN pp_price = p_l6;
     ELSIF pp_record.phase = 7 THEN pp_price = p_l7;
     ELSIF pp_record.phase = 8 THEN pp_price = p_l8;
     ELSE pp_price = p_l9;
     END IF;
       
     IF COALESCE(pp_record.productid, '' ) = '' THEN
       RAISE WARNING '%', pp_record.phase;
       RAISE WARNING '#mne_lang#Bitte ein Produkt für Leistungsphase hinterlegen#';
     ELSE 
       IF pp_price <> 0 THEN
         PERFORM mne_hoai.offerhoaisingle_ok(p_offerid, pp_record.productid, pp_record.productnumber, pp_record.phasename, pp_price, acttime, pauschal);
       END IF;
     END IF;
       
   END LOOP;
   
   pp_zusatz = 0;
   IF p_besonders  = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_neben      = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;   
   IF p_zeit       = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_zusatz     = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_zuschlag   = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
         
   FOR pp_record IN        SELECT * FROM mne_hoai.feeextra t0 where law = p_law
                     UNION SELECT * FROM mne_hoai.feeextra t1 where law = '' AND name <> 'default' AND name NOT IN ( SELECT DISTINCT name FROM mne_hoai.feeextra WHERE law = p_law ) LOOP
     
     IF    pp_record.name = 'besonders' THEN  pp_price = p_besonders;
     ELSIF pp_record.name = 'neben'     THEN  pp_price = p_neben;
     ELSIF pp_record.name = 'zeit'      THEN  pp_price = p_zeit;
     ELSIF pp_record.name = 'zusatz'    THEN  pp_price = p_zusatz;
     ELSIF pp_record.name = 'zuschlag'  THEN  pp_price = p_zuschlag;
     ELSE RAISE EXCEPTION '#mne_lang#Extraleistung ist unbekannt#';
     END IF;
     
     IF pp_price <> 0.0 THEN
       PERFORM mne_hoai.offerhoaisingle_ok(p_offerid, pp_record.productid, pp_record.productnumber, pp_record.productname, pp_price, acttime, pauschal);
       pp_zusatz = pp_zusatz + 1;
     END IF;
          
   END LOOP;
   
   IF pp_zusatz != 5 THEN
     RAISE EXCEPTION '#mne_lang#Bitte ein Produkt für alle benötigten Extraleistungen hinterlegen#';
   END IF;
           
   return 'ok';
END; $$;


ALTER FUNCTION mne_hoai.offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) OWNER TO admindb;

--
-- TOC entry 597 (class 1255 OID 220817)
-- Dependencies: 1591 8
-- Name: offerhoaisingle_ok(character varying, character varying, character varying, character varying, double precision, integer, boolean); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) RETURNS character varying
    LANGUAGE plpgsql
    AS $$ DECLARE
    pp_offerproductid varchar;
    pp_price float8;
    pp_cost float8;
    pp_unitprice float8;
    pp_unitcost float8;
    pp_timecount float8;
    pp_unit varchar;
    pp_count float8;
    pp_position INTEGER;
    pp_skillcount INTEGER;
    pp_minsorting INTEGER;
    
    r_productid varchar;
BEGIN

  r_productid = p_productid;
  
  pp_price = p_price;
  PERFORM mne_crm.offerproduct_del(offerproductid) FROM mne_crm.offerproduct WHERE offerid = p_offerid AND productnumber = p_productnumber;
  PERFORM mne_crm.offerproduct_del(offerproductid) FROM mne_crm.offerproduct WHERE offerid = p_offerid AND productname = p_productname;
      
  SELECT INTO pp_offerproductid mne_crm.offerproduct_add(p_offerid, '', p_productid);
  r_productid = p_productid;
  PERFORM * FROM mne_personnal.producttime WHERE productid = p_productid;
  IF NOT FOUND OR p_pauschal THEN
    SELECT productid INTO r_productid FROM mne_hoai.feeextra WHERE name = 'default';
  END IF;
  
  SELECT unitcost, unitprice, unit INTO pp_unitcost, pp_unitprice, pp_unit FROM mne_crm.productprice WHERE productid = r_productid;

  IF pp_unitprice <> 0.0 AND pp_unitcost <> 0.0 THEN
    pp_cost = pp_price / pp_unitprice * pp_unitcost;
    pp_timecount = pp_price / pp_unitprice;
  ELSE
    pp_cost = 0.0;
    pp_timecount = 0.0;
  END IF;
       
  pp_count = 1;
  IF pp_unit = '%' THEN
    pp_cost = pp_cost / 100;
    pp_price = pp_price / 100;
    pp_timecount = pp_timecount / 100;
    pp_count = 100;
  END IF;

  UPDATE mne_crm.offerproduct
   SET
     productid = null, productnumber = p_productnumber, count = pp_count, productprice = pp_price, productcost = pp_cost, productname = COALESCE(NULLIF(p_productname,''),productname),
     modifydate = acttime, createdate = acttime, modifyuser = session_user, createuser = session_user
   WHERE offerproductid = pp_offerproductid;

   INSERT INTO mne_personnal.offerproducttime
     ( offerproducttimeid, offerproductid, description, step, skillid, setduration, createdate, modifydate, createuser, modifyuser ) 
   SELECT
      mne_catalog.mk_id(), pp_offerproductid, description, step, skillid, duration * pp_timecount, acttime, acttime, session_user, session_user
   FROM mne_personnal.producttime
   WHERE productid = r_productid;
     
   INSERT INTO mne_warehouse.offerproductpart
     ( offerproductpartid, offerproductid, partgroup, partdescription, partcost, fixturetypeid  , partid, count, createdate, modifydate, createuser, modifyuser ) 
   SELECT
     mne_catalog.mk_id(), pp_offerproductid, partgroup, partdescription, partcost, fixturetypeid, partid, CASE WHEN COALESCE(unit,'') <> '' THEN round(count * pp_timecount) ELSE count END, acttime, acttime, session_user, session_user
   FROM mne_warehouse.productpart
   WHERE productid = r_productid;
       
   UPDATE mne_crm.offerproduct
      SET productcost = mne_crm.offerproduct_cost(pp_offerproductid)
   WHERE offerproductid = pp_offerproductid;

   return pp_offerproductid;
   
END; $$;


ALTER FUNCTION mne_hoai.offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) OWNER TO admindb;

--
-- TOC entry 677 (class 1255 OID 1058091)
-- Dependencies: 8 1591
-- Name: orderhoai_ok(character varying, character varying, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, boolean); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) RETURNS character varying
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$ DECLARE
    acttime int4;
    pp_record RECORD;
    pp_offerproductid varchar;
    pp_price float8;
    pp_cost float8;
    pp_unitprice float8;
    pp_unitcost float8;
    pp_timecount float8;
    pp_unit varchar;
    pp_count float8;  
    pp_zusatz integer;  
BEGIN
   SELECT INTO acttime
        CAST(FLOOR(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)) AS INTEGER);

     FOUND := FALSE;
     PERFORM t0.orderproductpartid FROM mne_warehouse.orderproductpart t0
                   INNER JOIN mne_crm.orderproduct t1 ON ( t0.orderproductid = t1.orderproductid AND t1.orderid = p_orderid AND t0.actcount > 0 );
     
    IF FOUND THEN
        RAISE EXCEPTION '#mne_lang#Es wurde schon Material zu diesem Auftrag erfasst#';
    END IF;

    FOUND := FALSE;
    PERFORM t0.orderproducttimeid FROM            mne_personnal.time t0 
              INNER JOIN mne_personnal.orderproducttime t1 ON ( t0.orderproducttimeid = t1.orderproducttimeid )
              INNER JOIN mne_crm.orderproduct t2 ON ( t1.orderproductid = t2.orderproductid )
    WHERE t2.orderid = p_orderid;
     
    IF FOUND THEN
        RAISE EXCEPTION '#mne_lang#Es wurden schon Zeiten zu diesem Auftrag erfasst#';
    END IF;
    
    FOUND := FALSE;
    PERFORM t0.orderid FROM mne_shipment.deliverynote t0 WHERE orderid = p_orderid;
    IF FOUND THEN
        RAISE EXCEPTION '#mne_lang#Es wurden schon Teile des Auftrags ausgeliefert#';
    END IF;

    FOR pp_record IN SELECT * FROM mne_hoai.workphase WHERE law = p_law  ORDER BY phase LOOP

     IF pp_record.phase = 1 THEN  pp_price = p_l1;
     ELSIF pp_record.phase = 2 THEN pp_price = p_l2;
     ELSIF pp_record.phase = 3 THEN pp_price = p_l3;
     ELSIF pp_record.phase = 4 THEN pp_price = p_l4;
     ELSIF pp_record.phase = 5 THEN pp_price = p_l5;
     ELSIF pp_record.phase = 6 THEN pp_price = p_l6;
     ELSIF pp_record.phase = 7 THEN pp_price = p_l7;
     ELSIF pp_record.phase = 8 THEN pp_price = p_l8;
     ELSE pp_price = p_l9;
     END IF;
       
     IF pp_price <> 0.0 THEN
       PERFORM mne_hoai.orderhoaisingle_ok(p_orderid, pp_record.productid, pp_record.productnumber, pp_record.phasename, pp_price, acttime, p_pauschal);
     END IF;
     
   END LOOP;
   
   pp_zusatz = 0;
   IF p_besonders  = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_neben      = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;   
   IF p_zeit       = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_zusatz     = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;
   IF p_zuschlag   = 0.0 THEN pp_zusatz = pp_zusatz + 1; END IF;

   FOR pp_record IN       SELECT * FROM mne_hoai.feeextra t0 where law = p_law
                    UNION SELECT * FROM mne_hoai.feeextra t1 where law = '' AND name <> 'default' AND name NOT IN ( SELECT DISTINCT name FROM mne_hoai.feeextra WHERE law = p_law ) LOOP
     
     IF    pp_record.name = 'besonders' THEN  pp_price = p_besonders;
     ELSIF pp_record.name = 'neben'     THEN  pp_price = p_neben;
     ELSIF pp_record.name = 'zeit'      THEN  pp_price = p_zeit;
     ELSIF pp_record.name = 'zusatz'    THEN  pp_price = p_zusatz;
     ELSIF pp_record.name = 'zuschlag'  THEN  pp_price = p_zuschlag;
     ELSE RAISE EXCEPTION '#mne_lang#Extraleistung ist unbekannt#';
     END IF;
     
     IF pp_price <> 0.0 THEN
       PERFORM mne_hoai.orderhoaisingle_ok(p_orderid, pp_record.productid, pp_record.productnumber, pp_record.productname, pp_price, acttime, p_pauschal);
       pp_zusatz = pp_zusatz + 1;
     END IF;
     
   END LOOP;
 
   IF pp_zusatz != 5 THEN
     RAISE EXCEPTION '#mne_lang#Bitte ein Produkt für alle benötigten Extraleistungen hinterlegen#';
   END IF;
   
   return 'ok';
END; $$;


ALTER FUNCTION mne_hoai.orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) OWNER TO admindb;

--
-- TOC entry 598 (class 1255 OID 220819)
-- Dependencies: 8 1591
-- Name: orderhoaisingle_ok(character varying, character varying, character varying, character varying, double precision, integer, boolean); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) RETURNS character varying
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$ DECLARE
  pp_orderproductid varchar;
  pp_price float8;
  pp_cost float8;
  pp_unitprice float8;
  pp_unitcost float8;
  pp_timecount float8;
  pp_unit varchar;
  pp_count float8;    
  pp_skillcount INTEGER;
  pp_minsorting INTEGER;
  pp_productid varchar;
BEGIN
  pp_price = p_price;
  PERFORM mne_crm.orderproduct_del(orderproductid) FROM mne_crm.orderproduct WHERE orderid = p_orderid AND productnumber = p_productnumber;
  PERFORM mne_crm.orderproduct_del(orderproductid) FROM mne_crm.orderproduct WHERE orderid = p_orderid AND productname = p_productname;
  
  SELECT INTO pp_orderproductid mne_crm.orderproduct_add(p_orderid, '', p_productid);

  pp_productid = p_productid;
  PERFORM * FROM mne_personnal.producttime WHERE productid = p_productid;
  IF NOT FOUND OR p_pauschal THEN
    DELETE FROM mne_personnal.orderproducttime WHERE orderproductid = pp_orderproductid;
    SELECT productid INTO pp_productid FROM mne_hoai.feeextra WHERE name = 'default';
    INSERT INTO mne_personnal.orderproducttime
      ( orderproducttimeid, orderproductid, setduration, longdesc, description, skillid, step,
         createdate, createuser, modifydate, modifyuser )
    SELECT
      mne_catalog.mk_id(),
      pp_orderproductid,
      COALESCE(t2.duration,0),
      t2.longdesc,
      COALESCE(t2.description,'Allgemeine Arbeiten'),
      COALESCE(t2.skillid,'special'),
      COALESCE(t2.step,0),
      acttime, session_user, acttime, session_user
    FROM mne_crm.product t1
      LEFT JOIN mne_personnal.producttime t2 ON ( t2.productid = t1.productid )
    WHERE t1.productid = pp_productid;
  END IF;

  SELECT unitcost, unitprice, unit INTO pp_unitcost, pp_unitprice, pp_unit FROM mne_crm.productprice WHERE productid = pp_productid;

  IF pp_unitprice <> 0.0 AND pp_unitcost <> 0.0 THEN
    pp_cost = pp_price / pp_unitprice * pp_unitcost;
    pp_timecount = pp_price / pp_unitprice;
  ELSE
    pp_cost = 0.0;
    pp_timecount = 0.0;
  END IF;

  pp_count = 1;
  IF pp_unit = '%' THEN
    pp_cost = pp_cost / 100;
    pp_price = pp_price / 100;
    pp_timecount = pp_timecount / 100;
    pp_count = 100;
  END IF;

  UPDATE mne_crm.orderproduct
    SET
      productid = null, productnumber = p_productnumber, count = pp_count, 
      productprice = pp_price, productcost = pp_cost,
      productpricecalc = pp_price, productcostcalc = pp_cost,
      productcostrecalc = true,
      productname = COALESCE(NULLIF(p_productname,''),productname),
      modifydate = acttime, createdate = acttime, modifyuser = session_user, createuser = session_user
    WHERE orderproductid = pp_orderproductid;

  UPDATE mne_personnal.orderproducttime SET setduration = ( setduration * pp_timecount ) WHERE orderproductid = pp_orderproductid;

  UPDATE mne_warehouse.orderproductpart
    SET count = CASE WHEN COALESCE(unit,'') <> '' THEN round(count * pp_timecount) ELSE count END
    WHERE orderproductid = pp_orderproductid;
       
  UPDATE mne_crm.orderproduct
    SET productcost = COALESCE(NULLIF(mne_crm.orderproductcost(pp_orderproductid),0.0), productcostcalc )
    WHERE orderproductid = pp_orderproductid;
       
 return pp_orderproductid;
   
END; $$;


ALTER FUNCTION mne_hoai.orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) OWNER TO admindb;

--
-- TOC entry 602 (class 1255 OID 220820)
-- Dependencies: 8 1591
-- Name: workphase_ok(character varying, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) RETURNS character varying
    LANGUAGE plpgsql
    AS $$ DECLARE
    acttime INTEGER;
    p_workphaseid varchar;
    p_value float8;
BEGIN
    
    SELECT INTO acttime
        CAST(FLOOR(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)) AS INTEGER);

     SELECT p_value1 + p_value2 + p_value3 + p_value4 + p_value5 + p_value6 + p_value7 + p_value8 + p_value9 
     INTO p_value;
     
     IF p_value != 100.0 THEN 
        RAISE EXCEPTION '#mne_lang#Summe ist ungleich 100#';
     END IF;
     
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase1name, p_value1, productid1, productnumber1, 1, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase2name, p_value2, productid2, productnumber2, 2, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase3name, p_value3, productid3, productnumber3, 3, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase4name, p_value4, productid4, productnumber4, 4, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase5name, p_value5, productid5, productnumber5, 5, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase6name, p_value6, productid6, productnumber6, 6, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase7name, p_value7, productid7, productnumber7, 7, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase8name, p_value8, productid8, productnumber8, 8, acttime);
     PERFORM mne_hoai.workphasesingle_ok(p_law, p_phase9name, p_value9, productid9, productnumber9, 9, acttime);
     
     return 'ok';
END; $$;


ALTER FUNCTION mne_hoai.workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) OWNER TO admindb;

--
-- TOC entry 601 (class 1255 OID 220821)
-- Dependencies: 1591 8
-- Name: workphasesingle_ok(character varying, character varying, double precision, character varying, character varying, integer, integer); Type: FUNCTION; Schema: mne_hoai; Owner: admindb
--

CREATE FUNCTION workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$ DECLARE
    p_workphaseid varchar;
BEGIN
    
    IF p_phasename = '' THEN
         DELETE FROM mne_hoai.workphase WHERE law = p_law AND phase = p_phase;
    ELSE
      FOUND := false;
      SELECT workphaseid INTO p_workphaseid FROM mne_hoai.workphase 
      WHERE law = p_law and phase = p_phase;
      IF FOUND = true THEN
        UPDATE mne_hoai.workphase
        SET phasename = p_phasename, value = p_value, productid = NULLIF(p_productid,''), productnumber = p_productnumber, 
             modifyuser = session_user, modifydate = acttime
        WHERE law = p_law and phase = p_phase;
      ELSE
        INSERT INTO mne_hoai.workphase
          ( workphaseid, law, phase, phasename, value, productid, productnumber,
            createdate, createuser, modifydate, modifyuser )
        VALUES
          ( mne_catalog.mk_id(), p_law, p_phase, p_phasename, p_value, NULLIF(p_productid,''), p_productnumber,
            acttime, session_user, acttime, session_user );
       END IF;
     END IF;
     
     return 'ok';
END; $$;


ALTER FUNCTION mne_hoai.workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) OWNER TO admindb;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 317 (class 1259 OID 221621)
-- Dependencies: 3025 3026 3027 3028 8
-- Name: fee; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE fee (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    feeid character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    law character varying NOT NULL,
    zone integer NOT NULL,
    cost double precision NOT NULL,
    startfee double precision NOT NULL,
    endfee double precision NOT NULL,
    CONSTRAINT fee_cost_check CHECK ((cost >= (0)::double precision)),
    CONSTRAINT fee_endfee_check CHECK ((endfee <> (0)::double precision)),
    CONSTRAINT fee_law_check CHECK (((law)::text <> ''::text)),
    CONSTRAINT fee_startfee_check CHECK ((startfee <> (0)::double precision))
);


ALTER TABLE mne_hoai.fee OWNER TO admindb;

--
-- TOC entry 318 (class 1259 OID 221632)
-- Dependencies: 3029 3030 8
-- Name: feeextra; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE feeextra (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    feeextraid character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    name character varying NOT NULL,
    productid character varying(32) NOT NULL,
    productnumber character varying NOT NULL,
    law character varying NOT NULL,
    year character varying NOT NULL,
    productname character varying DEFAULT ''::character varying NOT NULL,
    CONSTRAINT feeextra_check CHECK (((((name)::text = 'default'::text) AND ((law)::text = ''::text)) OR ((name)::text <> 'default'::text)))
);


ALTER TABLE mne_hoai.feeextra OWNER TO admindb;

--
-- TOC entry 319 (class 1259 OID 221640)
-- Dependencies: 8
-- Name: feename; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE feename (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    feenameid character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    law character varying NOT NULL,
    year character varying NOT NULL
);


ALTER TABLE mne_hoai.feename OWNER TO admindb;

--
-- TOC entry 320 (class 1259 OID 221646)
-- Dependencies: 8
-- Name: offer; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE offer (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    offerid character varying(32) NOT NULL,
    zone character varying NOT NULL,
    ansatz double precision NOT NULL,
    kosten double precision NOT NULL,
    zeit double precision NOT NULL,
    zuschlag double precision NOT NULL,
    besonders double precision NOT NULL,
    zusatz double precision NOT NULL,
    neben double precision NOT NULL,
    l1 double precision,
    l2 double precision,
    l3 double precision,
    l4 double precision,
    l5 double precision,
    l6 double precision,
    l7 double precision,
    l8 double precision,
    l9 double precision,
    leistung double precision,
    law character varying NOT NULL,
    pauschal boolean NOT NULL
);


ALTER TABLE mne_hoai.offer OWNER TO admindb;

--
-- TOC entry 321 (class 1259 OID 221652)
-- Dependencies: 8
-- Name: order; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE "order" (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    orderid character varying(32) NOT NULL,
    zone character varying NOT NULL,
    ansatz double precision NOT NULL,
    kosten double precision NOT NULL,
    zeit double precision NOT NULL,
    zuschlag double precision NOT NULL,
    besonders double precision NOT NULL,
    zusatz double precision NOT NULL,
    neben double precision NOT NULL,
    l1 double precision,
    l2 double precision,
    l3 double precision,
    l4 double precision,
    l5 double precision,
    l6 double precision,
    l7 double precision,
    l8 double precision,
    l9 double precision,
    leistung double precision,
    law character varying NOT NULL,
    pauschal boolean NOT NULL
);


ALTER TABLE mne_hoai."order" OWNER TO admindb;

--
-- TOC entry 322 (class 1259 OID 221658)
-- Dependencies: 3031 3032 8
-- Name: workphase; Type: TABLE; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE workphase (
    createdate integer NOT NULL,
    createuser character varying(32) NOT NULL,
    modifydate integer NOT NULL,
    modifyuser character varying(32) NOT NULL,
    workphaseid character varying(32) NOT NULL,
    phase integer NOT NULL,
    value double precision NOT NULL,
    phasename character varying NOT NULL,
    law character varying NOT NULL,
    productid character varying(32),
    productnumber character varying NOT NULL,
    CONSTRAINT workphase_phase_check CHECK (((phase > 0) AND (phase < 10))),
    CONSTRAINT workphase_value_check CHECK (((value >= (0)::double precision) AND (value <= (100)::double precision)))
);


ALTER TABLE mne_hoai.workphase OWNER TO admindb;

--
-- TOC entry 3036 (class 2606 OID 270835)
-- Dependencies: 318 318 3056
-- Name: feeextra_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY feeextra
    ADD CONSTRAINT feeextra_pkey PRIMARY KEY (feeextraid);


--
-- TOC entry 3039 (class 2606 OID 270837)
-- Dependencies: 319 319 3056
-- Name: feename_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY feename
    ADD CONSTRAINT feename_pkey PRIMARY KEY (feenameid);


--
-- TOC entry 3034 (class 2606 OID 270839)
-- Dependencies: 317 317 3056
-- Name: honorar_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY fee
    ADD CONSTRAINT honorar_pkey PRIMARY KEY (feeid);


--
-- TOC entry 3041 (class 2606 OID 270841)
-- Dependencies: 320 320 3056
-- Name: offer_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY offer
    ADD CONSTRAINT offer_pkey PRIMARY KEY (offerid);


--
-- TOC entry 3043 (class 2606 OID 270843)
-- Dependencies: 321 321 3056
-- Name: order_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (orderid);


--
-- TOC entry 3045 (class 2606 OID 270845)
-- Dependencies: 322 322 3056
-- Name: workphase_pkey; Type: CONSTRAINT; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY workphase
    ADD CONSTRAINT workphase_pkey PRIMARY KEY (workphaseid);


--
-- TOC entry 3037 (class 1259 OID 271008)
-- Dependencies: 318 318 318 3056
-- Name: feeextra_second; Type: INDEX; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX feeextra_second ON feeextra USING btree (year, law, name);


--
-- TOC entry 3046 (class 1259 OID 271009)
-- Dependencies: 322 322 322 3056
-- Name: workphase_second; Type: INDEX; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX workphase_second ON workphase USING btree (phase, law, value);


--
-- TOC entry 3047 (class 1259 OID 271010)
-- Dependencies: 322 322 3056
-- Name: workphase_third; Type: INDEX; Schema: mne_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX workphase_third ON workphase USING btree (law, productnumber);


--
-- TOC entry 3053 (class 2620 OID 271058)
-- Dependencies: 494 320 3056
-- Name: mne_history; Type: TRIGGER; Schema: mne_hoai; Owner: admindb
--

CREATE TRIGGER mne_history AFTER DELETE OR UPDATE ON offer FOR EACH ROW EXECUTE PROCEDURE mne_history_offer();


--
-- TOC entry 3054 (class 2620 OID 271059)
-- Dependencies: 321 596 3056
-- Name: mne_history; Type: TRIGGER; Schema: mne_hoai; Owner: admindb
--

CREATE TRIGGER mne_history AFTER DELETE OR UPDATE ON "order" FOR EACH ROW EXECUTE PROCEDURE mne_history_order();


--
-- TOC entry 3048 (class 2606 OID 1060780)
-- Dependencies: 3038 319 317 3056
-- Name: fee_law_fkey; Type: FK CONSTRAINT; Schema: mne_hoai; Owner: admindb
--

ALTER TABLE ONLY fee
    ADD CONSTRAINT fee_law_fkey FOREIGN KEY (law) REFERENCES feename(feenameid);


--
-- TOC entry 3049 (class 2606 OID 271385)
-- Dependencies: 307 318 3056
-- Name: feeextra_productid_fkey; Type: FK CONSTRAINT; Schema: mne_hoai; Owner: admindb
--

ALTER TABLE ONLY feeextra
    ADD CONSTRAINT feeextra_productid_fkey FOREIGN KEY (productid) REFERENCES mne_crm.product(productid);


--
-- TOC entry 3050 (class 2606 OID 271390)
-- Dependencies: 320 299 3056
-- Name: offer_offerid_fkey; Type: FK CONSTRAINT; Schema: mne_hoai; Owner: admindb
--

ALTER TABLE ONLY offer
    ADD CONSTRAINT offer_offerid_fkey FOREIGN KEY (offerid) REFERENCES mne_crm.offer(offerid);


--
-- TOC entry 3051 (class 2606 OID 271395)
-- Dependencies: 321 302 3056
-- Name: order_orderid_fkey; Type: FK CONSTRAINT; Schema: mne_hoai; Owner: admindb
--

ALTER TABLE ONLY "order"
    ADD CONSTRAINT order_orderid_fkey FOREIGN KEY (orderid) REFERENCES mne_crm."order"(orderid);


--
-- TOC entry 3052 (class 2606 OID 271400)
-- Dependencies: 307 322 3056
-- Name: workphase_productid_fkey; Type: FK CONSTRAINT; Schema: mne_hoai; Owner: admindb
--

ALTER TABLE ONLY workphase
    ADD CONSTRAINT workphase_productid_fkey FOREIGN KEY (productid) REFERENCES mne_crm.product(productid);


--
-- TOC entry 3059 (class 0 OID 0)
-- Dependencies: 8
-- Name: mne_hoai; Type: ACL; Schema: -; Owner: admindb
--

REVOKE ALL ON SCHEMA mne_hoai FROM PUBLIC;
REVOKE ALL ON SCHEMA mne_hoai FROM admindb;
GRANT ALL ON SCHEMA mne_hoai TO admindb;
GRANT USAGE ON SCHEMA mne_hoai TO PUBLIC;


--
-- TOC entry 3060 (class 0 OID 0)
-- Dependencies: 494
-- Name: mne_history_offer(); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION mne_history_offer() FROM PUBLIC;
REVOKE ALL ON FUNCTION mne_history_offer() FROM admindb;
GRANT ALL ON FUNCTION mne_history_offer() TO admindb;
GRANT ALL ON FUNCTION mne_history_offer() TO PUBLIC;


--
-- TOC entry 3061 (class 0 OID 0)
-- Dependencies: 596
-- Name: mne_history_order(); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION mne_history_order() FROM PUBLIC;
REVOKE ALL ON FUNCTION mne_history_order() FROM admindb;
GRANT ALL ON FUNCTION mne_history_order() TO admindb;
GRANT ALL ON FUNCTION mne_history_order() TO PUBLIC;


--
-- TOC entry 3062 (class 0 OID 0)
-- Dependencies: 673
-- Name: offerhoai_ok(character varying, character varying, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, boolean); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) FROM admindb;
GRANT ALL ON FUNCTION offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) TO admindb;
GRANT ALL ON FUNCTION offerhoai_ok(p_offerid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, pauschal boolean) TO admincrm;


--
-- TOC entry 3063 (class 0 OID 0)
-- Dependencies: 597
-- Name: offerhoaisingle_ok(character varying, character varying, character varying, character varying, double precision, integer, boolean); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) FROM admindb;
GRANT ALL ON FUNCTION offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) TO admindb;
GRANT ALL ON FUNCTION offerhoaisingle_ok(p_offerid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) TO admincrm;


--
-- TOC entry 3064 (class 0 OID 0)
-- Dependencies: 677
-- Name: orderhoai_ok(character varying, character varying, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, boolean); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) FROM admindb;
GRANT ALL ON FUNCTION orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) TO admindb;
GRANT ALL ON FUNCTION orderhoai_ok(p_orderid character varying, p_law character varying, p_leistung double precision, p_zuschlag double precision, p_zeit double precision, p_besonders double precision, p_zusatz double precision, p_neben double precision, p_l1 double precision, p_l2 double precision, p_l3 double precision, p_l4 double precision, p_l5 double precision, p_l6 double precision, p_l7 double precision, p_l8 double precision, p_l9 double precision, p_pauschal boolean) TO admincrm;


--
-- TOC entry 3065 (class 0 OID 0)
-- Dependencies: 598
-- Name: orderhoaisingle_ok(character varying, character varying, character varying, character varying, double precision, integer, boolean); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) FROM admindb;
GRANT ALL ON FUNCTION orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) TO admindb;
GRANT ALL ON FUNCTION orderhoaisingle_ok(p_orderid character varying, p_productid character varying, p_productnumber character varying, p_productname character varying, p_price double precision, acttime integer, p_pauschal boolean) TO admincrm;


--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 602
-- Name: workphase_ok(character varying, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, double precision, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) FROM PUBLIC;
REVOKE ALL ON FUNCTION workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) FROM admindb;
GRANT ALL ON FUNCTION workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) TO admindb;
GRANT ALL ON FUNCTION workphase_ok(p_law character varying, p_phase1name character varying, p_value1 double precision, p_phase2name character varying, p_value2 double precision, p_phase3name character varying, p_value3 double precision, p_phase4name character varying, p_value4 double precision, p_phase5name character varying, p_value5 double precision, p_phase6name character varying, p_value6 double precision, p_phase7name character varying, p_value7 double precision, p_phase8name character varying, p_value8 double precision, p_phase9name character varying, p_value9 double precision, productid1 character varying, productid2 character varying, productid3 character varying, productid4 character varying, productid5 character varying, productid6 character varying, productid7 character varying, productid8 character varying, productid9 character varying, productnumber1 character varying, productnumber2 character varying, productnumber3 character varying, productnumber4 character varying, productnumber5 character varying, productnumber6 character varying, productnumber7 character varying, productnumber8 character varying, productnumber9 character varying) TO admincrm;


--
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 601
-- Name: workphasesingle_ok(character varying, character varying, double precision, character varying, character varying, integer, integer); Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON FUNCTION workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) FROM admindb;
GRANT ALL ON FUNCTION workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) TO admindb;
GRANT ALL ON FUNCTION workphasesingle_ok(p_law character varying, p_phasename character varying, p_value double precision, p_productid character varying, p_productnumber character varying, p_phase integer, acttime integer) TO admincrm;


--
-- TOC entry 3068 (class 0 OID 0)
-- Dependencies: 317
-- Name: fee; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE fee FROM PUBLIC;
REVOKE ALL ON TABLE fee FROM admindb;
GRANT ALL ON TABLE fee TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE fee TO admincrm;
GRANT SELECT ON TABLE fee TO erpcrm;


--
-- TOC entry 3069 (class 0 OID 0)
-- Dependencies: 318
-- Name: feeextra; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE feeextra FROM PUBLIC;
REVOKE ALL ON TABLE feeextra FROM admindb;
GRANT ALL ON TABLE feeextra TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE feeextra TO admincrm;
GRANT SELECT ON TABLE feeextra TO erpcrm;


--
-- TOC entry 3070 (class 0 OID 0)
-- Dependencies: 319
-- Name: feename; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE feename FROM PUBLIC;
REVOKE ALL ON TABLE feename FROM admindb;
GRANT ALL ON TABLE feename TO admindb;
GRANT SELECT ON TABLE feename TO admincrm;
GRANT SELECT ON TABLE feename TO erpcrm;


--
-- TOC entry 3071 (class 0 OID 0)
-- Dependencies: 320
-- Name: offer; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE offer FROM PUBLIC;
REVOKE ALL ON TABLE offer FROM admindb;
GRANT ALL ON TABLE offer TO admindb;
GRANT SELECT ON TABLE offer TO erpcrm;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE offer TO admincrm;


--
-- TOC entry 3072 (class 0 OID 0)
-- Dependencies: 321
-- Name: order; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE "order" FROM PUBLIC;
REVOKE ALL ON TABLE "order" FROM admindb;
GRANT ALL ON TABLE "order" TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE "order" TO admincrm;
GRANT SELECT ON TABLE "order" TO erpcrm;


--
-- TOC entry 3073 (class 0 OID 0)
-- Dependencies: 322
-- Name: workphase; Type: ACL; Schema: mne_hoai; Owner: admindb
--

REVOKE ALL ON TABLE workphase FROM PUBLIC;
REVOKE ALL ON TABLE workphase FROM admindb;
GRANT ALL ON TABLE workphase TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE workphase TO admincrm;
GRANT SELECT ON TABLE workphase TO erpcrm;


-- Completed on 2014-01-13 09:52:51

--
-- PostgreSQL database dump complete
--

