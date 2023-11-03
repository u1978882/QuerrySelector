class QuerrySelector {

    private list: NodeListOf<Element>;

    public constructor(list:NodeListOf<Element>) {
        this.list = list;
    }

    public firstElement() {
        return this.list[0];
    }

    public innerText(text:string | undefined = undefined) : string {
        if (text != undefined){
            this.list.forEach(element => {
                (<HTMLElement>element).innerText = text
            });
        }
        return (<HTMLElement>(this.list[0])) ? (<HTMLElement>(this.list[0])).innerText : undefined
    }

    public innerHTML(html:any = undefined) : string {
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

    public remove() : void {
        this.list.forEach(element => {
            element.remove();
        });
    }
    
    public attr(atribute: string, val:string | undefined = undefined) : any {
        if (val != undefined && this.list[0])
            this.list[0][atribute] = val;
        return this.list[0][atribute] ? this.list[0][atribute] : false
    }

    public value(val:string | undefined = undefined) : any {
        return this.attr("value", val)
    }

    public data(data: string, valor:string | undefined = undefined) : string{
        if (valor != undefined && this.list[0])
            this.list[0].setAttribute("data-"+data, valor)
        return this.list[0].getAttribute("data-"+data)
    }

    public setStyle(atribute: string, value: string) : void {
        this.list.forEach(element => {
            (<HTMLElement>element).style[atribute] = value;
        });
    }

    public addClass(classString: string) : void {
        this.list.forEach(element => {
            element.classList.add(classString);
        });
    }

    public removeClass(classString: string) : void {
        this.list.forEach(element => {
            element.classList.remove(classString);
        });
    }
    
    public replaceClass(classStringReplace: string, classStringEnter: string) : void {
        this.list.forEach(element => {
            element.classList.replace(classStringReplace, classStringEnter);
        });
    }

    public count() : number{
        return this.list.length;
    }
    
    public isVisible() : boolean {
        return (window.getComputedStyle((<HTMLElement>this.list[0])).display) != 'none';
    }


    // Event listeners

    public el(type:string, listener:Function, preventDefaults: boolean = false) : void {
        this.list.forEach(element => {
            element.addEventListener(type, function(event){
                if (preventDefaults)
                    event.preventDefault();
                listener(event, new QuerrySelector(QuerrySelector.toNodeList(element)));
            })
        });
    }

    public fe(type:string) : void {
        this.list.forEach(element => {
            (<HTMLElement>element).dispatchEvent(new Event(type));
        });
    }

    public onClick(listener:Function, preventDefaults: boolean = false) : void {
        this.el("click", listener, preventDefaults);
    }

    public click() : void {
        this.fe("click");
    }
    
    public onChange(listener:Function, preventDefaults: boolean = false) : void {
        this.el("change", listener, preventDefaults);
    }

    public change() : void {
        this.fe("change");
    }

    public onSubmit(listener:Function, preventDefaults: boolean = false) : void {
        this.el("submit", listener, preventDefaults);
    }

    public submit() : void {
        this.fe("submit");
    }

    public onMouseOver(listener : Function, preventDefaults : boolean = false) : void {
        this.el("mouseOver", listener, preventDefaults);
    }

    public mouseOver() : void {
        this.fe("mouseOver");
    }
    
    public onChangeVisibility(callback : Function) : void {
        if (this.list[0]){
            let selector : QuerrySelector = this;
            new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0) {
                        callback(selector);
                        observer.disconnect();
                    }
                });
            }).observe(this.list[0]);
        }
    }


    // Static function that gets a function as parameter and will be called when the DOM is loaded
    public static ready(functionReady:Function) : void{
        document.addEventListener("DOMContentLoaded", function(event) {
            functionReady(event);
        });
    }

    public static qs(filter:string, func:any = null) : QuerrySelector{
        const list = document.querySelectorAll(filter); 
        if (typeof func === 'function') {
            list.forEach(element => {
                func(new QuerrySelector(QuerrySelector.toNodeList(element)))
            });
        }
    
        return new QuerrySelector(list);
    }
    
    private static toNodeList(elm: Element) : NodeListOf<Element>{
        let li : NodeListOf<Element>;
        elm.setAttribute('wrapNodeList','');
        li = document.querySelectorAll('[wrapNodeList]');
        elm.removeAttribute('wrapNodeList');
        return li;
    }

}

let qs = QuerrySelector.qs;




