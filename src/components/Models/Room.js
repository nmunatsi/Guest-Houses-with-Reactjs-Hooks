export default class Room{

    constructor(roomNo,houseId,maxPerson,price,roomType,roomStatus,hasSingleUse) {
        this._roomNo = roomNo;
        this._houseId = houseId;
        this._maxPerson = maxPerson;
        this._price = price;
        this._roomType = roomType;
        this._roomStatus = roomStatus;
        this._hasSingleUse = hasSingleUse;

    }

    get roomNo() {
        return this._roomNo;
    }

    set roomNo(value) {
        this._roomNo = value;
    }

    get houseId() {
        return this._houseId;
    }

    set houseId(value) {
        this._houseId = value;
    }

    get maxPerson() {
        return this._maxPerson;
    }

    set maxPerson(value) {
        this._maxPerson = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get roomType() {
        return this._roomType;
    }

    set roomType(value) {
        this._roomType = value;
    }

    get roomStatus() {
        return this._roomStatus;
    }

    set roomStatus(value) {
        this._roomStatus = value;
    }

    get hasSingleUse() {
        return this._hasSingleUse;
    }

    set hasSingleUse(value) {
        this._hasSingleUse = value;
    }
}

