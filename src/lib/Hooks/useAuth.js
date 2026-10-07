import { useContext, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { validate } from "../../validators/index";
import { sendOtpSchema, verifyOtpSchema } from "../../validators/auth";
import * as authService from "../../services/auth.service";
import useCountdown from "./useCountdown";
import AuthContext from "../../context/AuthContext";
import { isSafeRedirect } from "../helpers/url";

export const useAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);
  const { restart, getFormattedTime, isExpired } = useCountdown(120);
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);

  const [searchParams] = useSearchParams();

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    if (!validate(sendOtpSchema, { phone })) return;

    const data = await authService.sendOtp(phone);

    console.log("[SendOtp]", data);

    setIsSentOtp(true);

    restart();
  };

  const resendOtp = async () => {
    const data = await authService.sendOtp(phone);

    console.log("[ResendOtp]", data);

    restart();

    toast.success("کد جدید ارسال شد.");
  };

  const verifyOtp = async () => {
    if (!validate(verifyOtpSchema, { phone, otp })) return;

    const data = await authService.verifyOtp(phone, otp);

    console.log("[VerifyOtp]", data);

    return data;
  };

  const login = async () => {
    const data = await verifyOtp();

    if (!data) return;

    // SaveToken

    toast.success("با موفقیت وارد شدید.");

    const redirectTo = searchParams.get("redirect");
    navigate(isSafeRedirect(redirectTo) ? redirectTo : "/");

    await refreshUser();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSentOtp) {
        await login();
      } else {
        await sendOtp();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    phone,
    otp,
    isSentOtp,
    isExpired,
    getFormattedTime,
    resendOtp,
    handlePhoneChange,
    handleOtpChange,
    handleSubmit,
  };
};
