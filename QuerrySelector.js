var QuerrySelector = /** @class */ (function () {
    function QuerrySelector(list) {
        this.list = list;
    }
    QuerrySelector.prototype.innerText = function (text) {
        if (text === void 0) { text = undefined; }
        if (text != undefined) {
            this.list.forEach(function (element) {
                element.innerText = text;
            });
        }
        return (this.list[0]) ? (this.list[0]).innerText : undefined;
    };
    QuerrySelector.prototype.innerHTML = function (html) {
        if (html === void 0) { html = undefined; }
        if (typeof html === 'function') {
            var stringHtml_1 = html("");
            this.list.forEach(function (element) {
                element.innerHTML = stringHtml_1;
            });
            return stringHtml_1;
        }
        else if (typeof html === 'string') {
            this.list.forEach(function (element) {
                element.innerHTML = html;
            });
            return html;
        }
        else {
            return this.list[0] ? this.list[0].innerHTML : undefined;
        }
    };
    QuerrySelector.prototype.remove = function () {
        this.list.forEach(function (element) {
            element.remove();
        });
    };
    QuerrySelector.prototype.attr = function (atribute, val) {
        if (val === void 0) { val = undefined; }
        if (val != undefined && this.list[0][atribute])
            this.list[0][atribute] = val;
        return this.list[0][atribute] ? this.list[0][atribute] : undefined;
    };
    QuerrySelector.prototype.val = function (val) {
        if (val === void 0) { val = undefined; }
        return this.attr("value", val);
    };
    QuerrySelector.prototype.data = function (data, valor) {
        if (valor === void 0) { valor = undefined; }
        if (valor != undefined && this.list[0])
            this.list[0].setAttribute("data-" + data, valor);
        return this.list[0].getAttribute("data-" + data);
    };
    QuerrySelector.prototype.setStyle = function (atribute, value) {
        this.list.forEach(function (element) {
            element.style[atribute] = value;
        });
    };
    QuerrySelector.prototype.addClass = function (classString) {
        this.list.forEach(function (element) {
            element.classList.add(classString);
        });
    };
    QuerrySelector.prototype.removeClass = function (classString) {
        this.list.forEach(function (element) {
            element.classList.remove(classString);
        });
    };
    QuerrySelector.prototype.count = function () {
        return this.list.length;
    };
    // Event listeners
    QuerrySelector.prototype.el = function (type, listener) {
        this.list.forEach(function (element) {
            element.addEventListener(type, function (event) {
                listener(event, new QuerrySelector(QuerrySelector.toNodeList(element)));
            });
        });
    };
    QuerrySelector.prototype.fe = function (type) {
        this.list.forEach(function (element) {
            element.dispatchEvent(new Event(type));
        });
    };
    QuerrySelector.prototype.onClick = function (listener) {
        this.el("click", listener);
    };
    QuerrySelector.prototype.click = function () {
        this.fe("click");
    };
    QuerrySelector.prototype.onSubmit = function (listener) {
        this.el("submit", listener);
    };
    QuerrySelector.prototype.submit = function () {
        this.fe("submit");
    };
    QuerrySelector.prototype.onMouseOver = function (listener) {
        this.el("mouseOver", listener);
    };
    QuerrySelector.prototype.mouseOver = function () {
        this.fe("mouseOver");
    };
    // Static function that gets a function as parameter and will be called when the DOM is loaded
    QuerrySelector.ready = function (functionReady) {
        document.addEventListener("DOMContentLoaded", function (event) {
            functionReady(event);
        });
    };
    QuerrySelector.qs = function (filter, func) {
        if (func === void 0) { func = null; }
        var list = document.querySelectorAll(filter);
        if (typeof func === 'function') {
            list.forEach(function (element) {
                func(new QuerrySelector(QuerrySelector.toNodeList(element)));
            });
        }
        return new QuerrySelector(list);
    };
    QuerrySelector.toNodeList = function (elm) {
        var list;
        elm.setAttribute('wrapNodeList', '');
        list = document.querySelectorAll('[wrapNodeList]');
        elm.removeAttribute('wrapNodeList');
        return list;
    };
    return QuerrySelector;
}());
var qs = QuerrySelector.qs;
