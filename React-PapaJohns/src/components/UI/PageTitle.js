import React from 'react';

function PageTitle({ title }) {
    return (
        <div className="page-title__wrapper">
            <h1 className='page-title__content'>{ title }</h1>
        </div>
    );
}

export default React.memo(PageTitle);