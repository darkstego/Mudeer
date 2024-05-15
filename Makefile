PROJECT_NAME = mudeer
PKGFILE = $(PROJECT_NAME).kwinscript

build: package
	(cd package && zip -r $(PKGFILE) ./*)
	(cd package && mv $(PKGFILE) ../)

install: build
	kpackagetool5 -t KWin/Script -s $(PROJECT_NAME) \
		&& kpackagetool5 -u $(PKGFILE) \
		|| kpackagetool5 -i $(PKGFILE)	

uninstall:
	kpackagetool5 -t KWin/Script -r $(PROJECT_NAME)

clean:
	rm -f $(PKGFILE)
