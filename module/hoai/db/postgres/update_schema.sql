--
-- PostgreSQL database dump
--

-- Dumped from database version 8.4.14
-- Dumped by pg_dump version 9.1.4
-- Started on 2012-11-15 15:54:19

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- TOC entry 161 (class 2615 OID 1282348)
-- Name: mnehoai_application; Type: SCHEMA; Schema: -; Owner: admindb
--

DROP SCHEMA IF EXISTS mnehoai_application CASCADE;
DROP SCHEMA IF EXISTS mnehoai_hoai CASCADE;
DROP SCHEMA IF EXISTS mnehoai_personnal CASCADE;
DROP SCHEMA IF EXISTS mnehoai_crm CASCADE;

CREATE SCHEMA mnehoai_application;


ALTER SCHEMA mnehoai_application OWNER TO admindb;

--
-- TOC entry 162 (class 2615 OID 1282359)
-- Name: mnehoai_crm; Type: SCHEMA; Schema: -; Owner: admindb
--

CREATE SCHEMA mnehoai_crm;


ALTER SCHEMA mnehoai_crm OWNER TO admindb;

--
-- TOC entry 163 (class 2615 OID 1282379)
-- Name: mnehoai_hoai; Type: SCHEMA; Schema: -; Owner: admindb
--

CREATE SCHEMA mnehoai_hoai;


ALTER SCHEMA mnehoai_hoai OWNER TO admindb;

--
-- TOC entry 164 (class 2615 OID 1282413)
-- Name: mnehoai_personnal; Type: SCHEMA; Schema: -; Owner: admindb
--

CREATE SCHEMA mnehoai_personnal;


ALTER SCHEMA mnehoai_personnal OWNER TO admindb;

SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 756 (class 1255 OID 1282480)
-- Dependencies: 1633 163
-- Name: update(); Type: FUNCTION; Schema: mnehoai_hoai; Owner: admindb
--

CREATE FUNCTION update() RETURNS character varying
    LANGUAGE plpgsql
    AS $$ DECLARE
   r_selectlist mne_application.selectlist%ROWTYPE;
   r_product mne_crm.product%ROWTYPE;
   r_producttree mne_crm.producttree%ROWTYPE;
   r_productprice mne_crm.productprice%ROWTYPE;
   r_skill mne_personnal.skill%ROWTYPE;
   r_producttime mne_personnal.producttime%ROWTYPE;
   r_producttimeopt mne_personnal.producttimeopt%ROWTYPE;
   
