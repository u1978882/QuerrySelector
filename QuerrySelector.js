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
                listener(event);
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
    // Static function that gets a function that will be called when the DOM is loaded
    QuerrySelector.ready = function (functionReady) {
        document.addEventListener("DOMContentLoaded", function (event) {
            functionReady(event);
        });
    };
    return QuerrySelector;
}());
function qs(filter, func) {
    if (func === void 0) { func = null; }
    var list = document.querySelectorAll(filter);
    if (typeof func === 'function') {
        list.forEach(function (element) {
            func(element);
        });
    }
    return new QuerrySelector(list);
}
