interface Props {
    title: string
    value: string | number
}

export default function StatsCard({
    title,
    value
}: Props) {

    return (

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-slate-400">

                {title}

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

                {value}

            </h2>

        </div>

    )

}
