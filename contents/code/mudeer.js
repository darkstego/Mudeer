//var midIncrease = readConfig("MiddleIncrease", 0)

function getGeometry(area,slotGeometry){
    var width = Math.floor(area.width / slotGeometry.xSlots)
    var height = Math.floor(area.height / slotGeometry.ySlots)
    // adjust for remainder
    var xRemainder = area.width % slotGeometry.xSlots
    var yRemainder = area.height % slotGeometry.ySlots
    if (slotGeometry.x == slotGeometry.xSlots - 1) {
	width = width + xRemainder
    }
    if (slotGeometry.y == slotGeometry.ySlots - 1) {
	height = height + yRemainder
    }

    var x = area.x + (width*slotGeometry.x)
    var y = area.y + (height*slotGeometry.y)

    return { x:x, y:y, width:(width*slotGeometry.xSize), height:(height*slotGeometry.ySize)}
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

    client.geometry = getGeometry(area,{x:x,y:y,xSlots:xSlots,ySlots:ySlots,xSize:xSize,ySize:ySize})
}

function halfFullsceen(workspace) {
    var client = workspace.activeClient
    var area = workspace.clientArea(KWin.FullScreenArea, client)
    client.geometry = getGeometry(area,{x:1,y:0,xSlots:2,ySlots:1,xSize:1,ySize:1})
}


// Must pass 'workspace' since it would be out of scope otherwise


// These only handle the case of struts that are top or bottom of screen
registerShortcut("Mudeer Half Fullscreen Right", "Super Ultrawide Tiling: Half Fullscreen Right", "Meta+f", function () {
    halfFullsceen(workspace)})


// Screen by Thirds
registerShortcut("Mudeer Left", "Super Ultrawide Tiling: Third Left", "Meta+a", function () {
    move(workspace, 3,0,1,0)})
registerShortcut("Mudeer Center", "Super Ultrawide Tiling: Third Center", "Meta+s", function () {
    move(workspace, 3,1,1,0)})
registerShortcut("Mudeer Right", "Super Ultrawide Tiling: Third Right", "Meta+d", function () {
    move(workspace, 3,2,1,0)})

// Screen by Thirds TOP
registerShortcut("Mudeer Left Top", "Super Ultrawide Tiling: Third Left Top", "Meta+Ctrl+a", function () {
    move(workspace, 3,0,1,1)})
registerShortcut("Mudeer Center Top", "Super Ultrawide Tiling: Third Center Top", "Meta+Ctrl+s", function () {
    move(workspace, 3,1,1,1)})
registerShortcut("Mudeer Right Top", "Super Ultrawide Tiling: Third Right Top", "Meta+Ctrl+d", function () {
    move(workspace, 3,2,1,1)})

// Screen by Thirds Bottom
registerShortcut("Mudeer Left Bottom", "Super Ultrawide Tiling: Third Left", "Meta+Alt+a", function () {
    move(workspace, 3,0,1,2)})
registerShortcut("Mudeer Center Bottom", "Super Ultrawide Tiling: Third Center", "Meta+Alt+s", function () {
    move(workspace, 3,1,1,2)})
registerShortcut("Mudeer Right Bottom", "Super Ultrawide Tiling: Third Right", "Meta+Alt+d", function () {
    move(workspace, 3,2,1,2)})

// Screen by Multiple Thirds
registerShortcut("Mudeer Left Multi", "Super Ultrawide Tiling: Two-Thirds Left", "Meta+Shift+a", function () {
    move(workspace, 3,0,2,0)})
registerShortcut("Mudeer Center Multi", "Super Ultrawide Tiling: Whole Screen", "Meta+Shift+s", function () {
    move(workspace, 4,1,2,0)})
registerShortcut("Mudeer Right Multi", "Super Ultrawide Tiling: Two-Thirds Right", "Meta+Shift+d", function () {
    move(workspace, 3,2,2,0)})

// Screen by Multiple Thirds TOP
registerShortcut("Mudeer Left Multi Top", "Super Ultrawide Tiling: Two-Thirds Left Top", "Meta+Shift+Ctrl+a", function () {
    move(workspace, 3,0,2,1)})
registerShortcut("Mudeer Center Multi Top", "Super Ultrawide Tiling: Whole Screen Top", "Meta+Shift+Ctrl+s", function () {
    move(workspace, 4,1,2,1)})
registerShortcut("Mudeer Right Multi Top", "Super Ultrawide Tiling: Two-Thirds Right Top", "Meta+Shift+Ctrl+d", function () {
    move(workspace, 3,2,2,1)})

// Screen by Multiple Thirds Bottom
registerShortcut("Mudeer Left Multi Bottom", "Super Ultrawide Tiling: Two-Thirds Left Bottom", "Meta+Shift+Alt+a", function () {
    move(workspace, 3,0,2,2)})
registerShortcut("Mudeer Center Multi Bottom", "Super Ultrawide Tiling: Whole Screen Bottom", "Meta+Shift+Alt+s", function () {
    move(workspace, 4,1,2,2)})
