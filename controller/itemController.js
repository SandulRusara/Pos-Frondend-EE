import { ItemModel } from "../model/itemModel.js";
import { setItemCount } from "./indexController.js";
import { setItemIds } from "./orderController.js";

//item form
const item_Code = $('#itemCode');
const description = $('#description');
const unit_price = $('#unitPrice');
const qty = $('#qty');
const item_btns = $('#item_btn button');

const url = '';

//add item
item_btns.eq(0).on('click', () => {
    let itemCode = item_Code.val().trim();
    let desc = description.val().trim();
    let price = parseFloat(unit_price.val().trim());
    let qty_val = parseInt(qty.val());

    const ItemDTO = {
        itemId: itemCode,
        description: desc,
        unitPrice: price,
        qty: qty_val

    }

    console.log(ItemDTO);

    //     create JSON
    const itemDTOJson = JSON.stringify(ItemDTO);
    console.log(itemDTOJson);

    //save the data with ajax
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        //check state
        if (http.readyState === 4) {
            if (http.status === 200) {
                var jsonTypeResponse = JSON.stringify(http.responseText);
                console.log(jsonTypeResponse);
            } else {
                console.error("Failed");
                console.error("Status Received", http.status);
                console.error("Processing Stage", http.readyState);
            }
        } else {
            console.log("Processing stage", http.readyState);
        }
    }

    http.open("POST", "http://localhost:8081/Pos_Backend_EE_war_exploded/item", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(itemDTOJson);


});

//update item
item_btns.eq(1).on('click', () => {
    let itemCode = item_Code.val().trim();
    let desc = description.val().trim();
    let price = parseFloat(unit_price.val().trim());
    let qty_val = parseInt(qty.val());

    const ItemDTO = {
        itemId: itemCode,
        description: desc,
        unitPrice: price,
        qty: qty_val

    }
    console.log(ItemDTO);

    //     create JSON
    const itemDTOJson = JSON.stringify(ItemDTO);
    console.log(itemDTOJson);

    //save the data with ajax
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        //check state
        if (http.readyState === 4) {
            if (http.status === 200) {
                var jsonTypeResponse = JSON.stringify(http.responseText);
                console.log(jsonTypeResponse);
            } else {
                console.error("Failed");
                console.error("Status Received", http.status);
                console.error("Processing Stage", http.readyState);
            }
        } else {
            console.log("Processing stage", http.readyState);
        }
    }

    http.open("PUT", "http://localhost:8081/Pos_Backend_EE_war_exploded/item", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(itemDTOJson);


});

//delete item
item_btns.eq(2).on('click', () => {
    let itemCode = item_Code.val().trim();
    let desc = description.val().trim();
    let price = parseFloat(unit_price.val().trim());
    let qty_val = parseInt(qty.val());

    const ItemDTO = {
        itemId: itemCode,
        description: desc,
        unitPrice: price,
        qty: qty_val

    }
    console.log(ItemDTO);
    //     create JSON
    const itemDTOJson = JSON.stringify(ItemDTO);
    console.log(itemDTOJson);

    //save the data with ajax
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        //check state
        if (http.readyState === 4) {
            if (http.status === 200) {
                var jsonTypeResponse = JSON.stringify(http.responseText);
                console.log(jsonTypeResponse);
            } else {
                console.error("Failed");
                console.error("Status Received", http.status);
                console.error("Processing Stage", http.readyState);
            }
        } else {
            console.log("Processing stage", http.readyState);
        }
    }

    http.open("DELETE", "http://localhost:8081/Pos_Backend_EE_war_exploded/item", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(itemDTOJson);


});

//load item
$('tbody').eq(1).on('click', 'tr', function () {
    item_Code.val($(this).find('th').eq(0).text());
    description.val($(this).find('td').eq(0).text());
    unit_price.val($(this).find('td').eq(1).text());
    qty.val($(this).find('td').eq(2).text());
});

//load the item table
export const loadItemTable = function () {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            $('tbody').eq(1).empty();
            data.forEach(item => {
                $('tbody').eq(1).append(
                    `<tr>
                    <th scope="row">${item.itemId}</th>
                    <td>${item.description}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.qty}</td>
                    </tr>`
                );
            });
            setItemCount(data.length);
            setItemIds(data);
        },
        error: function (err) {
            Swal.fire('Something went wrong', '', 'info')
        }
    });
}

loadItemTable();

function validate(value, field_name) {
    if (!value) {
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}

