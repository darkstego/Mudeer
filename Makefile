PKGFILE = mudeer.kwinscript

build: package
	(cd package && zip -r $(PKGFILE) ./*)
	(cd package && mv $(PKGFILE) ../)

install: build
	kpackagetool6 -t KWin/Script -s mudeer \
		&& kpackagetool6 -t KWin/Script -u $(PKGFILE) \
		|| kpackagetool6 -t KWin/Script -i $(PKGFILE)


clean:
	rm -f $(PKGFILE)
