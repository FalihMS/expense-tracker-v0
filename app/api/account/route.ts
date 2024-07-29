const BASEROW_AUTH = String(process.env.BASEROW_AUTH)

export async function GET() {
    const res = await fetch('https://api.baserow.io/api/database/rows/table/329809/', {
        headers: {
            'Content-type': 'application/json',
            'Authorization': BASEROW_AUTH
        },
    })

    const data = await res.json()


    return Response.json(data.results)
}