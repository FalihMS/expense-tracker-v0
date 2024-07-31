
export function SelectForm(){
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
                <a href="/form/transfer" className="border rounded p-4 w-full flex items-center space-x-4 hover:bg-gray-100 hover:border-gray-300">
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