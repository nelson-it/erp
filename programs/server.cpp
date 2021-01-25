#ifdef __MINGW32__
#include <winsock2.h>
#include <windows.h>
#endif

#ifdef PTHREAD
#include <pthread.h>
#endif

#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>

#include <argument/argument.h>
#include <deamon/deamon.h>

#ifdef MACOS
#include <bonjour/dnsserviceregister.h>
#include <locale.h>
#endif

#include <ipc/s_socket.h>
#include <db/postgres/pgdatabase.h>
#include <mail/imap_scan.h>

#include <embedweb/http_utils.h>
#include <embedweb/http_filesystem.h>
#include <embedweb/ws_analyse.h>
#include <xml/http_xmltext.h>

#include <db/dbhttp_analyse.h>
#include <db/dbhttp.h>

#include <db/dbhttputils_connect.h>
#include <db/dbhttputils_table.h>
#include <db/dbhttputils_query.h>
#include <db/dbhttputils_repository.h>
#include <db/dbhttputils_imap.h>
#include <db/dbhttputils_trust.h>

#include <db/dbhttp_compose.h>

#include <db/dbhttpadmin_query.h>
#include <db/dbhttpadmin_table.h>

#include <report/dbhttp_report.h>

#include <embedweb/ws.h>
#include <db/dbws_http.h>

int main(int argc, char **argv)
{
    if ( getenv("LANG") != NULL )
    {
    	setlocale(LC_ALL, getenv("LANG"));
    }

#if defined(__MINGW32__) || defined(__CYGWIN__)
	WSADATA wsa;
	if (WSAStartup(MAKEWORD(2, 0), &wsa) )
	{
		fprintf(stderr, "winsock start gescheitert\n");
		exit(1);
	}
#endif

	srand(time(NULL));

	Argument::ListeMap liste;
	long i, max_thread;
    int largc;
    char **largv;

    liste["thread"] = Argument::Liste("-t", 'l', 1, "5");
    liste["locale"] = Argument::Liste("-locale", 'c', 1, DEF_LOCALE);
	liste["extrapath"]     = Argument::Liste("-extrapath",     'c', 1, "");

    // Suchpfade fürs Rewrites
	// =======================
	liste["EmbedwebHttpSearchPathjs"]      = Argument::Liste("-jspath",     'c', 1, "/allg/js");
	liste["EmbedwebHttpSearchPathstyles"]  = Argument::Liste("-stylepath",  'c', 1, "/allg/css/default");
	liste["EmbedwebHttpSearchPathimages"]  = Argument::Liste("-imagespath", 'c', 1, "/allg/images:/allg/images/editor");
	liste["EmbedwebHttpSearchPathweblet"]  = Argument::Liste("-webletpath", 'c', 1, "/allg/weblet");
	liste["EmbedwebHttpSearchPathtempl"]   = Argument::Liste("-templpath",  'c', 1, "/allg/templ");

#include "server.inc"

	largc = argc;
	largv = argv;

	Argument a(&liste, *argv);
	a.scan(--largc, ++largv);

#if ! defined(__MINGW32__) && ! defined(__CYGWIN__)
    Deamon deamon;

    largc = argc;
    largv = argv;

    a.reset(&liste);
    a.scan(--largc, ++largv);
#else
    _configthreadlocale(_ENABLE_PER_THREAD_LOCALE);
    setlocale(LC_ALL, ((std::string)a["locale"]).c_str());

    const char *extrapath = ((std::string)a["extrapath"]).c_str();
	if ( extrapath != NULL && *extrapath != '\0' )
	{
		unsigned int i;
		char path[1024];
		i = GetEnvironmentVariable("PATH", path, sizeof(path));
		if ( i > sizeof(path) )
		{
			Message msg("Main");
			msg.perror(1, "kann $PATH nicht mit <%s> erweitern", extrapath);
		}
		else
		{
			path[i] = '\0';
			SetEnvironmentVariable("PATH", ((std::string)path + ";" + (std::string)extrapath).c_str());
		}
	}

#endif
	umask((int)a["umask"]);
	max_thread = a["thread"];

	ServerSocket server((int)a["port"]);
	PgDatabase db(a["DbApplSchema"]);

#ifdef MACOS
    DNSServiceRef ssr;
    register_bonjour( &ssr, (int)a["port"],  "Erp - Nelson technische Informatik" );
#endif

	DbHttpAnalyse *httpanalyse = new DbHttpAnalyse( &server, &db);
	WsAnalyse *wsanalyse = new WsAnalyse( &server );
	for (i=0; i<max_thread; ++i)
	{
		DbHttp *http = new DbHttp( &server, httpanalyse, &db);

		new HttpUtils (http);
		new HttpFilesystem (http);

		new HttpXmlText(http);

		new DbHttpUtilsConnect(http, httpanalyse);
		new DbHttpUtilsTable (http);
        new DbHttpUtilsQuery (http);
        new DbHttpUtilsRepository (http);
        new DbHttpUtilsTrust (http);
        new DbHttpUtilsImap (http);

        new DbHttpCompose (http);

		new DbHttpAdminTable (http);
		new DbHttpAdminQuery (http);

		new DbHttpReport (http);
	}

	for (i=0; i<max_thread; ++i)
	{
	    Ws *ws = new Ws(&server, wsanalyse);
	    DbHttp *http = new DbWsHttp(&server, ws, httpanalyse, &db);

        //new HttpUtils (http);
        //new HttpFilesystem (http);
        //new HttpSysexec (http);

        //new HttpXmlText(http);

        //new DbHttpUtilsConnect(http, httpanalyse); // @suppress("Symbol is not resolved")
        //new DbHttpUtilsTable (http);
        //new DbHttpUtilsQuery (http);
        //new DbHttpUtilsRepository (http);
        //new DbHttpUtilsTrust (http);
        //new DbHttpUtilsImap (http);

        //new DbHttpAdminTable (http);
        //new DbHttpAdminQuery (http);

        //new DbHttpReport (http);

	}

	if ( ! (long)a["ImapScanDisable"] )
	    new ImapScanThread(&db);

	server.loop();

#if defined(__MINGW32__) || defined(__CYGWIN__)
	WSACleanup();
#endif
   return 0;
}
