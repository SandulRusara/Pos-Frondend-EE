export class OrderDetailModel{
    constructor(order_id, item_id, qty) {
        this.orderId = order_id;
        this.itemId = item_id;
        this.qty = qty;
    }
}