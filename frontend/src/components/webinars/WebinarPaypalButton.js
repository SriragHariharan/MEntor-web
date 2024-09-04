import React from 'react'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useNavigate } from 'react-router-dom';

function WebinarPaypalButton({ amount, webinarID, mentorID, title }) {

    //register for webinar    
    const handleRegisterWebinar = () => {
        axiosInstance.post(process.env.REACT_APP_WEBINAR_SVC_ENDPOINT + `/webinar/${webinarID}/register`)
        .catch(error => showErrorToast(error.response?.data?.message));
    }

    const handleAddTransaction = (order) => {
        console.log("Am called now.....!")
        axiosInstance.post(process.env.REACT_APP_PAYMENT_SVC_ENDPOINT + "/transaction/add", { eventID: webinarID, amount, transactionID:order?.id, mentorID, title, category: "webinar" })
    }

    const navigate = useNavigate();

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

            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                    {
                        amount: {
                            value: amount
                        }
                    }
                    ]
                });
            }}

            onApprove={async (data, actions) => {
                window.close(); //close paypal modal
                const order = await actions.order.capture(); 
                showSuccessToast("Registered webinar successfully")
                handleRegisterWebinar();
                handleAddTransaction(order);
                //redirect to interviews page
                navigate("/mentee/webinars")
            }}

            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to slots page
                alert("Payment cancelled")
            }}

            onError={(err) => {
                console.error("PayPal Checkout onError", err);
            }}
        />
    </div>
  )
}

export default WebinarPaypalButton