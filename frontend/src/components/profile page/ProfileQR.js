import React, { useState } from 'react';
import QRCode from "qrcode.react";

function ProfileQR({ userID, toggleQrModal }) {

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `profile qr.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(process.env.REACT_APP_DOMAIN_NAME + userID + "/profile");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000); // reset copied state after 2 seconds
    };

    const closeQRModal = () => toggleQrModal();

  return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Share profile</h2>
                <div className=" text-left">
                    <button onClick={closeQRModal} className="px-2 py-1 bg-red-600 text-white rounded">
                        X
                    </button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <QRCode
                    id="qr-gen"
                    value={process.env.REACT_APP_DOMAIN_NAME + userID + "/profile"}
                    size={160}
                    level={"H"}
                    includeMargin={false}
                />
                <button type="button" className='bg-purple-300 px-6 py-2 mt-2' onClick={downloadQRCode}>
                    Download QR
                </button>
            </div>
            <div>
            <input
                type="text"
                value={process.env.REACT_APP_DOMAIN_NAME + userID + "/profile"}
                readOnly // make the input box read-only
                className='cursor-not-allowed w-full'
            />
            <div className='px-4 py-2 text-white text-center bg-green-400 mt-2 rounded-xl cursor-pointer' onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Link'}
            </div>
    </div>
          </div>
        </div>
    
  );
}

export default ProfileQR;
