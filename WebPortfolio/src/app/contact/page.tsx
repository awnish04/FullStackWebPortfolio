"use client";

import React, { useRef, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Send, Loader2 } from "lucide-react";
import { transition1 } from "@/lib/transitions";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required."),
      email: Yup.string()
        .email("Invalid email address.")
        .required("Email is required."),
      message: Yup.string()
        .max(500, "Message must be 500 characters or less.")
        .required("Message is required."),
    }),
    onSubmit: async (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      if (!form.current) return;

      setIsSending(true);
      try {
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC as string
        );

        console.log("EmailJS result:", result.text);
        toast.success("Message sent successfully! 🚀", {
          className: "font-secondary",
        });
        resetForm();
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send message. Please try again.", {
          className: "font-secondary",
        });
      } finally {
        setIsSending(false);
      }
    },
  });

  // Check if form is valid and not empty
  const isFormValid = formik.isValid && formik.dirty;

  return (
    <section className="min-h-screen p-4 flex items-center w-full lg:pt-0 pb-20 overflow-hidden py-12">
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: "-70%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-40%" }}
          transition={{ ...transition1 }}
          className="lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start"
        >
          <h1 className="text-[54px] lg:text-[64px] font-primary font-bold capitalize leading-[120%] tracking-[-0.05em] mb-4 text-white">
            Contact Me
          </h1>
          <p className="mb-6 text-sm lg:text-3xl text-white opacity-90">
            I&apos;d love to hear from you! Drop a message below 👇
          </p>
        </motion.div>

        {/* Form + Map */}
        <motion.div
          initial={{ opacity: 0, y: "70%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "40%" }}
          transition={{ ...transition1 }}
          className="grid md:grid-cols-2 my-16 items-center overflow-hidden rounded-3xl w-full mx-auto font-[sans-serif] shadow-2xl"
        >
          {/* Contact Form */}
          <div className="shadow-lg p-8 bg-[#1c1c2f]">
            <form
              ref={form}
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-y-4"
            >
              {/* Name and Email Inputs */}
              {(["name", "email"] as (keyof FormValues)[]).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className={`text-sm pb-2 block ${
                      formik.touched[field] && formik.errors[field]
                        ? "text-red-500"
                        : "text-gray-300"
                    }`}
                  >
                    {formik.touched[field] && formik.errors[field]
                      ? formik.errors[field]
                      : field === "name"
                      ? "Name"
                      : "Email"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={`Your ${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }`}
                    className={`w-full bg-transparent border-b text-white h-10 px-3 mb-3 outline-none transition-all duration-300 ${
                      formik.touched[field] && formik.errors[field]
                        ? "border-red-500"
                        : "border-gray-500 focus:border-white"
                    }`}
                  />
                </div>
              ))}

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className={`text-sm pb-2 block ${
                    formik.touched.message && formik.errors.message
                      ? "text-red-500"
                      : "text-gray-300"
                  }`}
                >
                  {formik.touched.message && formik.errors.message
                    ? formik.errors.message
                    : "Message"}
                </label>
                <textarea
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Message"
                  className={`w-full bg-transparent border-b text-white h-[100px] px-3 mb-5 outline-none resize-none transition-all duration-300 ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : "border-gray-500 focus:border-white"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSending}
                className={`mt-8 flex items-center justify-center gap-2 text-lg font-bold w-full rounded-full px-6 py-5 tracking-wide text-black transition-all ${
                  !isFormValid || isSending
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-white hover:scale-105 cursor-pointer hover:shadow-lg"
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send it
                  </>
                )}
              </button>

              {/* Form validation helper text */}
              {!isFormValid && formik.dirty && (
                <p className="text-red-400 text-sm text-center mt-2">
                  Please fill in all required fields correctly
                </p>
              )}
            </form>
          </div>

          {/* Map Section */}
          <div className="z-10 relative h-full max-md:min-h-[350px]">
            <iframe
              title="Biratnagar Satellite View"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113120.73973777419!2d87.18940561659097!3d26.44818882107978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744704331cc5%3A0x6d9a85e45c54b3fc!2sBiratnagar%2056613!5e1!3m2!1sen!2snp!4v1762542871446!5m2!1sen!2snp"
              className="w-full h-[300px] lg:h-full"
              frameBorder={0}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
