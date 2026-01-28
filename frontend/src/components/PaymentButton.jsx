import React from "react";

const PaymentButton = () => {
  const payNow = async () => {
    // 1️⃣ Create order on backend
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }), // ₹100
    });

    const order = await res.json();

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key: "YOUR_KEY_ID", // Razorpay Key ID
      amount: order.amount,
      currency: "INR",
      name: "My App",
      description: "Test Payment",
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ Verify payment on backend
        const verify = await fetch("http://localhost:5000/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const data = await verify.json();
        if (data.success) alert("Payment Successful!");
        else alert("Payment Failed!");
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true, // enable UPI
        card: true,
        netbanking: true,
        wallet: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={payNow}>Pay ₹100</button>;
};

export default PaymentButton;
