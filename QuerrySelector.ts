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

    el(type:string, listener:Function) {
        this.list.forEach(element => {
            element.addEventListener(type, function(event){
                listener(event);
            })
        });
    }

    fe(type:string) {
        this.list.forEach(element => {
            (<HTMLElement>element).dispatchEvent(new Event(type));
        });
    }

    onClick(listener:Function) {
        this.el("click", listener);
    }

    click() {
        this.fe("click");
    }

    onSubmit(listener:Function) {
        this.el("submit", listener);
    }

    submit() {
        this.fe("submit");
    }


    // Static function that gets a function that will be called when the DOM is loaded
    static ready(functionReady:Function){
        document.addEventListener("DOMContentLoaded", function(event) {
            functionReady(event);
        });
    }

}


function qs(filter:string, func:any = null){
    const list = document.querySelectorAll(filter); 
    if (typeof func === 'function') {
        list.forEach(element => {
            func(element)
        });
    }

    return new QuerrySelector(list);
}

