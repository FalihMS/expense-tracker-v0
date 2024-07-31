export default function ConfirmPage(){
    return(
        <div className="py-4">
            <div className="mx-4 lg:mx-auto max-w-3xl flex flex-col justify-between items-center space-y-3">
                <h1>You Account Have Been Verified</h1>
                <a href="/auth/login" className="text-blue-900 underline">Go to Login Page</a>
            </div>
        </div>
    )
}