PKGFILE = mudeer.kwinscript

build: package
	(cd package && zip -r $(PKGFILE) ./*)
	(cd package && mv $(PKGFILE) ../)

install: build
	kpackagetool5 -t KWin/Script -s mudeer \
		&& kpackagetool5 -u $(PKGFILE) \
		|| kpackagetool5 -i $(PKGFILE)	


clean:
	rm -f $(PKGFILE)