BEGIN

    FOR r_selectlist in SELECT * FROM mnehoai_application.selectlist LOOP
        UPDATE mne_application.selectlist SET
            num = r_selectlist.num,
            text_en = r_selectlist.text_en,
            text_de = r_selectlist.text_de,
            custom = false,

            modifydate = r_selectlist.modifydate,
            modifyuser = 'Nelson IT'
        WHERE name = r_selectlist.name AND value = r_selectlist.value;
        
        IF NOT FOUND THEN
            r_selectlist.createuser = 'Nelson IT';
            r_selectlist.modifyuser = 'Nelson IT';
            
            INSERT INTO mne_application.selectlist VALUES (r_selectlist.*);
        END IF;
    END LOOP;
    
    FOR r_product in SELECT * FROM mnehoai_crm.product LOOP
        UPDATE mne_crm.product SET
            description = r_product.description,
            name = r_product.name,
            productnumber = r_product.productnumber,
            withworkingstep = r_product.withworkingstep,           

            modifydate = r_product.modifydate,
            modifyuser = 'Nelson IT'
        WHERE productid = r_product.productid;
        
        IF NOT FOUND THEN
            r_product.createuser = 'Nelson IT';
            r_product.modifyuser = 'Nelson IT';
            
            INSERT INTO mne_crm.product VALUES (r_product.*);
        END IF;
    END LOOP;

    ALTER TABLE mne_crm.producttree DISABLE TRIGGER ALL;
    FOR r_producttree in SELECT * FROM mnehoai_crm.producttree LOOP
        UPDATE mne_crm.producttree SET
            parentid = r_producttree.parentid,
            productid = r_producttree.productid,
            treename = r_producttree.treename,           

            modifydate = r_producttree.modifydate,
            modifyuser = 'Nelson IT'
        WHERE treeid = r_producttree.treeid;
        
        IF NOT FOUND THEN
            r_producttree.createuser = 'Nelson IT';
            r_producttree.modifyuser = 'Nelson IT';

            INSERT INTO mne_crm.producttree VALUES (r_producttree.*);
        END IF;
    END LOOP;
    ALTER TABLE mne_crm.producttree ENABLE TRIGGER ALL;
    
    
    FOR r_productprice in SELECT * FROM mnehoai_crm.productprice ORDER BY createdate LOOP
        UPDATE mne_crm.productprice SET
        
            currencyid = r_productprice.currencyid,
            unit = r_productprice.unit, 
            unitprice = r_productprice.unitprice,
            unitcost = r_productprice.unitcost,
            vat = r_productprice.vat,          

            modifydate = r_productprice.modifydate,
            modifyuser = 'Nelson IT'
            
        WHERE productid = r_productprice.productid;
        
        IF NOT FOUND THEN
            r_productprice.createuser = 'Nelson IT';
            r_productprice.modifyuser = 'Nelson IT';

            INSERT INTO mne_crm.productprice VALUES (r_productprice.*);
        END IF;
    END LOOP;
    
    FOR r_skill in SELECT * FROM mnehoai_personnal.skill LOOP
        UPDATE mne_personnal.skill SET
        
            text_de = r_skill.text_de,
            text_en = r_skill.text_en,
            unitcost = r_skill.unitcost,

            modifydate = r_skill.modifydate,
            modifyuser = 'Nelson IT'
            
        WHERE skillid = r_skill.skillid;
        
        IF NOT FOUND THEN
            r_skill.createuser = 'Nelson IT';
            r_skill.modifyuser = 'Nelson IT';

            INSERT INTO mne_personnal.skill VALUES (r_skill.*);
        END IF;
    END LOOP;
    
    FOR r_producttime in SELECT * FROM mnehoai_personnal.producttime LOOP
        UPDATE mne_personnal.producttime SET
        
            description = r_producttime.description,
            duration = r_producttime.duration ,
            productid = r_producttime.productid ,
            skillid = r_producttime.skillid ,
            step = r_producttime.step ,
            longdesc = r_producttime.longdesc ,

            modifydate = r_producttime.modifydate,
            modifyuser = 'Nelson IT'
            
        WHERE producttimeid = r_producttime.producttimeid;
        
        IF NOT FOUND THEN
            r_producttime.createuser = 'Nelson IT';
            r_producttime.modifyuser = 'Nelson IT';

            INSERT INTO mne_personnal.producttime VALUES (r_producttime.*);
        END IF;
    END LOOP;
    
    FOR r_producttimeopt in SELECT * FROM mnehoai_personnal.producttimeopt LOOP

        UPDATE mne_personnal.producttimeopt SET
        
            description = r_producttimeopt.description,
            duration = r_producttimeopt.duration ,
            productid = r_producttimeopt.productid ,
            skillid = r_producttimeopt.skillid ,
            step = r_producttimeopt.step ,
            longdesc = r_producttimeopt.longdesc ,

            modifydate = r_producttimeopt.modifydate,
            modifyuser = 'Nelson IT'
            
        WHERE producttimeoptid = r_producttimeopt.producttimeoptid;
        
        IF NOT FOUND THEN
            r_producttimeopt.createuser = 'Nelson IT';
            r_producttimeopt.modifyuser = 'Nelson IT';

            INSERT INTO mne_personnal.producttimeopt VALUES (r_producttimeopt.*);
        END IF;
    END LOOP;
    
    ALTER TABLE mne_hoai.fee DISABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.feeextra DISABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.feename DISABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.workphase DISABLE TRIGGER ALL;
    
    DELETE FROM mne_hoai.fee;
    INSERT INTO mne_hoai.fee SELECT * from mnehoai_hoai.fee;
    UPDATE mne_hoai.fee SET createuser = 'Nelson IT', modifyuser = 'Nelson IT';
    
    DELETE FROM mne_hoai.feeextra;
    INSERT INTO mne_hoai.feeextra SELECT * from mnehoai_hoai.feeextra;
    UPDATE mne_hoai.feeextra SET createuser = 'Nelson IT', modifyuser = 'Nelson IT';
    
    DELETE FROM mne_hoai.feename;
    INSERT INTO mne_hoai.feename SELECT * from mnehoai_hoai.feename;
    UPDATE mne_hoai.feename SET createuser = 'Nelson IT', modifyuser = 'Nelson IT';
    
    DELETE FROM mne_hoai.workphase;
    INSERT INTO mne_hoai.workphase SELECT * from mnehoai_hoai.workphase;
    UPDATE mne_hoai.workphase SET createuser = 'Nelson IT', modifyuser = 'Nelson IT';
 
    ALTER TABLE mne_hoai.fee ENABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.feeextra ENABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.feename ENABLE TRIGGER ALL;
    ALTER TABLE mne_hoai.workphase ENABLE TRIGGER ALL;
    
    
    return 'ok';
