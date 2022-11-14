/* eslint-disable no-unused-vars */
// import Pages from './Pages';
import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect } from 'react';

// PageCover is the first and last page of the book
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className='page page-cover' ref={ref} data-density='hard'>
      <div className='page-content'>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

// Page is the page of the book and contains the image, text, and page number
const Page = React.forwardRef((props, ref) => {
  return (
    <div className='page' ref={ref}>
      <div className='page-content'>
        {/* <h2 className='page-header'>Page header - {props.number}</h2> */}
        <div className='page-image'></div>
        <div ref={ref} className='page-text'>
          {props.children}
        </div>
        <div className='page-footer'>{props.number + 1}</div>
      </div>
    </div>
  );
});

function App(props, ImageSource) {
  const pages = useState(0);
  const totalPages = useState(0);
  const [allAiUrls, setAllAiUrls] = useState([]);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [allPages, setAllPages] = useState(0);
  const [allArguments, setAllArguments] = useState('');
  const [title, setTitle] = useState('');

  // flipBook is the book itself
  let flipBook = () => {
    flipBook.getPageFlip().getPageCount();
  };

  // // this is the function that will be called when the user clicks on the button
  // const nextButtonClick = (props, chunk) => {
  //   // console.log(props);
  //   return flipBook.getPageFlip().flipNext();
  // };

  // // this is the function that will be called when the user clicks the previous button
  // const prevButtonClick = () => {
  //   return flipBook.getPageFlip().flipPrev();
  // };

  const fetchData = async () => {
    console.log('fetching data');
    const response = await fetch('http://127.0.0.1:5000/generate_chunks');
    const json = await response.json();
    console.log(json);
    let arr = Object.keys(json).map((key) => json[key]);
    console.log(arr);
    setTitle([arr[2]]);
    setAllArguments([...arr]);
    console.log('music tags for each chunk', arr[0][0]);
    console.log('text for page', arr[1][0]);
    console.log('title', arr[2]);
    setAllPages([...arr[1]]);
    console.log('all pages', allPages);
    return arr;
  };

  const fetchEverything = async () => {
    const dataInput = {
      title: allArguments[2],
      image_prompt: allArguments[2],
      audio_prompt: allArguments[0][5][0],
    };
    console.log('type' + typeof dataInput);
    fetch('http://127.0.0.1:5000/generate_image_and_music', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      }),
      body: JSON.stringify({
        ...dataInput,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        // loop through the data to turn it into an array
        const arr = Object.keys(data).map((key) => data[key]);
        console.log(arr);
        console.log(arr[0]);
        setAllAiUrls([...arr]);
        console.log('all ai urls', allAiUrls);
        console.log(allAiUrls[0]);
        console.log(allAiUrls[1]);
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('Error Data', data);
      });
  };

  // this runs at the start of the web load and calls the fetchData function, which calls the backend chunks (stories)
  useEffect(() => {
    // by using a function here we can run this use effect simply once and only load the chunks once
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setInterval(function () {
      fetchEverything();
    }, 30000);
  }, []);

  // this runs when the page is flipped and it sends a post request to get the image and music for the page
  // const onPage = (e) => {
  //   setPage(e.data);
  // };

  return (
    <div>
      <div>{/* <Pages /> */}</div>
      <div>
        <HTMLFlipBook
          width={550}
          height={733}
          size='stretch'
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          // onFlip={onPage}
          // onChangeOrientation={this.onChangeOrientation}
          // onChangeState={this.onChangeState}
          className='demo-book'
          ref={(el) => (flipBook = el)}
        >
          {/* this next page is the cover */}
          <PageCover className='flex flex-auto text-2xl'>{title[0]}</PageCover>
          {/* page number hold the text as children */}
          <Page number={1}>
            <div className='left'>
              <div className='text'>{allPages[4]}</div>
            </div>
            <div className='right'>
              <div className='image'>
                <img src={allAiUrls[0]} alt={'ai generation'}></img>
              </div>
              <div className='music'>
                {
                  (allAiUrls[1] = null ? (
                    <audio src={allAiUrls[1]} controls></audio>
                  ) : null)
                }
              </div>
            </div>
          </Page>
          <Page number={2}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          <Page number={3}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          {/* this next line is the last page */}
          <Page number={4}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          <Page number={5}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          <Page number={6}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          <Page number={7}>
            <div className='text'>{allPages[4]}</div>
            <div className='image'>
              <img src={allAiUrls[0]} alt={'ai generation'}></img>
            </div>
            <div className='music'>
              {allAiUrls[1] !== null ? (
                <audio src={allAiUrls[1]} controls></audio>
              ) : null}
            </div>
          </Page>
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
        {/* <div>
          <button type='button' onClick={prevButtonClick}>
            Previous page
          </button>
          [<span>{pages}</span> of
          <span>{totalPages}</span>]
          <div>
            <button type='button' onClick={nextButtonClick}>
              Next page
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
