// Fullscreen options tile based on full screen area, as if no panels exist
const Style = { Normal: 0,
				Gapless: 1,
				Fullscreen: 2,
				FullscreenShowPanel: 3,}

let currentStyle = Style.Normal;
let previousStyle = Style.Normal;
let previousTime = new Date().getTime();
let previousClient = null;
let previousTile = null;
let previousWasSequence = false;
let prefixToggle = false;
let flipOnVertical = true;

// Tile defines where the window should be placed
class Tile {
	constructor(x,y,xSlots,ySlots,xSize=1,ySize=1) {
		this.x = x;
		this.y = y;
		this.xSlots = xSlots;
		this.ySlots = ySlots;
		this.xSize = xSize;
		this.ySize = ySize;
	}

	// get Geometry of Tile in the given area 
	getGeometry(area){
		let width = Math.floor(area.width / this.xSlots)
		let height = Math.floor(area.height / this.ySlots)
		// adjust for remainder
		const xRemainder = area.width % this.xSlots
		const yRemainder = area.height % this.ySlots

		const x = area.x + (width*this.x)
		const y = area.y + (height*this.y)

		if (this.x == this.xSlots - 1) {
			width = width + xRemainder
		}
		if (this.y == this.ySlots - 1) {
			height = height + yRemainder
		}

		return { x:x, y:y, width:(width*this.xSize), height:(height*this.ySize)}
	}

	// Return a new tile that is the current tile rotated for vertical monitors
	rotate() {
		return new Tile(this.y,this.x,this.ySlots,this.xSlots,this.ySize,this.xSize)
	}

	// Return a new tile that tiles the current tile vertically given the X coordinate of the given tile
	tileVerticaly(tile) {
		return new Tile(this.x,tile.x,this.xSlots,tile.xSlots,this.xSize,tile.xSize)
	}

	// Return a new tile that is the top half of current tile 
	top() {
		const newYSlots = this.ySlots*2
		const newY = this.y*2
		return new Tile(this.x,newY,this.xSlots,newYSlots,this.xSize,this.ySize)
	}

	// Return a new tile that is the bottom half of current tile
	bottom() {
		const newYSlots = this.ySlots*2
		const newY = this.y*2+1
		return new Tile(this.x,newY,this.xSlots,newYSlots,this.xSize,this.ySize)
	}
}

// Main function called
// Will move current active window to the specified tile
function move(workspace,tile) {
	print("inMove")
	const client = workspace.activeWindow
	if (client.specialWindow) return;

	const maxArea =  workspace.clientArea(KWin.MaximizeArea, client)
	const fullArea = workspace.clientArea(KWin.FullScreenArea, client)
	let area = maxArea
	
	// If the same window is tiled twice in a row, tile it vertically based on horizontal selection
	if (isSequence(client)) {
		currentStyle = previousStyle
		tile = previousTile.tileVerticaly(tile)
		previousWasSequence = true
	} else {
		previousWasSequence = false
	}

	if (currentStyle == Style.Fullscreen) {
		area = fullArea
	}

	// Handle the case of veritcal monitors
	if (flipOnVertical && fullArea.height > fullArea.width) {
		tile = tile.rotate()
	}
	
	let geometry = tile.getGeometry(area);

	// Adjust Geometry based on style
	if (currentStyle == Style.Normal) {
		adjustGap(geometry,tile)
	}
	if (currentStyle == Style.Normal || currentStyle == Style.Gapless) {
		adjustMiddleWidth(geometry,tile)
		client.setMaximize(false,false)
	} else if (currentStyle == Style.FullscreenShowPanel)  {
		adjustShowPanel(geometry,maxArea)
	}
	client.fullScreen = (currentStyle == Style.Fullscreen) || (currentStyle == Style.FullscreenShowPanel)
	client.frameGeometry = geometry

	if (!prefixToggle){
		currentStyle = Style.Normal
	}

	previousTime = new Date().getTime()
	previousClient = client
	previousStyle = currentStyle
	previousTile = tile
}


function isSequence(client) {
	if (previousWasSequence) return false
	if (!readConfig("sequenceEnabled", false)) return false
	if (previousClient == null) return false
	if (previousClient != client) return false
	const timeThreshold = readConfig("sequenceTime", 1000)
	if (new Date().getTime() - previousTime > timeThreshold) return false
	return true
}



// Adjust for middle increase and gap
function adjustMiddleWidth(geometry,tile) {
	const midIncrease = readConfig("middleIncrease", 0)

	if (tile.xSlots == 3) {
		const xShift = [0,-1,1]
		const widthShift = ((tile.xSize <= 1) ? [-1,2,-1] : [1,1,1])

		geometry.x += xShift[tile.x]*midIncrease
		geometry.width += widthShift[tile.x]*midIncrease
	}
}

