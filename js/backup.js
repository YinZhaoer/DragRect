/*
* @Author: ZY
* @Date:   2017-10-28 15:47:44
* @Last Modified by:   ZY
* @Last Modified time: 2017-10-29 19:12:09
*/


var svg
var mythis
//隐形矩形的半大
var subRectWidth = 8;
//拖拽后最小边长
var minRectLength = 20;
//每次旋转的角度
var roateSpeed = 10;

(function () {
    var msvg = d3.select("body").append("svg")
    msvg.attr("width", 1500)
        .attr("height", 1000);
    svg = msvg;

})();
//对主体的拖拽操作
var drag = d3.behavior.drag()
    .on("drag", dragmove)
    .on("dragend", dragend)



//移动的时候只需要主体的变化逻辑即可,注意获取坐标
function dragmove(d) {

    var mainWidth = parseInt(d3.select(this).attr("width"))
    var mainHeight = parseInt(d3.select(this).attr("height"))
    var mainId = d3.select(this).attr("id")
    var mainX = d3.event.x - mainWidth / 2
    var mainY = d3.event.y - mainHeight / 2
    var coordinates = [[mainX, mainY], [mainX + mainWidth, mainY], [mainX + mainWidth, mainY + mainHeight], [mainX, mainY + mainHeight]]
    if (d3.event.button == 2) {
        console.log("right")
        var roateAngle = d3.select(this).attr("roateAngle")
        roateAngle += 10;
        console.log(d3.event.button)
        d3.select("#" + mainId).attr('roateAngle', roateAngle)
            .attr('transform', 'rotate(' + roateAngle + ")")
            .attr('transform-origin', d3.select(this).attr('originX') + " " + d3.select(this).attr('originY'))
    }
    else {
        d3.select(this)
            .attr("x", mainX)
            .attr("y", mainY)
            .attr("originX", d3.event.x)
            .attr("originY", d3.event.y)
            .attr('transform-origin', d3.event.x + " " + d3.event.y)
            .property("coordinates", coordinates)
    }
}

//结束拖拽后重新布局子矩形
function dragend() {
    var mainId = d3.select(this).attr("id")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    var mainOriginX = mainX + mainWidth / 2
    var mainOriginY = mainY + mainHeight / 2
    var mainRoateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    var subRectLeftId = "subRectLeft" + mainId
    var subRectRightId = "subRectRight" + mainId
    var subRectTopId = "subRectTop" + mainId
    var subRectBottomId = "subRectBottom" + mainId
    var subRectLeftTopId = "subRectLeftTop" + mainId
    var subRectRightTopId = "subRectRightTop" + mainId
    var subRectLeftBottomId = "subRectLeftBottom" + mainId
    var subRectRightBottomId = "subRectRightBottom" + mainId

    d3.select("#" + subRectLeftId).attr("x", mainX - subRectWidth)
        .attr("y", mainY)
        .attr("height", mainHeight)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY)
        .attr("height", mainHeight)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectTopId).attr("x", mainX)
        .attr("y", mainY - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectBottomId).attr("x", mainX)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectLeftTopId).attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightTopId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectLeftBottomId).attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightBottomId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + mainId).attr("originX", mainOriginX)
        .attr("originY", mainOriginY)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)


}

