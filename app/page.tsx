export default function SinglePage(){
    return(
        <main>
            <Header />
            <SelectForm />
        </main>
    )
}

function Header(){
    return(
        <div className="py-4 border-b">
            <div className="mx-4 lg:mx-auto max-w-3xl flex justify-between items-center">
                <h1 className="font-medium">Personal Finance Tracker</h1>
                
                <div className="border rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

function SelectForm(){
    return (
        <div className="py-4">
            <div className="mx-4 lg:mx-auto max-w-3xl flex flex-col justify-between items-center space-y-4">
                <a href="/form/income" className="border rounded p-4 w-full flex items-center space-x-4 hover:bg-gray-100 hover:border-gray-300">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Record Income</h3>
                        <h5 className="text-sm text-gray-500">monitor your earnings over time</h5>
                    </div>
                </a>
                <a href="/form/expense"  className="border rounded p-4 w-full flex items-center space-x-4 hover:bg-gray-100 hover:border-gray-300">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Record Expense</h3>
                        <h5 className="text-sm text-gray-500">monitor where your money is going</h5>
                    </div>
                </a>
                <a className="border rounded p-4 w-full flex items-center space-x-4 bg-gray-50">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold">Transfer</h3>
                        <h5 className="text-sm text-gray-500">monitor your earnings over time</h5>
                    </div>
                </a>
            </div>
        </div>

    )
}