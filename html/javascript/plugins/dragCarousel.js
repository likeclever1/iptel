"use strict"
// dragCarousel
var dragCarousel = function() {

    var carouselRoom = $('#carouselRoom'),
        carouselRoomNav = $('#carouselRoomNav'),
        carouselRoomListWidth = $('#carouselRoomList').width(),
        carouselWidth = 0,
        handleBoard = document.getElementById("handleBoard"),
        handleBoardCoords,
        handleBoardWidth = $('.handle-board').width(),
        diff,
        ratio,
        handle = $('#handle'),
        handleWidth = handle.width(),
        leftEnd = handleBoardWidth - handleWidth,
        mouseDownInterval,
        target,
        padding = 40,
        itemRooms = $('#itemRooms'),
        itemSuites = $('#itemSuites'),
        itemSignature = $('#itemSignature'),
        itemRoomsGroup = true,
        itemSuitesGroup = true,
        itemSignatureGroup = true,
        startGroup,
        prev = $('#carouselRoomPrev'),
        next = $('#carouselRoomNext'),
        pseudoElWidth = 14,
        handlCoord = {},
        spanMenuArr = [],
        calcCoordReplaceEl,
        dragCalcCoord,
        parseChar,
        highlight,
        itemMenuArr = carouselRoomNav.find('li');
    
    // bad select
    carouselRoomNav[0].onmousedown = carouselRoomNav[0].onselectstart = function() {
      return false;
    }

    // width all img in carousel
    for(var i = 0; i < carouselRoom.children('.carousel-room__item').length; i++) {
        carouselWidth += carouselRoom.children('.carousel-room__item').eq(i).outerWidth(true);
    }

    carouselRoom.width(carouselWidth);

    ratio = ( carouselWidth - carouselRoomListWidth )/(handleBoardWidth - handleWidth );

    // =========== START
    //function for overide letters
    parseChar = function() {
        function charReplace(node, wrap) {
            if(!node) return;

            var arrLetters = [],
                elem;
            arrLetters = node.innerHTML.split("");
            node.innerHTML = "";

            for(var i = 0; i < arrLetters.length; i++) {
                elem = document.createElement(wrap);
                elem.innerHTML = arrLetters[i];
                node.appendChild(elem);
            }
        };

        // make replace for each item
        for(var i = 0; i < itemMenuArr.length; i++) {
            charReplace(itemMenuArr[i], 'span');
            spanMenuArr.push($(itemMenuArr[i]).children("span"));
        }

        calcCoordReplaceEl = function() {
            // for each char coord
            for(var i = 0; i < spanMenuArr.length; i++) {
                for(var j = 0; j < spanMenuArr[i].length; j++) {
                    spanMenuArr[i][j]['left'] = spanMenuArr[i][j].getBoundingClientRect().left;
                    spanMenuArr[i][j]['right'] = spanMenuArr[i][j].getBoundingClientRect().right;
                }
            }
        }();

        dragCalcCoord = function(handlCoord) {
            for(var i = 0; i < spanMenuArr.length; i++) {
                    for(var j = 0; j < spanMenuArr[i].length; j++) {
                        if(handlCoord.right > spanMenuArr[i][j]['left']) {
                            $(spanMenuArr[i][j]).addClass('white');
                        }
                    }
                }
                
                for(var i = 0; i < spanMenuArr.length; i++) {
                    for(var j = 0; j < spanMenuArr[i].length; j++) {
                        if( handlCoord.left > spanMenuArr[i][j]['right'] 
                            || handlCoord.right < spanMenuArr[i][j]['left'] ) {
                        
                                $(spanMenuArr[i][j]).removeClass('white');
                        
                        }
                    }
                }
        }
        // highlight
        highlight = function (obj) {
            //$('span').removeClass('white');
            handlCoord = {
                "left"  : obj[0].getBoundingClientRect().left,
                "right" : obj[0].getBoundingClientRect().left + parseFloat(obj.width())
            };

            dragCalcCoord(handlCoord);
        }
    };

    setTimeout(
        function() {
            parseChar();
        }, 300);

    // dragg handle
    handle.draggable({
        axis: "x",
        containment: "parent",
        start: function() {
            $(this).addClass('no-transition');
            carouselRoom.addClass("no-transition");
            carouselRoomNav.find('li').removeClass('current');
            handle.width("80");
        },
        drag: function(event, ui) {
            if(ui.position.left > leftEnd) {
                ui.position.left = leftEnd;
                return;
            }
            carouselRoom.css({
                "margin-left" : "-" + (ui.position.left * ratio) + "px"
            });

            highlight($(this));
        },
        stop: function(event, ui) {
            if(ui.position.left > leftEnd) {
                $(this).css({
                    'left' : leftEnd
                });
            }
            $(this).removeClass('no-transition');
            carouselRoom.removeClass("no-transition");
        }
    });
    // =========== END

    // =========== START
    //click on arrow
    function moveNext(speed) {
        handle.width('80');
        carouselRoomNav.find('li').removeClass('current');
        if(parseFloat(handle.css('left')) <= (leftEnd - speed)) {
            handle.css({
                "left": "+=" + speed + "px"
            });

            carouselRoom.css({
                "margin-left" : "-" + (parseFloat(handle.css("left")) * ratio) + "px"
            });
        } else {
            handle.css({
                "left": leftEnd + "px"
            });

            carouselRoom.css({
                "margin-left" : "-" + (parseFloat(handle.css("left")) * ratio) + "px"
            });
        }
    };
    function movePrev(speed) {
        handle.width("80");
        carouselRoomNav.find('li').removeClass('current');
        if(parseFloat(handle.css("left")) >= speed) {
            handle.css({
                "left": "-=" + speed + "px"
            });

            carouselRoom.css({
                "margin-left" : "-" + (parseFloat(handle.css("left")) * ratio) + "px"
            });

        } else {
            handle.css({
                "left": "0px"
            });

            carouselRoom.css({
                "margin-left" : "-" + (parseFloat(handle.css("left")) * ratio) + "px"
            });
        }
    };
    function arrowPress(direction, speed) {
        handle.addClass("no-transition");
        carouselRoom.addClass("no-transition");
        mouseDownInterval = setInterval(function() {
            direction(speed);
            highlight(handle);
        }, 10);
        // setTimeout(
        //     function() {
        //         highlight(handle)
        //     }, 1);
    };
    function arrowUnpress() {
        clearInterval(mouseDownInterval);
        handle.removeClass("no-transition");
        carouselRoom.removeClass("no-transition");
        setTimeout(
            function() {
                highlight(handle)
            }, 15);
    };

    next.on('mousedown', function(e) {
        arrowPress(moveNext, 10);
    });
    next.on('mouseup mouseout', function() {
        arrowUnpress();
    });
    prev.on('mousedown', function() {
        arrowPress(movePrev, 10);
    });
    prev.on('mouseup mouseout', function() {
        arrowUnpress();
    });
    // =========== END

    // =========== START
    // click on carousel rectangle
    startGroup = function(itemRoomsGroup) {
        if(itemRoomsGroup) {
            handle.css({
                'width' : '110px'
            });
            carouselRoom.css({
                "margin-left" : 0
            });
            itemRooms.addClass('current');
        }
    }(itemRoomsGroup);

    carouselRoomNav.on('mousedown', function(event) {
        var event = event || window.event;
        target = event.srcElement || event.target;
        handleBoardCoords = handleBoard.getBoundingClientRect()
        
        if(target.id == 'handleBoard' ) {

            carouselRoomNav.find('span').removeClass('white');

            handle.width(80);

            carouselRoomNav.find('li').removeClass('current');

            setTimeout(
                function() {
                    highlight(handle)
                }, 200);

            var handleCoords = {
                left: event.clientX - handleBoard.getBoundingClientRect().left - 40 // 40 -> past of handle.width();
            };

            if(handleCoords.left < 0) {
                handleCoords.left = 0;
            } else if(handleCoords.left + handle[0].clientWidth > handleBoard.clientWidth) {
                if(handle[0].clientWidth > 80) {
                    if((handleBoard.clientWidth - (event.clientX - handleBoard.getBoundingClientRect().left)) <= 40) {
                        console.log();
                        handleCoords.left = handleBoard.clientWidth - 80;
                    }
                    
                } else {
                    handleCoords.left = handleBoard.clientWidth - handle[0].clientWidth;
                }
            }

            handle.css({
                'left' : handleCoords.left + 'px'
            });

            carouselRoom.css({
                "margin-left" : "-" + (handleCoords.left * ratio) + "px"
            });
        };

        if(target.id == "itemRooms" || $(target).parent().attr('id') == 'itemRooms') {

            carouselRoomNav.find('span').removeClass('white');

            handle.css({
                'width' : itemRooms.width() + padding,
                'left' : itemRooms[0].getBoundingClientRect().left - handleBoardCoords.left - (padding / 2)
            });

            carouselRoom.css({
                //"margin-left" : "-" + ((itemRooms[0].getBoundingClientRect().left - handleBoardCoords.left) * ratio) + "px"
                "margin-left" : 0
            });

            itemRooms.siblings('li').removeClass('current');
            setTimeout(function() {
                itemRooms.addClass('current');
            }, 200);
        } else if(target.id == "itemSuites" || $(target).parent().attr('id') == 'itemSuites') {

            carouselRoomNav.find('span').removeClass('white');

            handle.css({
                'width' : itemSuites.width() + padding + 'px',
                'left' : (itemSuites[0].getBoundingClientRect().left - handleBoardCoords.left) - (padding / 2) + 'px'
            });

            $('.carousel-room__list-inner').css({
                // 'margin-left' : '-' + ((itemSuites[0].getBoundingClientRect().left - handleBoardCoords.left) * ratio) + 'px'
                'margin-left' : '-911px'
            });

            itemSuites.siblings('li').removeClass('current');
            setTimeout(function() {
                itemSuites.addClass('current');
            }, 200);
        } else if(target.id == 'itemSignature' || $(target).parent().attr('id') == 'itemSignature') {

            carouselRoomNav.find('span').removeClass('white');

            handle.css({
                'width' : itemSignature.width() + padding + 'px',
                'left' : itemSignature[0].getBoundingClientRect().left - handleBoardCoords.left - (padding / 2) + 'px'
            });

            $('.carousel-room__list-inner').css({
                // "margin-left" : "-" + ((itemSignature[0].getBoundingClientRect().left - handleBoardCoords.left) * ratio) + "px"
                "margin-left" : '-1809px'
            });

            itemSignature.siblings('li').removeClass('current');
            setTimeout(function() {
                itemSignature.addClass('current');
            }, 200);
        }
    });
};