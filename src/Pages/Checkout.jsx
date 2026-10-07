import { useContext, useState } from "react";
import CartContext from "./../context/CartContext";
import LocationPicker from "../Components/Templates/ContactUS/Maps";
const TAX_RATE = 0.09;

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const { items } = useContext(CartContext);

  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subTotal * TAX_RATE);
  const totalPrice = subTotal + tax;

  const [formData, setFormData] = useState({
    address: "",
    postalCode: "",
    cityId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // Codes
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">تکمیل سفارش</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="mb-6 text-xl font-bold text-gray-900">آدرس ارسال</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  آدرس
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="آدرس کامل خود را وارد کنید..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  کد پستی
                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="مثلاً 1234567890"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  شناسه شهر
                </label>

                <input
                  type="number"
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  placeholder="City ID"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  موقعیت روی نقشه
                </label>

                <p className="mb-3 text-sm text-gray-500">
                  برای مشخص کردن محل ارسال، روی نقشه کلیک کنید.
                </p>

                <LocationPicker position={location} setPosition={setLocation} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "در حال پردازش..." : "ادامه و پرداخت"}
            </button>
          </form>

          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              خلاصه سفارش
            </h2>

            <div className="space-y-4 border-b border-gray-200 pb-5">
              <div className="flex items-center justify-between text-gray-600">
                <span>تعداد محصولات</span>
                <span>{items?.length ?? 0} محصول</span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span>هزینه ارسال</span>
                <span>{tax.toLocaleString("fa-IR")} ریال</span>
                <span>محاسبه می‌شود</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-bold text-gray-900">مبلغ قابل پرداخت</span>

              <span className="text-xl font-bold text-blue-600">
                {totalPrice?.toLocaleString("fa-IR") ?? 0} ریال
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
