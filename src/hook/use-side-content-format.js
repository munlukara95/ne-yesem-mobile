import {useEffect, useState} from 'react';

function useSideContentFormat(sideArr){
    const [sideContent, setSideContent] = useState("");

    useEffect(() => {
        const isExistSide = sideArr !== null && typeof (sideArr) !== 'undefined';

        if(isExistSide){
            const sideValueArr = sideArr.map((el, ndx) => {
                if(ndx === 0)
                    return el.value;
                else
                    return ' ' + el.value;
            });
            setSideContent(sideValueArr.toString());
        }
    });

    return sideContent;
}

export default useSideContentFormat;
