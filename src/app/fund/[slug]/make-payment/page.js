"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AmountModal from "../../../components/AmountModal";
import NameModal from "../../../components/NameModal";

export default function Page({ params }) {
  const { slug } = params;
  const router = useRouter();

  const [fund, setFund] = useState(null);
  const [isAmountOpen, setIsAmountOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadFund = async () => {
      try {
        console.log("Fetching fund data for slug:", slug);
        const res = await fetch(`/api/funds/slug/${slug}`);
        console.log(res)
        const data = await res.json();
        console.log(data);
        if (!mounted) return;
        setFund(data);
        // decide which modal to open
        if (data?.customerDecidesAmount) setIsAmountOpen(true);
        else setIsNameOpen(true);
      } catch (err) {
        console.error("Failed to load fund:", err);
        // fallback: open amount modal so user can still pay
        if (mounted) setIsAmountOpen(true);
      }
    };
    loadFund();
    return () => (mounted = false);
  }, [slug]);

  const closeAndBack = () => {
    router.push(`/fund/${slug}`);
  };

  const fundId = fund?._id;

 const handleAmountSubmit = async (amount, name) => {
    console.log('amount submit',amount, name);
    setIsCreating(true);
    try {
      const response = await fetch("/api/razorpay/payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, fundId, name }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success && data.paymentLink) {
        window.open(data.paymentLink,"_self");
        setIsAmountOpen(false);
      } else {
        alert("Failed to create payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Failed to create payment link. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleFixedSubmit = async (name) => {
    console.log('fixed submit',name);
    setIsCreating(true);
    try {
      const response = await fetch("/api/razorpay/fixed-payment-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fundId, name }),
      });

      const data = await response.json();

      if (data.success && data.paymentLink) {
        window.open(data.paymentLink, "_self");
        setIsNameOpen(false);
      } else {
        alert("Failed to create payment link. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment link:", error);
      alert("Failed to create payment link. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <AmountModal
        isOpen={isAmountOpen}
        onClose={closeAndBack}
        onSubmit={handleAmountSubmit}
        isLoading={isCreating}
      />
      <NameModal
        isOpen={isNameOpen}
        onClose={closeAndBack}
        onSubmit={handleFixedSubmit}
        isLoading={isCreating}
        amount={fund?.contributionAmount || 0}
      />
    </>
  );
}