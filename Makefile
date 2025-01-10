PROJECT_NAME = mudeer
PKGFILE = $(PROJECT_NAME).kwinscript

build: package
	(cd package && zip -r $(PKGFILE) ./*)
	(cd package && mv $(PKGFILE) ../)

install: build
	kpackagetool6 -t KWin/Script -s $(PROJECT_NAME) \
		&& kpackagetool6 -t KWin/Script -u $(PKGFILE) \
		|| kpackagetool6 -t KWin/Script -i $(PKGFILE)	

uninstall:
	kpackagetool6 -t KWin/Script -r $(PROJECT_NAME)

clean:
	rm -f $(PKGFILE)
