/* eslint-disable no-unused-vars */
// import Pages from './Pages';
import HTMLFlipBook from 'react-pageflip';
import React, { useState, useEffect, useRef } from 'react';

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
        {/* <div className='page-footer'>{props.number + 1}</div> */}
      </div>
    </div>
  );
});

function App(props) {
  const pages = useState(0);
  // totalPages is the total number of pages in the book
  const totalPages = useState(0);
  const [data, setData] = useState(null);
  const [allPages, setAllPages] = useState(0);
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(0);
  const [page3, setPage3] = useState(0);
  const [page4, setPage4] = useState(0);
  const [page5, setPage5] = useState(0);
  const [page6, setPage6] = useState(0);

  // flipBook is the book itself
  let flipBook = () => {
    flipBook.getPageFlip().getPageCount();
  };

  // this is the function that will be called when the user clicks on the button
  // const nextButtonClick = (props, chunk) => {
  //   // console.log(props);
  //   return flipBook.getPageFlip().flipNext();
  // };

  // // this is the function that will be called when the user clicks the previous button
  // const prevButtonClick = () => {
  //   return flipBook.getPageFlip().flipPrev();
  // };

  // This will run whenever the page is flipped and will push the new text and image to the page and to the backend server api's
  // useEffect(() => {
  //   // chunk.current = 'This is a test';
  //   // e.preventDefault();
  //   // const formData = new FormData();
  //   // formData.append('textUpload', chunk);
  //   fetch('http://127.0.0.1:5000/generate_chunks', {
  //     method: 'POST',
  //     headers: {
  //       // 'Content-Type': 'application/json',
  //     },
  //   })
  //     // body: JSON.stringify(),
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .then((data) => {
  //       // loop through the data to turn it into an array
  //       const arr = Object.keys(data).map((key) => data[key]);
  //       let page1 = arr[0][0];
  //       console.log(arr);
  //     })
  //     .then((result) => {
  //       console.log('Success:', result);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching data');
      const response = await fetch('http://127.0.0.1:5000/generate_chunks');
      const json = await response.json();
      console.log(json);
      let arr = Object.keys(json).map((key) => json[key]);
      console.log('holds all get_chunk returns', arr);
      console.log(arr[0]);
      console.log('music tags for each chunk', arr[0][0]);
      console.log('chunks', arr[1]);
      console.log('text for page', arr[1][0]);
      setPage1(arr[1][4]);
      setAllPages([...arr[1]]);
      console.log('all pages', allPages);
      // map = arr[1].map((page) => {
      //   console.log(page);
      //   return page;
      // });
    };
    fetchData();
  }, [allPages, data, props.id]);

  if (data) {
    console.log(data);
    const arr = Object.keys(data).map((key) => data[key]);
    let page1 = arr[0][0];
    console.log(page1);
  }

  // const onPage = (e) => {
  //   this.setState({
  //     page: e.data,
  //   });
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
          // onFlip={totalPages}
          // onChangeOrientation={this.onChangeOrientation}
          // onChangeState={this.onChangeState}
          className='demo-book'
          ref={(el) => (flipBook = el)}
        >
          {/* this next page is the cover */}
          <PageCover>BOOK TITLE</PageCover>
          {/* page number hold the text as children */}
          <Page number={1}>{allPages[4]}</Page>
          <Page number={2}>{allPages[5]}</Page>
          <Page number={3}>{allPages[6]}</Page>
          <Page number={4}>{allPages[7]}</Page>
          <Page number={5}>{allPages[8]}</Page>
          <Page number={6}>{allPages[9]}</Page>
          <Page number={7}>{allPages[10]}</Page>
          <Page number={8}>{allPages[11]}</Page>
          <Page number={9}>{allPages[12]}</Page>
          <Page number={10}>{allPages[13]}</Page>
          {/* this next line is the last page */}
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
