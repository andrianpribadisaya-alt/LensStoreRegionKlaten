import DashboardCard from "@/components/admin/DashboardCard";

export default function AdminPage() {

    return (

        <div className="space-y-6">

            <div className="grid md:grid-cols-4 gap-5">

                <DashboardCard
                    title="Total User"
                    value="0"
                />

                <DashboardCard
                    title="Total Deposit"
                    value="Rp0"
                />

                <DashboardCard
                    title="Total Order"
                    value="0"
                />

                <DashboardCard
                    title="Revenue"
                    value="Rp0"
                />

            </div>

        </div>

    );

}
