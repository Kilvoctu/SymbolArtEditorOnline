var Editor = Class({
    initialize: function (parent, list) {
        this.zoom = 1;
        this.ZOOM_STEP = 0.4;
        this.ZOOM_MAX = 5;
        this.ZOOM_MIN = 1;

        this.list = list;

        //Create the renderer
        this.renderer = PIXI.autoDetectRenderer(1920, 960, { transparent: true });
        this.renderer.backgroundColor = 0xb8d1d6;

        //Create a container object called the `this.stage`
        this.stage = new PIXI.Container();
        this.layers = [];
        this.parts = [];

        this.parts[241] = new PIXI.Texture(new PIXI.BaseTexture(LoadedImageFiles["241.png"]));

        this.SABox = new PIXI.mesh.NineSlicePlane(new PIXI.Texture(new PIXI.BaseTexture(LoadedImageFiles["SABoxSprite.png"])), 2, 2, 2, 2);
        this.SABox.height = 960;
        this.SABox.width = 1920;
        this.stage.addChild(this.SABox);

        // Color Picker
        this.cPicker = $('<div id="colorSelector">');
        this.cPicker.append($('<div style="background-color: rgb(255, 255, 255);">'));
        this.cPicker.ColorPicker({
            color: '#ffffff',
            onShow: function (colpkr) {
                $(colpkr).fadeIn(100);
                $(this).ColorPickerSetColor($('#colorSelector')[0].selectedLayer.color.toString(16));
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(100);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $('#colorSelector div').css('backgroundColor', '#' + hex);
                changeColor(hsb, hex, rgb);
            }
        }).hide();
        function changeColor(hsb, hex, rgb) {
            var picker = $('#colorSelector')[0];
            var editor = picker.editor;
            picker.selectedLayer.color = parseInt('0x' + hex);
            editor.updateLayer(picker.selectedLayer);
            editor.render();
        }

        // Buttons
        var tl = $('<button class="ui-nodisc-icon ui-alt-icon ui-btn ui-shadow ui-corner-all ui-icon-arrow-u-l ui-btn-icon-notext ui-btn-inline editor-box-icon">');
        tl[0].list = list;
        tl.mousedown(function () {
            this.selected = true;
        }).mousemove(function () {
        }).mouseup(function () {
            this.selected = false;
        }).hide();
        var tr = $('<button class="ui-nodisc-icon ui-alt-icon ui-btn ui-shadow ui-corner-all ui-icon-arrow-u-r ui-btn-icon-notext ui-btn-inline editor-box-icon">');
        tr[0].list = list;
        tr.mousedown(function () {
            this.selected = true;
        }).mousemove(function () {
        }).mouseup(function () {
            this.selected = false;
        }).hide();
        var br = $('<button class="ui-nodisc-icon ui-alt-icon ui-btn ui-shadow ui-corner-all ui-icon-arrow-d-r ui-btn-icon-notext ui-btn-inline editor-box-icon">');
        br[0].list = list;
        br.mousedown(function () {
            this.selected = true;
        }).mousemove(function () {
        }).mouseup(function () {
            this.selected = false;
        }).hide();
        var bl = $('<button class="ui-nodisc-icon ui-alt-icon ui-btn ui-shadow ui-corner-all ui-icon-arrow-d-l ui-btn-icon-notext ui-btn-inline editor-box-icon">');
        bl[0].list = list;
        bl.mousedown(function () {
            this.selected = true;
        }).mousemove(function () {
        }).mouseup(function () {
            this.selected = false;
        }).hide();
        function changeVertices(that, ix, iy, clientPos) {
            var canvasPos = $('canvas').offset();
            var pos = { left: clientPos.left - canvasPos.left, top: clientPos.top - canvasPos.top };
            var layer = that.list.selectedElem.parentNode.elem;
            layer.vertices[ix] = Math.round((pos.left / that.list.editor.zoom) - layer.x);
            layer.vertices[iy] = Math.round((pos.top / that.list.editor.zoom) - layer.y);
            that.list.editor.updateLayer(layer);
            that.list.editor.render();
        }
        this.editorBoxIcons = {
            tl: tl,
            tr: tr,
            br: br,
            bl: bl
        };

        $('body').mousedown(function (e) {
            var buttons = $(this).find('button');
            if (!buttons.is(":visible")) return;
            if (buttons[0].selected) buttons[0].moving = true;
            else if (buttons[1].selected) buttons[1].moving = true;
            else if (buttons[2].selected) buttons[2].moving = true;
            else if (buttons[3].selected) buttons[3].moving = true;
        }).mousemove(function (e) {
            // Mouse Move for Button Control
            var buttons = $(this).find('button');
            if (!buttons.is(":visible")) return;
            if (buttons[0].moving) {
                var pos = {
                    left: Math.round(e.clientX),
                    top: Math.round(e.clientY)
                }
                $(buttons[0]).css({ top: (pos.top - 22.8), left: (pos.left - 14.8) });
                changeVertices(buttons[0], 0, 1, pos);
            }
            else if (buttons[1].moving) {
                var pos = {
                    left: Math.round(e.clientX),
                    top: Math.round(e.clientY)
                }
                $(buttons[1]).css({ top: (pos.top - 22.8), left: (pos.left - 54) });
                changeVertices(buttons[1], 2, 3, pos);
            }
            else if (buttons[2].moving) {
                var pos = {
                    left: Math.round(e.clientX),
                    top: Math.round(e.clientY)
                }
                $(buttons[2]).css({ top: (pos.top - 22.8), left: (pos.left - 93.2) });
                changeVertices(buttons[2], 6, 7, pos);
            }
            else if (buttons[3].moving) {
                var pos = {
                    left: Math.round(e.clientX),
                    top: Math.round(e.clientY)
                }
                $(buttons[3]).css({ top: (pos.top - 22.8), left: (pos.left - 132.4) });
                changeVertices(buttons[3], 4, 5, pos);
            }

            // Mouse move for Layer Control
            var elem = $('#layerCtrl')[0];
            if (elem.changing) {
                elem.editor.updateLayer(elem.layerCtrl.activeLayer);
                elem.editor.render();
                $(window.list.selectedElem).parent().trigger('mousedown'); // Update editor box
            }
        }).mouseup(function (e) {
            var buttons = $(this).find('button');
            if (!buttons.is(":visible")) return;
            buttons[0].moving = false;
            buttons[1].moving = false;
            buttons[2].moving = false;
            buttons[3].moving = false;
        })
        $(window).resize(function () {
            $(this.list.selectedElem).parent().trigger('mousedown'); // Update editor box
        });

        // Initialize Layer Control
        this.layerCtrl = new LayerCtrl();
        this.layerCtrl.hide();
        
        $(this.layerCtrl.gui.domElement)[0].editor = this;
        $(this.layerCtrl.gui.domElement).mousedown(function () {
            $('#layerCtrl')[0].changing = true;
        }).mouseup(function () {
            $('#layerCtrl')[0].changing = false;
        })


        $('body').append(this.cPicker);
        $('body').append(this.editorBoxIcons.tl);
        $('body').append(this.editorBoxIcons.tr);
        $('body').append(this.editorBoxIcons.br);
        $('body').append(this.editorBoxIcons.bl);
        //Add the canvas to the HTML document
        parent.appendChild(this.renderer.view);

        $('canvas')[0].editor = this;

        this.render();
    },
    resize: function (w, h) {
        this.renderer.resize(w, h);
    },
    render: function () {
        //Tell the `this.renderer` to `render` the `this.stage`
        this.renderer.render(this.stage);
    },
    incrSize: function () {
        if (this.zoom < this.ZOOM_MAX) {
            this.zoom += this.ZOOM_STEP;

            var scale = 'scale(' + this.zoom + ', ' + this.zoom + ')';
            $('canvas').css('transform', scale);

            $(this.list.selectedElem).parent().trigger('mousedown'); // Update editor box
        }
    },
    decrSize: function () {
        if (this.zoom > this.ZOOM_MIN) {
            this.zoom -= this.ZOOM_STEP;

            var scale = 'scale(' + this.zoom + ', ' + this.zoom + ')';
            $('canvas').css('transform', scale);

            $(this.list.selectedElem).parent().trigger('mousedown'); // Update editor box
        }
    },
    createLayer: function (layer) {
        
        var quad = new PIXI.mesh.Plane(
          this.parts[layer.part], 2, 2
        );
        quad.partNum = layer.part;
        quad.tint = layer.color;
        quad.x = layer.x;
        quad.y = layer.y;
        quad.scale.x = layer.scaleX;
        quad.scale.y = layer.scaleY;
        quad.rotation = layer.rotation;
        for (var i = 0; i < quad.vertices.length; i++) {
            if (i % 2) quad.vertices[i] -= quad.x;
            else quad.vertices[i] -= quad.y;
        }
        return quad;
    },
    addLayer: function (layer) {
        return this.addLayerAt(layer);
    },
    addLayerAt: function (layer, index) {
        var quad = this.createLayer(layer);
        var layerData = { layer: layer, quad: quad };
        if (index === undefined || index == this.stage.children.length) {
            this.stage.addChild(quad);
            this.layers.push(layerData);
        }
        else {
            this.stage.addChildAt(quad, this.stage.children.length - 1 - index);
            this.layers.splice(index, 0, layerData);
        }
        this.updateLayer(layer);
        quad.editor = this;
        quad.layerData = layerData;
        quad.interactive = false;
        quad.on('mousedown', function (evtData) {
            this.isMoving = true;
            this.origClickX = evtData.data.originalEvent.offsetX;
            this.origClickY = evtData.data.originalEvent.offsetY;
            this.origX = this.x;
            this.origY = this.y;
        });
        quad.on('mousemove', function (evtData) {
            if (this.isMoving) {
                this.layerData.layer;
                this.x = Math.round(evtData.data.originalEvent.offsetX - (this.origClickX - this.origX));
                this.y = Math.round(evtData.data.originalEvent.offsetY - (this.origClickY - this.origY));
                console.log(this.x + ', ' + this.y);
                this.editor.render();
                this.layerData.layer.update(this);
                $(this.editor.list.selectedElem).parent().trigger('mousedown'); // Update editor box
            }
        });
        quad.on('mouseup', function (evtData) {
            this.isMoving = false;
            delete this.origClickX;
            delete this.origClickY;
            delete this.origX;
            delete this.origY;
        });
        this.layerCtrl.update(layerData.layer);
        return layerData;
    },
    removeLayer: function (layer) {
        var index = findWithAttr(this.layers, 'layer', layer);
        if (index == -1) return;

        this.stage.removeChildAt(this.stage.children.length - 2 - index);
        var layerData = this.layers[index];
        this.layers.splice(index, 1);

        this.hideInterface();

        return layerData;

        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                var t = array[i][attr];
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
    },
    removeLayerAtTop: function () {
        this.stage.removeChildAt(0);
        var layerData = this.layers[0];
        this.layers.splice(0, 1);

        this.hideInterface();

        return layerData;
    },
    getLayerIndex: function (layer) {
        for (var i = 0; i < this.layers.length; i += 1) {
            var t = this.layers[i].layer;
            if (this.layers[i].layer === layer) {
                return i;
            }
        }
        return -1;
    },
    updateLayer: function (layer) {
        var i = findWithAttr(this.layers, 'layer', layer);
        if (i == -1) return;
        var quad = this.layers[i].quad;
        quad.tint = layer.color;
        quad.x = layer.x;
        quad.y = layer.y;
        quad.scale.x = layer.scaleX;
        quad.scale.y = layer.scaleY;
        quad.rotation = layer.rotation;
        for (var i = 0; i < layer.vertices.length; i++) {
            quad.vertices[i] = layer.vertices[i];
        }

        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                var t = array[i][attr];
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
    },
    enableInteraction: function (layer) {
        var quad = null;
        for (var i = 0; i < this.layers.length; i++) {
            if (quad == null && this.layers[i].layer == layer) {
                this.layers[i].quad.interactive = true;
                quad = this.layers[i].quad.interactive;
            }
            else {
                this.layers[i].quad.interactive = false;
            }
        }
    },
    disableInteraction: function (layer) {
        var quad = null;
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].quad.interactive = false;
        }
    },
    enableGroupInteraction: function (folder) {
        var canvas = $('canvas');

        canvas[0].movingFolder = folder;

        canvas.mousedown(function (e) {
            if ($('canvas')[0].list.selectedElem.parentNode.elem.type == 'g') {
                this.mouseMoving = true;
                this.prevPos = { x: e.clientX, y: e.clientY };
            }
        }).mousemove(function (e) {
            if (this.mouseMoving) {
                var canvas = $('canvas')[0];
                var list = canvas.list;
                var editor = canvas.editor;
                var lis = $(list.container).find('li');
                var lisInGroup = $(list.selectedElem.parentNode.parentNode).find('li');
                var firstIndex = lis.index(lisInGroup[0]);
                var lastIndex = firstIndex + lisInGroup.length;
                canvas.layersMoved = [];
                if(firstIndex == -1) return;
                var layer;
                for (var i = firstIndex; i < lastIndex; i++) {
                    layer = list.editor.layers[i].layer;
                    layer.x += e.clientX - this.prevPos.x;
                    layer.y += e.clientY - this.prevPos.y;
                    editor.updateLayer(layer);
                    canvas.layersMoved.push(layer);
                }
                editor.render();
            }
            this.prevPos = { x: e.clientX, y: e.clientY };
        }).mouseup(function (e) {
            this.mouseMoving = false;
        });
    },
    disableGroupInteraction: function () {
        var canvas = $('canvas');

        canvas[0].movingFolder = undefined;

        canvas.mousedown(undefined).mousemove(undefined).mouseup(undefined);
    },
    hideInterface: function () {
        this.layerCtrl.hide();
        this.editorBoxIcons.tl.hide();
        this.editorBoxIcons.tr.hide();
        this.editorBoxIcons.bl.hide();
        this.editorBoxIcons.br.hide();
        this.cPicker.hide();
    },
    showInterface: function () {
        this.layerCtrl.show();
        this.editorBoxIcons.tl.show();
        this.editorBoxIcons.tr.show();
        this.editorBoxIcons.bl.show();
        this.editorBoxIcons.br.show();
        this.cPicker.show();
    }
});