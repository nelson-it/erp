--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: product; Type: TABLE DATA; Schema: mne_crm; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_crm.product DISABLE TRIGGER ALL;



ALTER TABLE mne_crm.product ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: producttree; Type: TABLE DATA; Schema: mne_crm; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_crm.producttree DISABLE TRIGGER ALL;



ALTER TABLE mne_crm.producttree ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: productprice; Type: TABLE DATA; Schema: mne_crm; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_crm.productprice DISABLE TRIGGER ALL;



ALTER TABLE mne_crm.productprice ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: productpart; Type: TABLE DATA; Schema: mne_warehouse; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_warehouse.productpart DISABLE TRIGGER ALL;



ALTER TABLE mne_warehouse.productpart ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: skill; Type: TABLE DATA; Schema: mne_personnal; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_personnal.skill DISABLE TRIGGER ALL;

INSERT INTO mne_personnal.skill (createdate, createuser, modifydate, modifyuser, skillid, sorting, text_de, text_en, unitcost) VALUES (1262720969, 'manny', 1610717161, 'admindb', 'special', 1000, 'Spezial', 'special', 0);


ALTER TABLE mne_personnal.skill ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: producttime; Type: TABLE DATA; Schema: mne_personnal; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_personnal.producttime DISABLE TRIGGER ALL;



ALTER TABLE mne_personnal.producttime ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1ubuntu1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1ubuntu1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: producttimeopt; Type: TABLE DATA; Schema: mne_personnal; Owner: admindb
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE mne_personnal.producttimeopt DISABLE TRIGGER ALL;



ALTER TABLE mne_personnal.producttimeopt ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