END; $$;


ALTER FUNCTION mnehoai_hoai.update() OWNER TO admindb;

SET search_path = mnehoai_application, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = true;

--
-- TOC entry 512 (class 1259 OID 1282349)
-- Dependencies: 2988 2989 161
-- Name: selectlist; Type: TABLE; Schema: mnehoai_application; Owner: admindb; Tablespace: 
--

CREATE TABLE selectlist ( LIKE mne_application.selectlist );


ALTER TABLE mnehoai_application.selectlist OWNER TO admindb;

SET search_path = mnehoai_crm, pg_catalog;

SET default_with_oids = false;

--
-- TOC entry 514 (class 1259 OID 1282367)
-- Dependencies: 162
-- Name: product; Type: TABLE; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

CREATE TABLE product ( LIKE mne_crm.product );

ALTER TABLE mnehoai_crm.product OWNER TO admindb;

--
-- TOC entry 515 (class 1259 OID 1282373)
-- Dependencies: 162
-- Name: productprice; Type: TABLE; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

CREATE TABLE productprice ( LIKE mne_crm.productprice );

ALTER TABLE mnehoai_crm.productprice OWNER TO admindb;

--
-- TOC entry 513 (class 1259 OID 1282360)
-- Dependencies: 2990 162
-- Name: producttree; Type: TABLE; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

CREATE TABLE producttree ( LIKE mne_crm.producttree );

ALTER TABLE mnehoai_crm.producttree OWNER TO admindb;

SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 516 (class 1259 OID 1282380)
-- Dependencies: 2991 2992 2993 2994 2995 163
-- Name: fee; Type: TABLE; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE fee ( LIKE mne_hoai.fee );

ALTER TABLE mnehoai_hoai.fee OWNER TO admindb;

--
-- TOC entry 517 (class 1259 OID 1282391)
-- Dependencies: 2996 163
-- Name: feeextra; Type: TABLE; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE feeextra ( LIKE mne_hoai.feeextra) ;

ALTER TABLE mnehoai_hoai.feeextra OWNER TO admindb;

--
-- TOC entry 518 (class 1259 OID 1282398)
-- Dependencies: 163
-- Name: feename; Type: TABLE; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE feename (LIKE mne_hoai.feename);

ALTER TABLE mnehoai_hoai.feename OWNER TO admindb;

--
-- TOC entry 519 (class 1259 OID 1282404)
-- Dependencies: 2997 2998 2999 163
-- Name: workphase; Type: TABLE; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE TABLE workphase (LIKE mne_hoai.workphase);

ALTER TABLE mnehoai_hoai.workphase OWNER TO admindb;

