import React, { useState } from 'react';

const ReadMore = ({ desc, img }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => { setIsReadMore(!isReadMore) };
  return (
    <p >
      {isReadMore ? <div
        dangerouslySetInnerHTML={{ __html: desc?.slice(0, 900) }}
      /> : <div
        dangerouslySetInnerHTML={{ __html: desc && desc }}
      />}

      {desc?.length > 900 &&
        < span className='read-more-desc' onClick={toggleReadMore}>
          {isReadMore ? '(...read more)' : ' (...show less)'}
        </span>
      }

    </p >
  )
}

export default ReadMore;