import {useEffect, useState} from 'react';

const validRegex = new RegExp("^[\\D\\s]{3,25}$");

function useMealContentValid(beginning, main, sideArr){
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        async function checkValidity(){
            let validity = validRegex.test(beginning) || validRegex.test(main);
            await sideArr.filter(side => side.value !== '').forEach(side => {
                validity = validity || validRegex.test(side.value);
            });

            setIsValid(validity);
        }

        checkValidity();
    });

    return isValid;
}

export default useMealContentValid;
