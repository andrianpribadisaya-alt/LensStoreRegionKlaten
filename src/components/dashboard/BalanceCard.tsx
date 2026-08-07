interface Props {
    balance: number
}

export default function BalanceCard({ balance }: Props) {
    return (
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">

            <p className="text-sm opacity-80">
                Total Saldo
            </p>

            <h1 className="mt-2 text-4xl font-bold">

                Rp {balance.toLocaleString("id-ID")}

            </h1>

        </div>
    )
}
