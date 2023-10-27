class QuerrySelector {

    private list: NodeListOf<Element>;

    constructor(list:NodeListOf<Element>) {
        this.list = list;
    }

    innerText(text:string | undefined = undefined) {
        if (text != undefined){
            this.list.forEach(element => {
                (<HTMLElement>element).innerText = text
            });
        }
        return (<HTMLElement>(this.list[0])) ? (<HTMLElement>(this.list[0])).innerText : undefined
    }

    innerHTML(html:any = undefined) {
        if (typeof html === 'function'){
            let stringHtml:string = html("");
            this.list.forEach(element => {
                element.innerHTML = stringHtml;
            });
            return stringHtml;
        }else if (typeof html === 'string'){
            this.list.forEach(element => {
                element.innerHTML = html;
            });
            return html;
        }else{
            return this.list[0] ? this.list[0].innerHTML : undefined
        }
    }

    remove() {
        this.list.forEach(element => {
            element.remove();
        });
    }
    
    attr(atribute: string, val:string | undefined = undefined) {
        if (val != undefined && this.list[0][atribute])
            this.list[0][atribute] = val;
        return this.list[0][atribute] ? this.list[0][atribute] : undefined
    }

    val(val:string | undefined = undefined) {
        return this.attr("value", val)
    }

    data(data: string, valor:string | undefined = undefined){
        if (valor != undefined && this.list[0])
            this.list[0].setAttribute("data-"+data, valor)
        return this.list[0].getAttribute("data-"+data)
    }

    setStyle(atribute: string, value: string) {
        this.list.forEach(element => {
            (<HTMLElement>element).style[atribute] = value;
        });
    }

    addClass(classString: string) {
        this.list.forEach(element => {
            element.classList.add(classString);
        });
    }

    removeClass(classString: string) {
        this.list.forEach(element => {
            element.classList.remove(classString);
        });
    }

    count(){
        return this.list.length;
    }


    // Event listeners

    el(type:string, listener:Function, preventDefaults: boolean = false) {
        this.list.forEach(element => {
            element.addEventListener(type, function(event){
                if (preventDefaults)
                    event.preventDefault();
                listener(event, new QuerrySelector(QuerrySelector.toNodeList(element)));
            })
        });
    }

    fe(type:string) {
        this.list.forEach(element => {
            (<HTMLElement>element).dispatchEvent(new Event(type));
        });
    }

    onClick(listener:Function, preventDefaults: boolean = false) {
        this.el("click", listener, preventDefaults);
    }

    click() {
        this.fe("click");
    }

    onSubmit(listener:Function, preventDefaults: boolean = false) {
        this.el("submit", listener, preventDefaults);
    }

    submit() {
        this.fe("submit");
    }

    onMouseOver(listener:Function, preventDefaults: boolean = false) {
        this.el("mouseOver", listener, preventDefaults);
    }

    mouseOver() {
        this.fe("mouseOver");
    }


    // Static function that gets a function as parameter and will be called when the DOM is loaded
    static ready(functionReady:Function){
        document.addEventListener("DOMContentLoaded", function(event) {
            functionReady(event);
        });
    }

    static qs(filter:string, func:any = null){
        const list = document.querySelectorAll(filter); 
        if (typeof func === 'function') {
            list.forEach(element => {
                func(new QuerrySelector(QuerrySelector.toNodeList(element)))
            });
        }
    
        return new QuerrySelector(list);
    }
    
    static toNodeList(elm: Element){
        var list;
        elm.setAttribute('wrapNodeList','');
        list = document.querySelectorAll('[wrapNodeList]');
        elm.removeAttribute('wrapNodeList');
        return list;
    }

}

let qs = QuerrySelector.qs;




