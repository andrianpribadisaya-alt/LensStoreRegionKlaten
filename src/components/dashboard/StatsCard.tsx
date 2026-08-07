interface Props {
    title: string
    value: string | number
}

export default function StatsCard({ title, value }: Props) {
    return (
        <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <p className="text-sm opacity-70">
                {title}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
                {typeof value === "number"
                    ? value.toLocaleString("id-ID")
                    : value}
            </h2>
        </div>
    )
}
