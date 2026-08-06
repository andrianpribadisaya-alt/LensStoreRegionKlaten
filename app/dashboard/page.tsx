import BalanceCard from "@/components/dashboard/BalanceCard"
import StatsCard from "@/components/dashboard/StatsCard"

export default function Dashboard() {

    return (

        <div className="space-y-6">

            <BalanceCard balance={250000} />

            <div className="grid gap-4 md:grid-cols-3">

                <StatsCard
                    title="Total Deposit"
                    value="Rp2.500.000"
                />

                <StatsCard
                    title="Total Order"
                    value={327}
                />

                <StatsCard
                    title="Membership"
                    value="Bronze"
                />

            </div>

        </div>

    )

}