SET search_path = mnehoai_personnal, pg_catalog;

--
-- TOC entry 520 (class 1259 OID 1282414)
-- Dependencies: 164
-- Name: producttime; Type: TABLE; Schema: mnehoai_personnal; Owner: admindb; Tablespace: 
--

CREATE TABLE producttime ( LIKE mne_personnal.producttime );

ALTER TABLE mnehoai_personnal.producttime OWNER TO admindb;

CREATE TABLE producttimeopt ( LIKE mne_personnal.producttimeopt );

ALTER TABLE mnehoai_personnal.producttimeopt OWNER TO admindb;

--
-- TOC entry 521 (class 1259 OID 1282420)
-- Dependencies: 3000 164
-- Name: skill; Type: TABLE; Schema: mnehoai_personnal; Owner: admindb; Tablespace: 
--

CREATE TABLE skill (LIKE mne_personnal.skill);

ALTER TABLE mnehoai_personnal.skill OWNER TO admindb;

SET search_path = mnehoai_application, pg_catalog;

--
-- TOC entry 3002 (class 2606 OID 1282358)
-- Dependencies: 512 512 512
-- Name: selectlist_pkey; Type: CONSTRAINT; Schema: mnehoai_application; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY selectlist
    ADD CONSTRAINT selectlist_pkey PRIMARY KEY (name, value);


SET search_path = mnehoai_crm, pg_catalog;

--
-- TOC entry 3006 (class 2606 OID 1282434)
-- Dependencies: 514 514
-- Name: product_pkey; Type: CONSTRAINT; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY product
    ADD CONSTRAINT product_pkey PRIMARY KEY (productid);


--
-- TOC entry 3009 (class 2606 OID 1282436)
-- Dependencies: 515 515
-- Name: productprice_pkey; Type: CONSTRAINT; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY productprice
    ADD CONSTRAINT productprice_pkey PRIMARY KEY (productid);


--
-- TOC entry 3004 (class 2606 OID 1282438)
-- Dependencies: 513 513
-- Name: producttree_pkey; Type: CONSTRAINT; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY producttree
    ADD CONSTRAINT producttree_pkey PRIMARY KEY (treeid);


SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 3013 (class 2606 OID 1282440)
-- Dependencies: 517 517
-- Name: feeextra_pkey; Type: CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY feeextra
    ADD CONSTRAINT feeextra_pkey PRIMARY KEY (feeextraid);


--
-- TOC entry 3016 (class 2606 OID 1282442)
-- Dependencies: 518 518
-- Name: feename_pkey; Type: CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY feename
    ADD CONSTRAINT feename_pkey PRIMARY KEY (feenameid);


--
-- TOC entry 3011 (class 2606 OID 1282444)
-- Dependencies: 516 516
-- Name: honorar_pkey; Type: CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY fee
    ADD CONSTRAINT honorar_pkey PRIMARY KEY (feeid);


--
-- TOC entry 3018 (class 2606 OID 1282446)
-- Dependencies: 519 519
-- Name: workphase_pkey; Type: CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY workphase
    ADD CONSTRAINT workphase_pkey PRIMARY KEY (workphaseid);


SET search_path = mnehoai_personnal, pg_catalog;

--
-- TOC entry 3022 (class 2606 OID 1282448)
-- Dependencies: 520 520
-- Name: producttime_pkey; Type: CONSTRAINT; Schema: mnehoai_personnal; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY producttime
    ADD CONSTRAINT producttime_pkey PRIMARY KEY (producttimeid);


--
-- TOC entry 3024 (class 2606 OID 1282450)
-- Dependencies: 521 521
-- Name: skill_pkey; Type: CONSTRAINT; Schema: mnehoai_personnal; Owner: admindb; Tablespace: 
--

ALTER TABLE ONLY skill
    ADD CONSTRAINT skill_pkey PRIMARY KEY (skillid);


SET search_path = mnehoai_crm, pg_catalog;