//子矩形拖拽后的重新布局，与主体拖拽结束后的重新布局区别在于这里不改变旋转中心来保证拖拽方向正常,注意此时改变coordinates的值
function reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth) {


    var mainRoateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    var coordinates = [[mainX, mainY], [mainX + mainWidth, mainY], [mainX + mainWidth, mainY + mainHeight], [mainX, mainY + mainHeight]]
    d3.select("#" + mainId)
        .attr("x", mainX)
        .attr("y", mainY)
        .attr("width", mainWidth)
        .attr("height", mainHeight)
        .property("coordinates", coordinates)

    d3.select("#" + 'subRectTop' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr("width", mainWidth)
    d3.select("#" + 'subRectBottom' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr("width", mainWidth)
    d3.select("#" + 'subRectLeft' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr("height", mainHeight)
    d3.select("#" + 'subRectRight' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr("height", mainHeight)
    d3.select("#" + 'subRectLeftTop' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
    d3.select("#" + 'subRectRightTop' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
    d3.select("#" + 'subRectLeftBottom' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
    d3.select("#" + 'subRectRightBottom' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)


}


//对左边矩形的拖拽
var subRectLeftDrag = d3.behavior.drag()
    .on("drag", subRectLeftDragmove)


function subRectLeftDragmove(d) {
    var id = d3.select(this).attr("id")
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    if (mainX + mainWidth - d3.event.x > minRectLength) {
        if (d3.event.x < mainX) {
            mainWidth = mainX - d3.event.x + mainWidth
            mainX = d3.event.x

        }
        else {
            mainWidth = mainWidth - (d3.event.x - mainX)
            mainX = d3.event.x
        }
    }


    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右边矩形的拖拽
var subRectRightDrag = d3.behavior.drag()
    .on("drag", subRectRightDragmove)


function subRectRightDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    if (d3.event.x - mainX > minRectLength) {
        if (d3.event.x < mainX + mainWidth) {
            mainWidth = mainWidth - (mainX + mainWidth - d3.event.x)

        }
        else {
            mainWidth = mainWidth + (d3.event.x - mainX - mainWidth)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);

}

//对上边矩形的拖拽
var subRectTopDrag = d3.behavior.drag()
    .on("drag", subRectTopDragmove)


function subRectTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    if (mainY + mainHeight - d3.event.y > minRectLength) {
        if (d3.event.y < mainY) {
            mainHeight = mainHeight + (mainY - d3.event.y)
            mainY = d3.event.y

        }
        else {
            mainHeight = mainHeight - (d3.event.y - mainY)
            mainY = d3.event.y

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}

//对下边矩形的拖拽
var subRectBottomDrag = d3.behavior.drag()
    .on("drag", subRectBottomDragmove)


function subRectBottomDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    if (d3.event.y - mainY > minRectLength) {
        if (d3.event.y < mainY + mainHeight) {
            mainHeight = mainHeight - (mainY + mainHeight - d3.event.y)

        }
        else {
            mainHeight = mainHeight + (d3.event.y - mainY - mainHeight)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}

//对左上边框的拖拽
var subRectLeftTopDrag = d3.behavior.drag()
    .on("drag", subRectLeftTopDragmove)

function subRectLeftTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    if (mainX + mainWidth - d3.event.x > minRectLength && mainY + mainHeight - d3.event.y > minRectLength) {
        if (event.x < mainX && event.y < mainY) {
            mainWidth = mainWidth + (mainX - event.x)
            mainX = event.x
            mainHeight = mainHeight + (mainY - event.y)
            mainY = event.y
        }
        else {
            mainWidth = mainWidth - (event.x - mainX)
            mainX = event.x
            mainHeight = mainHeight - (event.y - mainY)
            mainY = event.y

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右上边框的拖拽
var subRectRightTopDrag = d3.behavior.drag()
    .on("drag", subRectRightTopDragmove)

function subRectRightTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    if (d3.event.x - mainX > minRectLength - subRectWidth && mainY + mainHeight - d3.event.y > minRectLength - subRectWidth) {
        if (event.x < mainX + mainWidth && event.y > mainY) {
            mainWidth = mainWidth - (mainX + mainWidth - event.x)
            mainHeight = mainHeight - (event.y - mainY)
            mainY = event.y
        }
        else {
            mainWidth = mainWidth + (event.x - mainX - mainWidth)
            mainHeight = mainHeight + (mainY - event.y)
            mainY = event.y

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}


//对左下边框的拖拽
var subRectLeftBottomDrag = d3.behavior.drag()
    .on("drag", subRectLeftBottomDragmove)

function subRectLeftBottomDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))

    d3.select(this)
        .attr("x", d3.event.x - width / 2)
        .attr("y", d3.event.y - height / 2)
    if (mainX + mainWidth - d3.event.x > minRectLength - subRectWidth && d3.event.y - mainY > minRectLength - subRectWidth) {
        if (event.x < mainX && event.y > mainY + mainHeight) {
            mainWidth = mainWidth + (mainX - event.x)
            mainX = event.x
            mainHeight = mainHeight + (event.y - mainY - mainHeight)
        }
        else {
            mainWidth = mainWidth - (event.x - mainX)
            mainX = event.x
            mainHeight = mainHeight - (mainY + mainHeight - event.y)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右边下边框的拖拽
var subRectRightBottomDrag = d3.behavior.drag()
    .on("drag", subRectRightBottomDragmove)

function subRectRightBottomDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = parseInt(d3.select("#" + mainId).attr("x"))
    var mainY = parseInt(d3.select("#" + mainId).attr("y"))
    var mainWidth = parseInt(d3.select("#" + mainId).attr("width"))
    var mainHeight = parseInt(d3.select("#" + mainId).attr("height"))
    d3.select(this)
        .attr("x", d3.event.x - width / 2)
        .attr("y", d3.event.y - height / 2)

    if (d3.event.x - mainX > minRectLength - subRectWidth && d3.event.y - mainY > minRectLength - subRectWidth) {
        if (event.x < mainX + mainWidth && event.y < mainY + mainHeight) {
            mainWidth = mainWidth - (mainX + mainWidth - event.x)
            mainHeight = mainHeight - (mainY + mainHeight - event.y)
        }
        else {
            mainWidth = mainWidth + (event.x - mainX - mainWidth)
            mainHeight = mainHeight + (event.y - mainY - mainHeight)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);

}

function myRoate(mainId) {
    var roateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    roateAngle += roateSpeed;
    var idArray = [mainId, "subRectLeft" + mainId, "subRectRight" + mainId, 'subRectTop' + mainId, "subRectBottom" + mainId, "subRectLeftTop" + mainId, "subRectRightTop" + mainId, "subRectLeftBottom" + mainId, "subRectRightBottom" + mainId]
    for (var i = 0; i < idArray.length; i++) {
        d3.select("#" + idArray[i]).attr('roateAngle', roateAngle)
            .attr('transform', 'rotate(' + roateAngle + ")")
            .attr('transform-origin', d3.select("#" + mainId).attr('originX') + " " + d3.select("#" + mainId).attr('originY'))

    }
}

//创建主类
function MyRect(x, y, width, height, id) {
    var roateAngle = 0;
    var coordinates = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]]
    var rect = svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "red")
        .attr("id", id)
        .attr("roateFlag", 0)
        .attr('roateAngle', roateAngle)
        .attr("originX", x + width / 2)
        .attr("originY", y + height / 2)
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
            var mainId = id;
            myRoate(mainId)
            // d3.select("#" + id).attr('roateAngle', roateAngle)
            //     .attr('transform', 'rotate(' + roateAngle + ")")
            //     .attr('transform-origin', d3.select(this).attr('originX') + " " + d3.select(this).attr('originY'))
        })
        .call(drag)
    rect.property("coordinates", coordinates)


    var subRectLeft = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y)
        .attr("width", 2 * subRectWidth)
        .attr("height", height)
        .attr("fill", "black")
        .attr("id", "subRectLeft" + id)
        .attr("mainId", id)
        .call(subRectLeftDrag)

    var subRectRight = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y)
        .attr("width", 2 * subRectWidth)
        .attr("height", height)
        .attr("fill", "black")
        .attr("id", "subRectRight" + id)
        .attr("mainId", id)
        .call(subRectRightDrag)

    var subRectTop = svg.append("rect")
        .attr("x", x)
        .attr("y", y - subRectWidth)
        .attr("width", width)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectTop" + id)
        .attr("mainId", id)
        .call(subRectTopDrag)

    var subRectBottom = svg.append("rect")
        .attr("x", x)
        .attr("y", y + height - subRectWidth)
        .attr("width", width)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectBottom" + id)
        .attr("mainId", id)
        .call(subRectBottomDrag)

    var subRectLeftTop = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectLeftTop" + id)
        .attr("mainId", id)
        .call(subRectLeftTopDrag)

    var subRectRightTop = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectRightTop" + id)
        .attr("mainId", id)
        .call(subRectRightTopDrag)

    var subRectLeftBottom = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y + height - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectLeftBottom" + id)
        .attr("mainId", id)
        .call(subRectLeftBottomDrag)

    var subRectRightBottom = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y + height - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "black")
        .attr("id", "subRectRightBottom" + id)
        .attr("mainId", id)
        .call(subRectRightBottomDrag)


    return rect;

}