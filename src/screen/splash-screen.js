import React from "react";
import Splash from "../component/splash";

export default function SplashScreen({
                                     children,
                                     isAppReady,
                                 }: {
    isAppReady: boolean;
    children: React.ReactNode;
}) {
    return (
        <>
            {isAppReady && children}

            <Splash isAppReady={isAppReady} />
        </>
    );
}