// Adjust for gaps
function adjustGap(geometry,tile) {
	const gap = readConfig("gap", 0)
	const halfgap = Math.floor(gap / 2)
	
	geometry.x += halfgap
	geometry.y += halfgap
	geometry.width -= 2*halfgap
	geometry.height -= 2*halfgap

	if (tile.x == 0) {
		geometry.x += halfgap
		geometry.width -= halfgap
	}
	if (tile.y == 0) {
		geometry.y += halfgap
		geometry.height -= halfgap
	}	
	if (tile.x+tile.xSize == tile.xSlots) {
		geometry.width -= halfgap
	}
	if (tile.y+tile.ySize == tile.ySlots) {
		geometry.height -= halfgap
	}
}

// Adjust Goemetry to show panel
function adjustShowPanel(geometry,area){
	if (geometry.y < area.y ) {
		const diff = area.y - geometry.y;
		geometry.y=area.y;
		geometry.height -= diff;
	}
	if ((geometry.y + geometry.height) > (area.y + area.height)) {
		const diff = (geometry.y + geometry.height) - (area.y + area.height)
		geometry.height -= diff
	}
	if (geometry.x < area.x ) {
		const diff = area.x - geometry.x
		geometry.x=area.x
		geometry.width -= diff
	}
	if ((geometry.x + geometry.width) > (area.x + area.width)) {
		const diff = (geometry.x + geometry.width) - (area.x + area.width)
		geometry.width -= diff
	}
}


function registerMudeerShortcuts() {
	print("Registering")
	const prefix = "Mudeer Ultrawide: "
	const positions = [["Third Left",new Tile(0,0,3,1),"a"],
	["Third Middle",new Tile(1,0,3,1),"s"],
	["Third Right",new Tile(2,0,3,1),"d"],
	["Two-Thirds Left",new Tile(0,0,3,1,2,1),"Shift+a"],
	["Two-Thirds Right",new Tile(1,0,3,1,2,1),"Shift+d"],
	["Two-Thirds Middle",new Tile(1,0,6,1,4,1),""],
	["Half Left",new Tile(0,0,2,1),"Shift+z"],
	["Half Middle",new Tile(1,0,4,1,2,1),"Shift+s"],
	["Half Right",new Tile(1,0,2,1),"Shift+v"],
	["Quarter Far-Left",new Tile(0,0,4,1),"z"],
	["Quarter Middle-Left",new Tile(1,0,4,1),"x"],
	["Quarter Middle-Right",new Tile(2,0,4,1),"c"],
	["Quarter Far-Right",new Tile(3,0,4,1),"v"],
	["Three-Quarters Left",new Tile(0,0,4,1,3,1),"Shift+x"],
	["Three-Quarters Right",new Tile(1,0,4,1,3,1),"Shift+c"],
	["Whole",new Tile(0,0,1,1),"f"],]
	
	// Must pass 'workspace' since it wasn't working otherwise (maybe out of scope?)
	positions.forEach(function (position) {
		let shortcut = ""
		let shortcutTop = ""
		let shortcutBot = ""
		if (position[2]) {
			shortcut = "Meta+"+position[2]
			shortcutTop = "Meta+Ctrl+"+position[2]
			shortcutBot = "Meta+Alt+"+position[2]
		}
		registerShortcut("Mudeer "+position[0], prefix+position[0], shortcut, move.bind(null,workspace,position[1]));
		registerShortcut("Mudeer "+position[0]+" Top", prefix+position[0]+" Top", shortcutTop, move.bind(null,workspace,position[1].top()));
		registerShortcut("Mudeer "+position[0]+" Bottom", prefix+position[0]+" Bottom", shortcutBot, move.bind(null,workspace,position[1].bottom()));
	})

	registerShortcut("Mudeer Gapless Prefix", prefix+"Gapless Prefix", "Meta+Shift+f", function () {
		if  ( !prefixToggle || !(currentStyle == Style.Gapless)) {
			currentStyle = Style.Gapless
		} else currentStyle = Style.Normal
	})

	registerShortcut("Mudeer Fullscreen Prefix", prefix+"Fullscreen Prefix", "Meta+Ctrl+Shift+f", function () {
		if  ( !prefixToggle || !(currentStyle == Style.Fullscreen)) {
			currentStyle = Style.Fullscreen
		} else currentStyle = Style.Normal
	})
	registerShortcut("Mudeer Fullscreen Prefix Show Panel", prefix+"Fullscreen Prefix Show Panel", "Meta+Alt+Shift+f", function () {
		if  ( !prefixToggle || !(currentStyle == Style.FullscreenShowPanel)) {
			currentStyle = Style.FullscreenShowPanel
		} else currentStyle = Style.Normal
	})
}

registerMudeerShortcuts()