--
-- TOC entry 3007 (class 1259 OID 1282451)
-- Dependencies: 514
-- Name: product_second; Type: INDEX; Schema: mnehoai_crm; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX product_second ON product USING btree (productnumber);


SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 3014 (class 1259 OID 1282452)
-- Dependencies: 517 517 517
-- Name: feeextra_second; Type: INDEX; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX feeextra_second ON feeextra USING btree (year, law, name);


--
-- TOC entry 3019 (class 1259 OID 1282453)
-- Dependencies: 519 519 519
-- Name: workphase_second; Type: INDEX; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX workphase_second ON workphase USING btree (phase, law, value);


--
-- TOC entry 3020 (class 1259 OID 1282454)
-- Dependencies: 519 519
-- Name: workphase_third; Type: INDEX; Schema: mnehoai_hoai; Owner: admindb; Tablespace: 
--

CREATE UNIQUE INDEX workphase_third ON workphase USING btree (law, productnumber);


SET search_path = mnehoai_crm, pg_catalog;

--
-- TOC entry 3027 (class 2606 OID 1282455)
-- Dependencies: 515 3005 514
-- Name: productprice_productid_fkey; Type: FK CONSTRAINT; Schema: mnehoai_crm; Owner: admindb
--

ALTER TABLE ONLY productprice
    ADD CONSTRAINT productprice_productid_fkey FOREIGN KEY (productid) REFERENCES product(productid);


--
-- TOC entry 3026 (class 2606 OID 1282460)
-- Dependencies: 513 3003 513
-- Name: producttree_parentid_fkey; Type: FK CONSTRAINT; Schema: mnehoai_crm; Owner: admindb
--

ALTER TABLE ONLY producttree
    ADD CONSTRAINT producttree_parentid_fkey FOREIGN KEY (parentid) REFERENCES producttree(treeid);


--
-- TOC entry 3025 (class 2606 OID 1282465)
-- Dependencies: 3005 513 514
-- Name: producttree_productid_fkey; Type: FK CONSTRAINT; Schema: mnehoai_crm; Owner: admindb
--

ALTER TABLE ONLY producttree
    ADD CONSTRAINT producttree_productid_fkey FOREIGN KEY (productid) REFERENCES product(productid);


SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 3028 (class 2606 OID 1282470)
-- Dependencies: 517 3005 514
-- Name: feeextra_productid_fkey; Type: FK CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb
--

ALTER TABLE ONLY feeextra
    ADD CONSTRAINT feeextra_productid_fkey FOREIGN KEY (productid) REFERENCES mnehoai_crm.product(productid);


--
-- TOC entry 3029 (class 2606 OID 1282475)
-- Dependencies: 3005 519 514
-- Name: workphase_productid_fkey; Type: FK CONSTRAINT; Schema: mnehoai_hoai; Owner: admindb
--

ALTER TABLE ONLY workphase
    ADD CONSTRAINT workphase_productid_fkey FOREIGN KEY (productid) REFERENCES mnehoai_crm.product(productid);


SET search_path = mnehoai_application, pg_catalog;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 512
-- Name: selectlist; Type: ACL; Schema: mnehoai_application; Owner: admindb
--

REVOKE ALL ON TABLE selectlist FROM PUBLIC;
REVOKE ALL ON TABLE selectlist FROM admindb;
GRANT ALL ON TABLE selectlist TO admindb;
GRANT SELECT ON TABLE selectlist TO PUBLIC;


SET search_path = mnehoai_crm, pg_catalog;

--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 514
-- Name: product; Type: ACL; Schema: mnehoai_crm; Owner: admindb
--

REVOKE ALL ON TABLE product FROM PUBLIC;
REVOKE ALL ON TABLE product FROM admindb;
GRANT ALL ON TABLE product TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE product TO admincrm;
GRANT SELECT ON TABLE product TO crm;
GRANT SELECT ON TABLE product TO shipment;


--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 515
-- Name: productprice; Type: ACL; Schema: mnehoai_crm; Owner: admindb
--

