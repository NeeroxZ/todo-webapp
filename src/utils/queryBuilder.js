


export class QueryBuilder {
    constructor() {
        this.query = ""
        this._searchKey = "$%$%";
        this._isInit = false;
        this.valueStore = [];
    }

    Part(key, operator, value) {
        if (!this._isInit) {
            this._isInit = true;
        }

        this._addToQuery(`${key}${operator}${this._searchKey}`);
        this.valueStore.push(value)
        return this;
    }

    And(key, operator, value) {
        if (!this._checkQuery()) {
            this._addToQuery(`${key}${operator}${this._searchKey}`)
        } else {
            this.Space()._addToQuery(`&& ${key}${operator}${this._searchKey}`)
        }
        this.valueStore.push(value)
        console.log(this.valueStore);
        return this;
    }

    Or(key, operator, value) {
        if (!this._checkQuery()) {
            this._addToQuery(`${key}${operator}${this._searchKey}`);
        } else {
            this.Space()._addToQuery(`|| ${key}${operator}${this._searchKey}`);
        }
        this.valueStore.push(value)
        return this;
    }

    Space() {
        this.query += " ";
        return this;
    }

    OpenBracket(prefix = "") {
        if (prefix !== "") {
            this._addToQuery(`${prefix} (`);
        } else {
            this._addToQuery("(");
        }
        return this;
    }

    CloseBracket() {
        // this.query += ")";
        this._addToQuery(")");
        console.log(this.query)
        return this;
    }

    ShowQuery() {
        return this.query;
    }

    Export() {
        // exceptions
        if (!this._isInit) throw new Error("nothing to export");
        if (!this.checkBrackets()) throw new Error("there are some open brackets");

        let start, stop, i;
        start = stop = i = 0;
        let str = "";
        while (start < this.query.length) {
            if (i >= this.valueStore.length) {
                console.log()
                str += this.query.slice(stop, this.query.length);
                break;
            }
            stop = this.query.indexOf(this._searchKey, start);

            // append string prebuild
            str += this.query.slice(start, stop);

            // append variable
            if (typeof this.valueStore[i] === "string") {
                str += `"${this.valueStore[i]}"`;
            } else {
                str += this.valueStore[i];
            }
            stop += this._searchKey.length;
            start = stop;
            i++;
        }

        return str;
    }

    _addToQuery(part) {
        if (!this._isInit) throw new Error("can't add to query - start statement with Part()");
        if (!this._checkLastChar()) {
            this.Space();
        }
        this.query += part;
    }

    checkBrackets() {
        let open = ("(".match(/is/g) || []).length;
        let close = (")".match(/is/g) || []).length;
        return open === close;
    }

    _checkQuery() {
        return this.query !== "";
    }

    _checkLastChar() {
        console.log(this.query);
        switch (this.query[this.query - 1]) {
            case " ":
                return true;
            case undefined:
                return true;
            case "(":
                return true;
            default:
                return false;
        }
    };
}