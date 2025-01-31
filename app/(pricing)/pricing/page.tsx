"use client";

import { Useredetails } from "@/app/actions/server-actions/get-user";
import { client } from "@/lib/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["userDetails"],
    queryFn: Useredetails,
  });

  const router = useRouter();

  const INCLUDED_FEATURES = [
    "1000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ];

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post();
      return await res.json();
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url);
    },
  });

  const handleGetAccess = () => {
    if (data) {
      createCheckoutSession();
    } else {
      router.push("/sign-in?intent=upgrade");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Geometric background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
            Next-Gen Pricing
          </h1>
          <p className="mt-10 text-lg text-blue-100/80 max-w-prose mx-auto text-center">
            Revolutionize your workflow with our cutting-edge, single-payment
            model
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Feature Section */}
          <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Premium Features
                </h3>
                <p className="text-blue-100/80 leading-relaxed">
                  Advanced monitoring system with real-time analytics and
                  precision tracking
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 border-b border-blue-500/20 pb-4">
                  <span className="text-blue-400 font-semibold text-lg">
                    Included Features
                  </span>
                  <div className="flex-1 border-t border-dashed border-blue-500/30" />
                </div>

                <ul className="grid grid-cols-1 gap-4">
                  {INCLUDED_FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-3 p-3 hover:bg-blue-500/5 rounded-xl transition-all duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 flex-none text-blue-400 p-1 bg-blue-500/10 rounded-lg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-blue-100/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="p-8 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f630_1px,transparent_1px),linear-gradient(to_bottom,#3b82f630_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-blue-400">
                    Unlimited Access
                  </h3>
                  <p className="text-blue-100/80">
                    Permanent access with continuous updates and support
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-center items-end">
                    <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      $59
                    </span>
                    <span className="text-lg text-blue-300/80 ml-2">USD</span>
                  </div>

                  <button
                    onClick={handleGetAccess}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-slate-900 font-bold rounded-xl transform transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/30"
                  >
                    <span className="drop-shadow-[0_1px_2px_rgba(59,130,246,0.4)]">
                      Get Instant Access
                    </span>
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-300/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-blue-400/60">
          30-day money back guarantee • Lifetime updates included
        </div>
      </div>
    </div>
  );
};

export default Page;
