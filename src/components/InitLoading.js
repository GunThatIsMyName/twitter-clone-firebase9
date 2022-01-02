import React from 'react'
import styled from 'styled-components'

function InitLoading() {
    return (
        <Loader>
            
        </Loader>
    )
}

const Loader = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:white;
`;

export default InitLoading
