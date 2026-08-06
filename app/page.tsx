export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="container mx-auto px-6 py-24">

        <h1 className="text-6xl font-bold">
          LensOtp
        </h1>

        <p className="mt-6 text-slate-300 max-w-2xl">
          Premium OTP Marketplace dengan Google Login,
          Tripay Payment Gateway, MongoDB dan SMSCode API.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700">
            Get Started
          </button>

          <button className="rounded-xl border border-slate-700 px-6 py-3">
            Documentation
          </button>

        </div>

      </section>

    </main>
  );
}
