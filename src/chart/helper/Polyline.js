/**
 * @module echarts/chart/helper/Line
 */
define(function (require) {

    var graphic = require('../../util/graphic');
    var zrUtil = require('zrender/core/util');
    var numberUtil = require('../../util/number');

    /**
     * @constructor
     * @extends {module:zrender/graphic/Group}
     * @alias {module:echarts/chart/helper/Polyline}
     */
    function Polyline(lineData, idx) {
        graphic.Group.call(this);

        this._createPolyline(lineData, idx);
    }

    var polylineProto = Polyline.prototype;

    polylineProto._createPolyline = function (lineData, idx) {
        // var seriesModel = lineData.hostModel;
        var points = lineData.getItemLayout(idx);

        var line = new graphic.Polyline({
            shape: {
                points: points
            }
        });

        this.add(line);

        this._updateCommonStl(lineData, idx);
    };

    polylineProto.updateData = function (lineData, idx) {
        var seriesModel = lineData.hostModel;

        var line = this.childAt(0);
        var target = {
            shape: {
                points: lineData.getItemLayout(idx)
            }
        };
        graphic.updateProps(line, target, seriesModel, idx);

        this._updateCommonStl(lineData, idx);
    };

    polylineProto._updateCommonStl = function (lineData, idx) {
        var line = this.childAt(0);
        var itemModel = lineData.getItemModel(idx);

        var visualColor = lineData.getItemVisual(idx, 'color');

        line.useStyle(zrUtil.defaults(
            {
                strokeNoScale: true,
                fill: 'none',
                stroke: visualColor
            },
            itemModel.getModel('lineStyle.normal').getLineStyle()
        ));
        line.hoverStyle = itemModel.getModel('lineStyle.emphasis').getLineStyle();

        graphic.setHoverStyle(this);
    };

    polylineProto.updateLayout = function (lineData, idx) {
        var polyline = this.childAt(0);
        polyline.setShape('points', lineData.getItemLayout(idx));
    };

    zrUtil.inherits(Polyline, graphic.Group);

    return Polyline;
});