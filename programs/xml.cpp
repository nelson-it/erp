#ifdef PTHREAD
#include <pthread.h>
#endif

#include <stdlib.h>
#include <stdio.h>

#include <argument/argument.h>

#ifdef __MINGW32__
#include <windows.h>
#include <winsock2.h>
#endif 

#include <xml/xmltext_tex.h>

void show(XmlParseNode *node, std::string tab )
{
    unsigned int i;

    XmlParseNode::AttrMap::iterator ia;

    fprintf(stderr, "%sid: %s data:%s\n", tab.c_str(),
		     node->getId().c_str(), node->getData().c_str());

    for (ia= node->getAttrs()->begin();ia != node->getAttrs()->end(); ++ia)
      fprintf(stderr, "%sattr: %s %s\n", tab.c_str(),
		      ia->first.c_str(), ia->second.c_str());
    
    for ( i=0; i<node->size(); ++i )
    {
	show((*node)[i], tab + "  ");
    }
}

    
int main(int argc, char **argv)
{

    Argument::ListeMap liste;

    liste["xml"] = Argument::Liste("-xml", 'c', 1, "<empty/>");
    #include "xml.inc"

    Argument a(&liste, *argv);
    a.scan(--argc, ++argv);

    XmlTextTex parse;
    parse.setXml(a["xml"]);
    parse.mk_output(stderr);
    
    exit(0);

}
