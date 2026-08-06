import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <div className="flex">

            <AdminSidebar />

            <div className="flex-1">

                <AdminNavbar />

                <main className="p-6">

                    {children}

                </main>

            </div>

        </div>

    );

}
