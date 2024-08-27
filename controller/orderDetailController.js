import { setOrderCount } from "./indexController.js"

const order_id = $('#order_detail_id');
const customer_id = $('#order_detail_customer_id');
const date = $('#order_details_date');
const discount = $('#order_details_discount');

const url = '/order';
const url2 = '/orderDetails';
const url3 = '/item';


$('tbody').eq(3).on('click', 'tr', function () {
    let orderId = $(this).find('th').eq(0).text();
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            data.forEach((order) => {
                if (orderId === order.orderId) {
                    order_id.val(order.orderId);
                    customer_id.val(order.customerId);
                    date.val(order.date);
                    discount.val(order.discount);
                    loadOrderDetails(order)
                }
            })

        },
        error: function (err) {
            Swal.fire('Something went wrong', '', 'info')
        }
    });
});

function loadOrderDetails(order) {

    console.log(order)
    $('tbody').eq(4).empty();

    $.ajax({
        type: 'GET',
        url: url2,
        success: function (data) {
            data.forEach((orderDetail) => {
                if(orderDetail.orderId === order.orderId){
                    $.ajax({
                        type: 'GET',
                        url: url3,
                        success: function (data) {
                            data.forEach((item) => {
                                if (item.itemId === orderDetail.itemId) {
                                    let total = item.unitPrice * orderDetail.qty;

                                    $('tbody').eq(4).append(
                                        `<tr>
                                            <th scope="row">${item.itemId}</th>
                                            <td>${item.description}</td>
                                            <td>${item.unitPrice}</td>
                                            <td>${item.qty}</td>
                                            <td>${total}</td>
                                        </tr>`
                                    );
                                }
                            })

                        },
                        error: function (err) {
                            Swal.fire('Something went wrong', '', 'info')
                        }
                    });
                }

            })

        },
        error: function (err) {
            Swal.fire('Something went wrong', '', 'info')
        }
    });


}

export function loadOrderTable() {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            $('tbody').eq(3).empty();
            data.forEach(order => {
                $('tbody').eq(3).append(
                    `<tr>
                        <th scope="row">${order.orderId}</th>
                        <td>${order.customerId}</td>
                        <td>${order.date}</td>
                        <td>Rs. ${order.total}</td>
                     </tr>`
                )
            });
            setOrderCount(data.length);
        },
        error: function (err) {
            Swal.fire('Something went wrong', '', 'info')
        }
    });
}

loadOrderTable();
