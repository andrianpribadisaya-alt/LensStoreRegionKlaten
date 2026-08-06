interface Props {

    title: string;

    value: string | number;

}

export default function DashboardCard({

    title,

    value

}: Props) {

    return (

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">

            <p className="text-slate-400">

                {title}

            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">

                {value}

            </h2>

        </div>

    );

}
