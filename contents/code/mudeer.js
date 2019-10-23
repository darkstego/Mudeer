var midIncrease = readConfig("MiddleIncrease", 0)
const mudeer_area = { LEFT:0, CENTER:1, RIGHT:2  }


function getArea(client, workspace, position) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client)
    var width = Math.floor(maxArea.width/3)
    print(width)
    return {x:maxArea.x+(position*width), y:maxArea.y, width:width, height:maxArea.height}
}

function move(workspace, position){
    client = workspace.activeClient
    if (client.moveable) {
	client.geometry = getArea(client, workspace, position)
    }
}


registerShortcut("MaximizeLeft", "Mudeer Ultrawide Tiling: Maximize to Left", "Meta+a", function () {
    move(workspace, mudeer_area.LEFT)})
registerShortcut("MaximizeCenter", "Mudeer Ultrawide Tiling: Maximize to Center", "Meta+s", function () {
    move(workspace, mudeer_area.CENTER)})
registerShortcut("MaximizeRight", "Mudeer Ultrawide Tiling: Maximize to Right", "Meta+d", function () {
    move(workspace, mudeer_area.RIGHT)})
