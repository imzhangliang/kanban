
class Items {

    #parentDom = null;
    #items = [];
    #html = '';
    #selection = new Set();
    #onSave = () => {};

    constructor(parentDom, initItems = [], onSave = () => {}) {
        this.#items = [...initItems];
        this.setParentDom(parentDom);
        this.#onSave = onSave;
    }

    render() {
        this.#html = `<ul>
            ${this.#items.map((item, index) => `<li><input name="item${index}" type="checkbox" />${item}<div style="display: none; padding-left: 5px;" class="control")><button class="up">^</button><button class="down">v</button></div></li>`).join(" ")}
        </ul>`;
        const container = document.createElement('div');
        container.innerHTML = this.#html;
        this.#parentDom.innerHTML = "";
        this.#parentDom.appendChild(container);
        let checkboxs = container.querySelectorAll('input[type="checkbox"]');
        for (let checkbox of checkboxs) {
            let checkboxId = parseInt(checkbox.name.split('item')[1]);
            let selection = this.#selection;
            
            if (this.#selection.has(checkboxId)) {
                checkbox.checked = true;
                checkbox.parentElement.querySelector(".control").style.display = "inline";
            }

            checkbox.addEventListener("change", function() {
                if (this.checked) {
                    selection.add(checkboxId);
                    this.parentElement.querySelector(".control").style.display = "inline";
                } else {
                    selection.delete(checkboxId);
                    this.parentElement.querySelector(".control").style.display = "none";
                }
            });


            checkbox.parentElement.querySelector(".up").addEventListener("click", () => {
                this.upRow(checkboxId);
            });

            checkbox.parentElement.querySelector(".down").addEventListener("click", () => {
                this.downRow(checkboxId);
            });
        }

        this.#onSave(this.#items);
    }

    setParentDom(parentDom) {
        this.#parentDom = parentDom;
        this.render();
    }

    removeSelectItems() {
        let selectIndices = [...this.#selection];
        selectIndices.sort();


        let removedItems = this.#items.filter((item, index) => this.#selection.has(index));
        this.#items = this.#items.filter((item, index) => !this.#selection.has(index));
        this.#selection = new Set();

        this.render();

        return removedItems;
    }

    appendItems(items) {
        let addItems = Array.isArray(items) ? items : [ items ];
        console.log("appendItems", items, addItems);
        for (let item of addItems) {
            this.#items.push(item);
        }
        this.render();
    }

    appendItem(item) {
        let addItems = Array.isArray(item) ? item : [ item ];
        this.appendItems(addItems)
    }

    upRow(index) {
        if (index <= 0 || index >= this.#items.length) {
            return ;
        }

        this.swap(index, index - 1);
        this.render();
    }

    downRow(index) {
        if (index < 0 || index >= this.#items.length - 1) {
            return ;
        }

        this.swap(index, index + 1);
        this.render();
    }

    swap(index1, index2) {
        if (index1 == index2 || index1 < 0 || index1 >= this.#items.length ||
            index2 < 0 || index2 >= this.#items.length) {
            return ;
        }

        let tmp = this.#items[index1];
        this.#items[index1] = this.#items[index2];
        this.#items[index2] = tmp;

        let selectIndex1 = this.#selection.has(index1);
        let selectIndex2 = this.#selection.has(index2);

        selectIndex1 ? this.#selection.add(index2) : this.#selection.delete(index2);
        selectIndex2 ? this.#selection.add(index1) : this.#selection.delete(index1);
    }

}

export default Items;
