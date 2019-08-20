"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var React = require("react");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(state) {
        var _this = _super.call(this, state) || this;
        _this.state = { items: null, myOrder: null, showPopup: false, userId: 0, orderPlaced: false };
        _this.placeOrder = _this.placeOrder.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);
        return _this;
    }
    Popup.prototype.placeOrder = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('post', "/data/PlaceOrder/" + this.props.userId, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.props.handlerFromParent(false, true);
            }
        }.bind(this);
        xhr.send(JSON.stringify(this.props.myOrder));
    };
    Popup.prototype.closePopup = function () {
        this.props.handlerFromParent(false, false);
    };
    Popup.prototype.render = function () {
        var total = 0;
        var totalMsg = '';
        var myCart = this.props.myOrder || [];
        var myItems = myCart.map(function (menu) {
            total += menu.Price * menu.Quantity;
            return (React.createElement("div", { key: menu.Id },
                menu.Name,
                ", Qty: ",
                menu.Quantity));
        }, this);
        return (React.createElement("div", { className: 'popup' },
            React.createElement("div", { className: 'popup_inner' },
                React.createElement("div", { style: { height: '35px', fontSize: '18' } },
                    React.createElement("b", null, "Order from Foodie Miracles"),
                    " multi-cusine restautrant",
                    React.createElement("hr", null)),
                React.createElement("div", { className: 'foodList' }, myItems),
                React.createElement("div", { style: { height: '35px' } },
                    React.createElement("hr", null),
                    "Total = $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { style: { height: '25px' } }, "Tax = 0"),
                React.createElement("div", { className: 'grandSum' },
                    "Grand Total: $",
                    (Math.round(total * 100) / 100).toFixed(2)),
                React.createElement("div", { className: 'payment' }, "Payment:  [Cedit Card on file will be Charged!]"),
                React.createElement("div", { style: { height: '20px' } }, "Deliver to: [address on file]"),
                React.createElement("div", { className: 'delivEstimate' }, "Delivery estimates: 20 - 40 minutes"),
                React.createElement("div", { style: { bottom: '11px' } },
                    React.createElement("button", { className: "greenBtn a_left", onClick: this.placeOrder }, "Submit Order"),
                    React.createElement("button", { className: "greenBtn a_right", onClick: this.closePopup }, "Back")))));
    };
    return Popup;
}(React.Component));
exports.Popup = Popup;
//# sourceMappingURL=Popup.js.map