
import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleContainer = ({ articles }) => {

    return (
        <div className='grid grid-cols-2 gap-4 pt-4'>
            {articles?.map(i => <ArticleCard article={i} key={i._id} />)}
        </div>
    );
};

export default ArticleContainer;