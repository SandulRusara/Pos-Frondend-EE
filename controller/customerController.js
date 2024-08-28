import { CustomerModel } from "../model/customerModel.js";
import { setCustomerCount } from "./indexController.js";
import { setCustomerIds } from "./orderController.js"

//customer form
const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');
const contact = $('#contact');
const customer_btn = $('#customer_btn button');
console.log(customer_Id,full_name,address,contact)


const url = 'http://localhost:8081/Pos_Backend_EE_war_exploded/customer';

//load the customer table
const loadCustomerTable = function () {
    $.ajax({
        // type: 'GET',
        url: url,
        success: function (data) {
            $('tbody').eq(0).empty();
            data.forEach(item => {
                $('tbody').eq(0).append(
                    `<tr>
                    <th scope="row">${item.customerId}</th>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.contact}</td>
                    </tr>`
                );
            });
            setCustomerCount(data.length);
            setCustomerIds(data);

        },
        error: function (err) {
            Swal.fire('Something went wrong', '', 'info')
        }
    });
}

loadCustomerTable();

//add customer
customer_btn.eq(0).on('click', () => {
        let customerId =  customer_Id.val().trim();
        let fullName = full_name.val().trim();
        let addressVal = address.val().trim();
        let contactVal = parseInt(contact.val().trim());
        console.log(customerId, fullName, addressVal, contactVal);

        const CustomerDTO = {
            c_id: customerId,
            name: fullName,
            address: addressVal,
            contact: contactVal

        }

        console.log(CustomerDTO);

        //     create JSON
        const customerDTOJson = JSON.stringify(CustomerDTO);
        console.log(customerDTOJson);

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

        http.open("POST", "http://localhost:8081/Pos_Backend_EE_war_exploded/customer", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(customerDTOJson);
    }

);

//update customer
customer_btn.eq(1).on('click', () => {
        let customerId = customer_Id.val().trim();
        let fullName = full_name.val().trim();
        let addressVal = address.val().trim();
        let contactVal = parseFloat(contact.val().trim());

        const CustomerUpdateDTO = {
            c_id: customerId,
            name: fullName,
            address: addressVal,
            contact: contactVal

        }
        console.log(CustomerUpdateDTO);

        //     create JSON
        const customerDTOJson = JSON.stringify(CustomerUpdateDTO);
        console.log(customerDTOJson);

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

        http.open("PUT", "http://localhost:8081/Pos_Backend_EE_war_exploded/customer", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(customerDTOJson);
    }

);

//delete customer
customer_btn.eq(2).on('click', () => {
        let customerId = customer_Id.val().trim();
        let fullName = full_name.val().trim();
        let addressVal = address.val().trim();
        let contactVal = parseFloat(contact.val().trim());

        const CustomerUpdateDTO = {
            c_id: customerId,
            name: fullName,
            address: addressVal,
            contact: contactVal

        }
        console.log(CustomerUpdateDTO);

        //     create JSON
        const customerDTOJson = JSON.stringify(CustomerUpdateDTO);
        console.log(customerDTOJson);

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

        http.open("DELETE", "http://localhost:8081/Pos_Backend_EE_war_exploded/customer", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(customerDTOJson);

    }

);

//load customer
$('tbody').eq(0).on('click', 'tr', function () {
    customer_Id.val($(this).find('th').eq(0).text());
    full_name.val($(this).find('td').eq(0).text());
    address.val($(this).find('td').eq(1).text());
    contact.val($(this).find('td').eq(2).text());
});

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