REVOKE ALL ON TABLE productprice FROM PUBLIC;
REVOKE ALL ON TABLE productprice FROM admindb;
GRANT ALL ON TABLE productprice TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE productprice TO admincrm;
GRANT SELECT ON TABLE productprice TO crm;
GRANT SELECT ON TABLE productprice TO shipment;


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 513
-- Name: producttree; Type: ACL; Schema: mnehoai_crm; Owner: admindb
--

REVOKE ALL ON TABLE producttree FROM PUBLIC;
REVOKE ALL ON TABLE producttree FROM admindb;
GRANT ALL ON TABLE producttree TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE producttree TO admincrm;
GRANT SELECT ON TABLE producttree TO crm;
GRANT SELECT ON TABLE producttree TO shipment;


SET search_path = mnehoai_hoai, pg_catalog;

--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 516
-- Name: fee; Type: ACL; Schema: mnehoai_hoai; Owner: admindb
--

REVOKE ALL ON TABLE fee FROM PUBLIC;
REVOKE ALL ON TABLE fee FROM admindb;
GRANT ALL ON TABLE fee TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE fee TO admincrm;
GRANT SELECT ON TABLE fee TO crm;


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 517
-- Name: feeextra; Type: ACL; Schema: mnehoai_hoai; Owner: admindb
--

REVOKE ALL ON TABLE feeextra FROM PUBLIC;
REVOKE ALL ON TABLE feeextra FROM admindb;
GRANT ALL ON TABLE feeextra TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE feeextra TO admincrm;
GRANT SELECT ON TABLE feeextra TO crm;


--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 518
-- Name: feename; Type: ACL; Schema: mnehoai_hoai; Owner: admindb
--

REVOKE ALL ON TABLE feename FROM PUBLIC;
REVOKE ALL ON TABLE feename FROM admindb;
GRANT ALL ON TABLE feename TO admindb;
GRANT SELECT ON TABLE feename TO admincrm;
GRANT SELECT ON TABLE feename TO crm;


--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 519
-- Name: workphase; Type: ACL; Schema: mnehoai_hoai; Owner: admindb
--

REVOKE ALL ON TABLE workphase FROM PUBLIC;
REVOKE ALL ON TABLE workphase FROM admindb;
GRANT ALL ON TABLE workphase TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE workphase TO admincrm;
GRANT SELECT ON TABLE workphase TO crm;


SET search_path = mnehoai_personnal, pg_catalog;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 520
-- Name: producttime; Type: ACL; Schema: mnehoai_personnal; Owner: admindb
--

REVOKE ALL ON TABLE producttime FROM PUBLIC;
REVOKE ALL ON TABLE producttime FROM admindb;
GRANT ALL ON TABLE producttime TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE producttime TO adminpersonnal;
GRANT SELECT ON TABLE producttime TO personnal;
GRANT SELECT ON TABLE producttime TO crm;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE producttime TO admincrm;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 520
-- Name: producttime; Type: ACL; Schema: mnehoai_personnal; Owner: admindb
--

REVOKE ALL ON TABLE producttimeopt FROM PUBLIC;
REVOKE ALL ON TABLE producttimeopt FROM admindb;
GRANT ALL ON TABLE producttimeopt TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE producttimeopt TO adminpersonnal;
GRANT SELECT ON TABLE producttimeopt TO personnal;
GRANT SELECT ON TABLE producttimeopt TO crm;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE producttimeopt TO admincrm;


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 521
-- Name: skill; Type: ACL; Schema: mnehoai_personnal; Owner: admindb
--

REVOKE ALL ON TABLE skill FROM PUBLIC;
REVOKE ALL ON TABLE skill FROM admindb;
GRANT ALL ON TABLE skill TO admindb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE skill TO adminpersonnal;
GRANT SELECT ON TABLE skill TO personnal;
GRANT SELECT ON TABLE skill TO crm;


-- Completed on 2012-11-15 15:54:20

--
-- PostgreSQL database dump complete
--

