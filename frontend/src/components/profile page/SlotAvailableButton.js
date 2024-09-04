import React, { useState } from 'react';
import { BsSmartwatch } from 'react-icons/bs';
import moment from 'moment';
import PaypalButton from './PaypalButton';

function SlotAvailableButton({ slot, mentor, mentorID }) {

    //purchase details
    const product = {
        slotID: slot?._id,
        time: slot?.time,
        date: slot?.date,
        amount: slot?.amount,
        mentorID
    }

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
    console.log('opening modal...');
    setModalOpen(true);
    };

    const handleModalClose = () => {
    setModalOpen(false);
    };

  return (
    <>
      <button
        className="flex flex-row items-center justify-center bg-green-100 hover:bg-green-300 cursor-pointer rounded-lg py-2 px-4 mb-2"
        onClick={handleModalOpen}
      >
        <BsSmartwatch className="text-2xl text-dark mr-2" />
        <div className="flex flex-col">
          <span className="text-sm text-dark">{slot?.time} IST</span>
          <span className="text-xs text-dark opacity-70">₹ {slot?.amount}</span>
        </div>
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Book slot</h2>
                <div className=" text-left">
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={handleModalClose}>
                        X
                    </button>
              </div>
            </div>
            <table className="min-w-full bg-white">
                <tbody>
                  <tr className="w-full">
                    <td className="border px-4 py-2 font-bold">Mentor Name</td>
                    <td className="border px-4 py-2">{mentor}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="border px-4 py-2 font-bold">Time</td>
                    <td className="border px-4 py-2">{slot?.time} IST</td>
                  </tr>
                  <tr className="w-full">
                    <td className="border px-4 py-2 font-bold">Date</td>
                    <td className="border px-4 py-2">{moment(slot?.date?.createdAt).format('MMMM Do, YYYY')}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="border px-4 py-2 font-bold">Slot Amount</td>
                    <td className="border px-4 py-2">₹ {slot?.amount}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <PaypalButton product={product} />
              </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SlotAvailableButton;
