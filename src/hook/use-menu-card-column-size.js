import {useEffect, useState} from 'react';

function useMenuCardColumnSize(isExistBeginningContent, isExistMainContent, isExistSideContent){
    const [columnSizes, setColumnSizes] = useState({beginning: '30%', main: '30%', sides: '30%'});

    useEffect(() => {
        if(isExistBeginningContent && !isExistMainContent && !isExistSideContent){
            if(columnSizes.beginning !== '100%') {
                setColumnSizes({beginning: '100%', main: '0%', sides: '0%'});
            }
        } else if(!isExistBeginningContent && isExistMainContent && !isExistSideContent){
            if(columnSizes.main !== '100%') {
                setColumnSizes({beginning: '0%', main: '100%', sides: '0%'});
            }
        } else if(!isExistBeginningContent && !isExistMainContent && isExistSideContent){
            if(columnSizes.sides !== '100%') {
                setColumnSizes({beginning: '0%', main: '0%', sides: '100%'});
            }
        } else if(isExistBeginningContent && isExistMainContent && !isExistSideContent) {
            if(columnSizes.main !== '60%') {
                setColumnSizes({beginning: '30%', main: '60%', sides: '0%'});
            }
        } else if(!isExistBeginningContent && isExistMainContent && isExistSideContent) {
            if(columnSizes.sides !== '60%') {
                setColumnSizes({beginning: '0%', main: '30%', sides: '60%'});
            }
        } else if(isExistBeginningContent && !isExistMainContent && isExistSideContent) {
            if(columnSizes.sides !== '60%') {
                setColumnSizes({beginning: '30%', main: '0%', sides: '60%'});
            }
        }
    });

    return columnSizes;
}

export default useMenuCardColumnSize;
