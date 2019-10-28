var midIncrease = readConfig("MiddleIncrease", 0)

function getGeometry(area,slotGeometry){
    var width = Math.floor(area.width / slotGeometry.xSlots)
    var height = Math.floor(area.height / slotGeometry.ySlots)
    // adjust for remainder
    var xRemainder = area.width % slotGeometry.xSlots
    var yRemainder = area.height % slotGeometry.ySlots

    var x = area.x + (width*slotGeometry.x)
    var y = area.y + (height*slotGeometry.y)
    
    if (slotGeometry.x == slotGeometry.xSlots - 1) {
	width = width + xRemainder
    }
    if (slotGeometry.y == slotGeometry.ySlots - 1) {
	height = height + yRemainder
    }


    return { x:x, y:y, width:(width*slotGeometry.xSize), height:(height*slotGeometry.ySize)}
}

// Adjust for middle increase
function adjustGeometry(geometry,x,xSlots) {
    if (xSlots = 3) {
	if (x == 1) {
	    geometry.width += 2*midIncrease
	    geometry.x -= midIncrease
	} else {
	    geometry.width -= midIncrease
	}
	if (x == 2) {
	    geometry.x += midIncrease
	}
    }
}

function move(workspace,xSlots,x,xSize, yPos) {
    var client = workspace.activeClient
    var area =  workspace.clientArea(KWin.MaximizeArea, client)
    // Adjust for yPos (0:Full Height, 1: Top, 2: Bottom)
    var y = 0
    var ySlots = 1
    var ySize = 1
    if (yPos > 0) {
	ySlots = 2
	y = yPos - 1
    }

    var geometry = getGeometry(area,{x:x,y:y,xSlots:xSlots,ySlots:ySlots,xSize:xSize,ySize:ySize})
    adjustGeometry(geometry)
    client.geometry = geometry
}

function halfFullsceen(workspace) {
    var client = workspace.activeClient
    var area = workspace.clientArea(KWin.FullScreenArea, client)
    client.geometry = getGeometry(area,{x:1,y:0,xSlots:2,ySlots:1,xSize:1,ySize:1})
}


// Must pass 'workspace' since it would be out of scope otherwise


// These only handle the case of struts that are top or bottom of screen
registerShortcut("Mudeer Half Fullscreen Right", "Mudeer Ultrawide: Half Fullscreen Right", "Meta+f", function () {
    halfFullsceen(workspace)})


// Screen by Thirds
registerShortcut("Mudeer Left", "Mudeer Ultrawide: Third Left", "Meta+a", function () {
    move(workspace, 3,0,1,0)})
registerShortcut("Mudeer Center", "Mudeer Ultrawide: Third Center", "Meta+s", function () {
    move(workspace, 3,1,1,0)})
registerShortcut("Mudeer Right", "Mudeer Ultrawide: Third Right", "Meta+d", function () {
    move(workspace, 3,2,1,0)})

// Screen by Thirds TOP
registerShortcut("Mudeer Left Top", "Mudeer Ultrawide: Third Left Top", "Meta+Ctrl+a", function () {
    move(workspace, 3,0,1,1)})
registerShortcut("Mudeer Center Top", "Mudeer Ultrawide: Third Center Top", "Meta+Ctrl+s", function () {
    move(workspace, 3,1,1,1)})
registerShortcut("Mudeer Right Top", "Mudeer Ultrawide: Third Right Top", "Meta+Ctrl+d", function () {
    move(workspace, 3,2,1,1)})

// Screen by Thirds Bottom
registerShortcut("Mudeer Left Bottom", "Mudeer Ultrawide: Third Left", "Meta+Alt+a", function () {
    move(workspace, 3,0,1,2)})
registerShortcut("Mudeer Center Bottom", "Mudeer Ultrawide: Third Center", "Meta+Alt+s", function () {
    move(workspace, 3,1,1,2)})
registerShortcut("Mudeer Right Bottom", "Mudeer Ultrawide: Third Right", "Meta+Alt+d", function () {
    move(workspace, 3,2,1,2)})

// Screen by Multiple Thirds
registerShortcut("Mudeer Left Multi", "Mudeer Ultrawide: Two-Thirds Left", "Meta+Shift+a", function () {
    move(workspace, 3,0,2,0)})
registerShortcut("Mudeer Center Multi", "Mudeer Ultrawide: Whole Screen", "Meta+Shift+s", function () {
    move(workspace, 4,1,2,0)})
registerShortcut("Mudeer Right Multi", "Mudeer Ultrawide: Two-Thirds Right", "Meta+Shift+d", function () {
    move(workspace, 3,2,2,0)})

// Screen by Multiple Thirds TOP
registerShortcut("Mudeer Left Multi Top", "Mudeer Ultrawide: Two-Thirds Left Top", "Meta+Shift+Ctrl+a", function () {
    move(workspace, 3,0,2,1)})
registerShortcut("Mudeer Center Multi Top", "Mudeer Ultrawide: Whole Screen Top", "Meta+Shift+Ctrl+s", function () {
    move(workspace, 4,1,2,1)})
registerShortcut("Mudeer Right Multi Top", "Mudeer Ultrawide: Two-Thirds Right Top", "Meta+Shift+Ctrl+d", function () {
    move(workspace, 3,2,2,1)})

