// Enum for originating platforms
const OriginatingPlatformEnum = {
    ANDROID_APP: 'ANDROID_APP',
    ANDROID_WEB: 'ANDROID_WEB',
    IOS_APP: 'IOS_APP',
    IOS_WEB: 'IOS_WEB',
    INSTORE_POS: 'INSTORE_POS',
    DESKTOP: 'DESKTOP',
    IVR: 'IVR',
    OTHER: 'OTHER'
};

// Helper function to get the platform type
function getPlatformType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
        return OriginatingPlatformEnum.ANDROID_APP;
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return OriginatingPlatformEnum.IOS_APP;
    } else if (userAgent.includes('mac') || userAgent.includes('windows') || userAgent.includes('linux')) {
        return OriginatingPlatformEnum.DESKTOP;
    } else {
        return OriginatingPlatformEnum.OTHER;
    }
}

// Initialize platform type for use in requests
const originatingPlatform = getPlatformType();

// Initiate Google Pay transaction using merchantPayment API
async function initiateMerchantPayment() {
    const requestData = {
        "merchantInfo": {
            "googleMerchantId": "BCR2DN6TWO37HOR3"
        },
        "userInfo": {
            "phoneNumber": "+919597667724"
        },
        "merchantTransactionDetails": {
            "transactionId": "1284ASSP",
            "amountPayable": {
                "currencyCode": "INR",
                "units": 10,
                "nanos": 0
            },
            "description": "Sample description",
            "upiPaymentDetails": {
                "vpa": "vaseegrahveda@kvb"
            },
            "gst": {
                "gstin": "33BJEPV2043L1Z3",
                "gstBreakUp": {
                    "gst": {
                        "currencyCode": "INR",
                        "units": 5,
                        "nanos": 0
                    },
                    "cgst": {
                        "currencyCode": "INR",
                        "units": 4,
                        "nanos": 0
                    },
                    "sgst": {
                        "currencyCode": "INR",
                        "units": 3,
                        "nanos": 0
                    },
                    "igst": {
                        "currencyCode": "INR",
                        "units": 1,
                        "nanos": 0
                    },
                    "cess": {
                        "currencyCode": "INR",
                        "units": 1,
                        "nanos": 0
                    }
                }
            },
            "invoice": {
                "invoiceNumber": "Invoice456",
                "invoiceTime": "2017-02-15T10:50:30Z"
            }
        },
        "expiryTime": "2017-02-15T10:50:30Z",
        "originatingPlatform": originatingPlatform // Set the originating platform
    };

    try {
        const response = await fetch('https://nbupayments.googleapis.com/v1/merchantPayments:initiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        console.log('Payment initiation response:', data);
    } catch (error) {
        console.error('Error initiating payment:', error);
    }
}

// Call initiateMerchantPayment function on button click
function onBuyClicked() {
    if (!window.PaymentRequest) {
        console.log('Web payments are not supported in this browser.');
        return;
    }

    initiateMerchantPayment();
}
