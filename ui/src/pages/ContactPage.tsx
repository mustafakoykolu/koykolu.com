// import SuccessDialog from "../Dialogs/SuccessDialog";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import ErrorDialog from "../components/dialogs/ErrorDialog";
// import ErrorDialog from "../Dialogs/ErrorDialog";
// import logo from "../assets/Logos/logo.png"


interface ContactPageProps {
  contactSectionRef?: React.RefObject<HTMLDivElement | null>;
}
export default function ContactPage({ contactSectionRef }: ContactPageProps) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errMessage, setErrMessage] = useState(
    "Kayıt işlemi sırasında bir hata meydana gelmiştir."
  );
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      nameSurname: formData.get("contact-name"),
      email: formData.get("contact-email"),
      phoneNumber: formData.get("contact-phone"),
      sentMessage: formData.get("message"),
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Contact/ContactRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowSuccessDialog(true);
    } catch (error: any) {
      setErrMessage(error.message);
      setShowErrorDialog(true);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div ref={contactSectionRef} className="flex container-4">
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          İletişim
        </h2>
     <SuccessDialog
        header="Mesajınız başarıyla gönderildi."
        message="En kısa sürede size dönüş yapılacaktır."
        buttonMessage="tamam"
        open={showSuccessDialog}
        setOpen={setShowSuccessDialog}
        navigateTo={"/"}
      />
      <ErrorDialog
        header="Mesajınız gönderilemedi."
        message={errMessage}
        buttonMessage="tamam"
        open={showErrorDialog}
        setOpen={setShowErrorDialog}
      /> 
        {loading && <LoadingSpinner />}
        <div className="md:p-15 p-5 bg-gray-800 rounded-lg shadow-md md:w-1/2 m-auto mb-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm/6 font-medium text-white"
              >
                İsim Soyisim
              </label>
              <div className="mt-2">
                <input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  required
                  placeholder="İsminiz ve soyisminiz"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm/6 font-medium text-white"
              >
                Email adresi
              </label>
              <div className="mt-2">
                <input
                  id="contact-email"
                  name="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ornek@mail.com"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm/6 font-medium text-white"
              >
                Telefon Numarası
              </label>
              <div className="mt-2">
                <input
                  id="contact-phone"
                  name="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="5xx xxx xx xx"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-white"
              >
                Mesajınız
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Mesajınızı buraya yazın..."
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Gönder
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Veya Direkt Beni Aramak İster Misiniz?{" "}
            {
              <a
                className="font-semibold text-indigo-400 hover:text-indigo-200"
                href="tel:+905310113620"
              >
                0531-011-3620{" "}
              </a>
            }
          </p>
        </div>
      </div>
    </div>
  );
}