// Screen by Multiple Thirds Bottom
registerShortcut("Mudeer Left Multi Bottom", "Mudeer Ultrawide: Two-Thirds Left Bottom", "Meta+Shift+Alt+a", function () {
    move(workspace, 3,0,2,2)})
registerShortcut("Mudeer Center Multi Bottom", "Mudeer Ultrawide: Whole Screen Bottom", "Meta+Shift+Alt+s", function () {
    move(workspace, 4,1,2,2)})
registerShortcut("Mudeer Right Multi Bottom", "Mudeer Ultrawide: Two-Thirds Right Bottom", "Meta+Shift+Alt+d", function () {
    move(workspace, 3,2,2,2)})

// Screen By Quarters
registerShortcut("Mudeer Far Left", "Mudeer Ultrawide: Quarter Far Left", "Meta+z", function () {
    move(workspace, 4,0,1,0)})
registerShortcut("Mudeer Center Left", "Mudeer Ultrawide: Quarter Center Left", "Meta+x", function () {
    move(workspace, 4,1,1,0)})
registerShortcut("Mudeer Center Right", "Mudeer Ultrawide: Quarter Center Right", "Meta+c", function () {
    move(workspace, 4,2,1,0)})
registerShortcut("Mudeer Far Right", "Mudeer Ultrawide: Quarter Far Right", "Meta+v", function () {
    move(workspace, 4,3,1,0)})

// Screen By Quarters Top
registerShortcut("Mudeer Far Left Top", "Mudeer Ultrawide: Quarter Far Left Top", "Meta+Ctrl+z", function () {
    move(workspace, 4,0,1,1)})
registerShortcut("Mudeer Center Left Top", "Mudeer Ultrawide: Quarter Center Left Top", "Meta+Ctrl+x", function () {
    move(workspace, 4,1,1,1)})
registerShortcut("Mudeer Center Right Top", "Mudeer Ultrawide: Quarter Center Right Top", "Meta+Ctrl+c", function () {
    move(workspace, 4,2,1,1)})
registerShortcut("Mudeer Far Right Top", "Mudeer Ultrawide: Quarter Far Right Top", "Meta+Ctrl+v", function () {
    move(workspace, 4,3,1,1)})

// Screen By Quarters Bottom
registerShortcut("Mudeer Far Bottom", "Mudeer Ultrawide: Quarter Far Left Bottom", "Meta+Alt+z", function () {
    move(workspace, 4,0,1,2)})
registerShortcut("Mudeer Center Left Bottom", "Mudeer Ultrawide: Quarter Center Left Bottom", "Meta+Alt+x", function () {
    move(workspace, 4,1,1,2)})
registerShortcut("Mudeer Center Right Bottom", "Mudeer Ultrawide: Quarter Center Right Bottom", "Meta+Alt+c", function () {
    move(workspace, 4,2,1,2)})
registerShortcut("Mudeer Far Right Bottom", "Mudeer Ultrawide: Quarter Far Right Bottom", "Meta+Alt+v", function () {
    move(workspace, 4,3,1,2)})

// Screen By Multiple Quarters
registerShortcut("Mudeer Half Left", "Mudeer Ultrawide: Half Left", "Meta+Shift+z", function () {
    move(workspace, 4,0,3,0)})
registerShortcut("Mudeer Three-Quarters Left", "Mudeer Ultrawide: Three-Quarters Left", "Meta+Shift+x", function () {
    move(workspace, 4,0,2,0)})
registerShortcut("Mudeer Three-Quarters Right", "Mudeer Ultrawide: Three-Quarters Right", "Meta+Shift+c", function () {
    move(workspace, 4,2,2,0)})
registerShortcut("Mudeer Half Right", "Mudeer Ultrawide: Half Right", "Meta+Shift+v", function () {
    move(workspace, 4,1,3,0)})

// Screen By Multiple Quarters Top
registerShortcut("Mudeer Half Left Top", "Mudeer Ultrawide: Half Left Top", "Meta+Shift+Ctrl+z", function () {
    move(workspace, 4,0,3,1)})
registerShortcut("Mudeer Three-Quarters Left Top", "Mudeer Ultrawide: Three-Quarters Left Top", "Meta+Shift+Ctrl+x", function () {
    move(workspace, 4,0,2,1)})
registerShortcut("Mudeer Three-Quarters Right Top", "Mudeer Ultrawide: Three-Quarters Right Top", "Meta+Shift+Ctrl+c", function () {
    move(workspace, 4,2,2,1)})
registerShortcut("Mudeer Half Right Top", "Mudeer Ultrawide: Half Right Top", "Meta+Shift+Ctrl+v", function () {
    move(workspace, 4,1,3,1)})

// Screen By Multiple Quarters Bottom
registerShortcut("Mudeer Half Left Bottom", "Mudeer Ultrawide: Half Left", "Meta+Shift+Alt+z", function () {
    move(workspace, 4,0,3,2)})
registerShortcut("Mudeer Three-Quarters Left Bottom", "Mudeer Ultrawide: Three-Quarters Left", "Meta+Shift+Alt+x", function () {
    move(workspace, 4,0,2,2)})
registerShortcut("Mudeer Three-Quarters Right Bottom", "Mudeer Ultrawide: Three-Quarters Right", "Meta+Shift+Alt+c", function () {
    move(workspace, 4,2,2,2)})
registerShortcut("Mudeer Half Right Bottom", "Mudeer Ultrawide: Half Right", "Meta+Shift+Alt+v", function () {
    move(workspace, 4,1,3,2)})