registerShortcut("Mudeer Right Multi Bottom", "Super Ultrawide Tiling: Two-Thirds Right Bottom", "Meta+Shift+Alt+d", function () {
    move(workspace, 3,2,2,2)})

// Screen By Quarters
registerShortcut("Mudeer Far Left", "Super Ultrawide Tiling: Quarter Far Left", "Meta+z", function () {
    move(workspace, 4,0,1,0)})
registerShortcut("Mudeer Center Left", "Super Ultrawide Tiling: Quarter Center Left", "Meta+x", function () {
    move(workspace, 4,1,1,0)})
registerShortcut("Mudeer Center Right", "Super Ultrawide Tiling: Quarter Center Right", "Meta+c", function () {
    move(workspace, 4,2,1,0)})
registerShortcut("Mudeer Far Right", "Super Ultrawide Tiling: Quarter Far Right", "Meta+v", function () {
    move(workspace, 4,3,1,0)})

// Screen By Quarters Top
registerShortcut("Mudeer Far Left Top", "Super Ultrawide Tiling: Quarter Far Left Top", "Meta+Ctrl+z", function () {
    move(workspace, 4,0,1,1)})
registerShortcut("Mudeer Center Left Top", "Super Ultrawide Tiling: Quarter Center Left Top", "Meta+Ctrl+x", function () {
    move(workspace, 4,1,1,1)})
registerShortcut("Mudeer Center Right Top", "Super Ultrawide Tiling: Quarter Center Right Top", "Meta+Ctrl+c", function () {
    move(workspace, 4,2,1,1)})
registerShortcut("Mudeer Far Right Top", "Super Ultrawide Tiling: Quarter Far Right Top", "Meta+Ctrl+v", function () {
    move(workspace, 4,3,1,1)})

// Screen By Quarters Bottom
registerShortcut("Mudeer Far Bottom", "Super Ultrawide Tiling: Quarter Far Left Bottom", "Meta+Alt+z", function () {
    move(workspace, 4,0,1,2)})
registerShortcut("Mudeer Center Left Bottom", "Super Ultrawide Tiling: Quarter Center Left Bottom", "Meta+Alt+x", function () {
    move(workspace, 4,1,1,2)})
registerShortcut("Mudeer Center Right Bottom", "Super Ultrawide Tiling: Quarter Center Right Bottom", "Meta+Alt+c", function () {
    move(workspace, 4,2,1,2)})
registerShortcut("Mudeer Far Right Bottom", "Super Ultrawide Tiling: Quarter Far Right Bottom", "Meta+Alt+v", function () {
    move(workspace, 4,3,1,2)})

// Screen By Multiple Quarters
registerShortcut("Mudeer Half Left", "Super Ultrawide Tiling: Half Left", "Meta+Shift+z", function () {
    move(workspace, 4,0,3,0)})
registerShortcut("Mudeer Three-Quarters Left", "Super Ultrawide Tiling: Three-Quarters Left", "Meta+Shift+x", function () {
    move(workspace, 4,0,2,0)})
registerShortcut("Mudeer Three-Quarters Right", "Super Ultrawide Tiling: Three-Quarters Right", "Meta+Shift+c", function () {
    move(workspace, 4,2,2,0)})
registerShortcut("Mudeer Half Right", "Super Ultrawide Tiling: Half Right", "Meta+Shift+v", function () {
    move(workspace, 4,1,3,0)})

// Screen By Multiple Quarters Top
registerShortcut("Mudeer Half Left Top", "Super Ultrawide Tiling: Half Left Top", "Meta+Shift+Ctrl+z", function () {
    move(workspace, 4,0,3,1)})
registerShortcut("Mudeer Three-Quarters Left Top", "Super Ultrawide Tiling: Three-Quarters Left Top", "Meta+Shift+Ctrl+x", function () {
    move(workspace, 4,0,2,1)})
registerShortcut("Mudeer Three-Quarters Right Top", "Super Ultrawide Tiling: Three-Quarters Right Top", "Meta+Shift+Ctrl+c", function () {
    move(workspace, 4,2,2,1)})
registerShortcut("Mudeer Half Right Top", "Super Ultrawide Tiling: Half Right Top", "Meta+Shift+Ctrl+v", function () {
    move(workspace, 4,1,3,1)})

// Screen By Multiple Quarters Bottom
registerShortcut("Mudeer Half Left Bottom", "Super Ultrawide Tiling: Half Left", "Meta+Shift+Alt+z", function () {
    move(workspace, 4,0,3,2)})
registerShortcut("Mudeer Three-Quarters Left Bottom", "Super Ultrawide Tiling: Three-Quarters Left", "Meta+Shift+Alt+x", function () {
    move(workspace, 4,0,2,2)})
registerShortcut("Mudeer Three-Quarters Right Bottom", "Super Ultrawide Tiling: Three-Quarters Right", "Meta+Shift+Alt+c", function () {
    move(workspace, 4,2,2,2)})
registerShortcut("Mudeer Half Right Bottom", "Super Ultrawide Tiling: Half Right", "Meta+Shift+Alt+v", function () {
    move(workspace, 4,1,3,2)})
