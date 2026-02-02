import RegisterClient from "@/app/RegisterClient";
import { Suspense } from "react";

export default function Page() {
    return(
        <Suspense fallback={null}>
            <RegisterClient />
        </Suspense>
    )
}