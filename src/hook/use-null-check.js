import {useEffect, useState} from 'react';

function useNullCheck(value){
    const [isNull, setIsNull] = useState(true);

    useEffect(() => {
        setIsNull(value !== null && typeof (value) !== 'undefined');
    });

    return isNull;
}

export default useNullCheck;
