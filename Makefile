PROJECT_NAME = mudeer
PKGFILE = $(PROJECT_NAME).kwinscript

build: package
	(cd package && zip -r $(PKGFILE) ./*)
	(cd package && mv $(PKGFILE) ../)

install: build
	kpackagetool6 -t KWin/Script -s $(PROJECT_NAME) \
		&& kpackagetool6 -t KWin/Script -u $(PKGFILE) \
		|| kpackagetool6 -t KWin/Script -i $(PKGFILE)	
	$(MAKE) reload

# KWin only reads a script's code when loading it, so unload and let
# reconfigure load the newly installed version
reload:
	-qdbus6 org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript $(PROJECT_NAME)
	-qdbus6 org.kde.KWin /KWin reconfigure

uninstall:
	kpackagetool6 -t KWin/Script -r $(PROJECT_NAME)

clean:
	rm -f $(PKGFILE)
