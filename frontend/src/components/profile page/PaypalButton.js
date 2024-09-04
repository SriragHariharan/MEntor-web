import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useNavigate } from 'react-router-dom';
// "/meetings/add"
function PaypalButton({ product }) {
    const { slotID, time, date, amount, mentorID } = product;
    const navigate = useNavigate();

    console.log(product);
    
    const checkSlotStatus = async () => {
        try {
            let resp = await axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/slots/status/", { mentorID, slotID });
            console.log(resp.data?.bookingStatus);
            return resp?.data?.bookingStatus
        } catch (error) {
            return false;
        }
    }
    
    //function to book slot in db
    const handleBookSlot = (transactionID) => {
        axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/add", {transactionID, ...product})
    }

    //add transaction to db
    const handleAddTransaction = (transactionID) => {
        console.log("Am called now.....!")
        axiosInstance.post(process.env.REACT_APP_PAYMENT_SVC_ENDPOINT + "/transaction/add", { eventID: slotID, title:`Meeting on ${date.split("T")[0]} @ ${time}`, category:"meeting", mentorID, amount, transactionID })
    }

    return (
        <div>
            <PayPalButtons
                style={{
                    color: "gold",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill"
                }}
                onClick={async(data, actions) => {
                    console.log("Am clicked...");
                    // check whether slot is already booked
                    let slotStatus = await checkSlotStatus();
                    console.log("slot status:", slotStatus);
                    if (slotStatus) {
                        window.close(); //close paypal modal
                        showErrorToast("Slot unavailable")
                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                        {
                            description: `slotID: ${slotID} && time: ${time} && date: ${date}`,
                            amount: {
                                value: amount
                            }
                        }
                        ]
                    });
                }}

                onApprove={async (data, actions) => {
                    const order = await actions.order.capture(); 
                    handleBookSlot(order?.id);
                    handleAddTransaction(order?.id);
                    window.close(); //close paypal modal
                    showSuccessToast("Slot booked successfully")
                    //redirect to interviews page
                    navigate("/mentee/interviews")
                }}

                onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to slots page
                alert("Order cancelled : (")
                }}

                onError={(err) => {
                    //setError(err);
                    console.error("PayPal Checkout onError", err);
                }}
            />
        </div>
    )
}

export default PaypalButton
