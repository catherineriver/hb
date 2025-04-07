import React from "react";

const LogoMobile = (props: { width: string | number | undefined; height: string | number | undefined; }) => {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M32.0121 15.9996C32.0121 20.2452 30.3257 24.317 27.324 27.3192C24.3223 30.3213 20.2511 32.0079 16.006 32.0079C12.8403 32.0079 9.74574 31.069 7.11356 29.31C4.48139 27.551 2.42985 25.0508 1.2184 22.1257C0.00693675 19.2005 -0.310038 15.9818 0.307558 12.8765C0.925154 9.77117 2.44958 6.91876 4.68807 4.67995C6.92655 2.44115 9.77855 0.916498 12.8834 0.298813C15.9883 -0.318872 19.2066 -0.00185131 22.1313 1.20978C25.056 2.42141 27.5558 4.47324 29.3146 7.1058C31.0733 9.73835 32.0121 12.8334 32.0121 15.9996Z"
                  fill="#000086"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M18.0571 17.5432L4.84326 10.0449L11.3839 23.4154L18.0571 17.5432Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M28.1977 16.0266L14.9839 8.52832L21.5245 21.8988L28.1977 16.0266Z" fill="white"/>
        </svg>

    );
};

export default LogoMobile;
