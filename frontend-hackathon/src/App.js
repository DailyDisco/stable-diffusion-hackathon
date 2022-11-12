/* eslint-disable no-unused-vars */
// import Pages from './Pages';
import HTMLFlipBook from 'react-pageflip';
import React, { useState } from 'react';

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className='page page-cover' ref={ref} data-density='hard'>
      <div className='page-content'>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className='page' ref={ref}>
      <div className='page-content'>
        <h2 className='page-header'>Page header - {props.number}</h2>
        <div className='page-image'></div>
        <div className='page-text'>{props.children}</div>
        <div className='page-footer'>{props.number + 1}</div>
      </div>
    </div>
  );
});

function App(props) {
  // const [page, setPage] = useState(null);
  // const [totalPages, setTotalPages] = useState(0);

  const pages = useState(0);
  const totalPages = useState(0);
  // const [pages, setPages] = useState<ReactElement[]>([]);

  const nextButtonClick = () => {
    return flipBook.getPageFlip().flipNext();
  };

  const prevButtonClick = () => {
    return flipBook.getPageFlip().flipPrev();
  };

  // const onPage = (e) => {
  //   this.setState({
  //     page: e.data,
  //   });
  // };

  let flipBook = () => {
    flipBook.getPageFlip().getPageCount();
  };

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
          <PageCover>BOOK TITLE</PageCover>
          <Page number={1}>
            Alice was beginning to get very tired of sitting by her sister on
            the bank, and of having nothing to do: once or twice she had peeped
            into the book her sister was reading, but it had no pictures or
            conversations in it, “and what is the use of a book,” thought Alice
            “without pictures or conversations?” So she was considering in her
            own mind (as well as she could, for the hot day made her feel very
            sleepy and stupid), whether the pleasure of making a daisy-chain
            would be worth the trouble of getting up and picking the daisies,
            when suddenly a White Rabbit with pink eyes ran close by her. There
            was nothing so _very_ remarkable in that; nor did Alice think it so
            _very_ much out of the way to hear the Rabbit say to itself, “Oh
            dear! Oh dear! I shall be late!” (when she thought it over
            afterwards, it occurred to her that she ought to have wondered at
            this, but at the time it all seemed quite natural); but when the
            Rabbit actually _took a watch out of its waistcoat-pocket_, and
            looked at it, and then hurried on, Alice started to her feet, for it
            flashed across her mind that she had never before seen a rabbit with
            either a waistcoat-pocket, or a watch to take out of it, and burning
            with curiosity, she ran across the field after it, and fortunately
            was just in time to see it pop down a large rabbit-hole under the
            hedge.
          </Page>
          <Page number={2}>Lorem ipsum...</Page>
          <Page number={3}>Lorem ipsum...</Page>
          <Page number={4}>
            In another moment down went Alice after it, never once considering
            how in the world she was to get out again. The rabbit-hole went
            straight on like a tunnel for some way, and then dipped suddenly
            down, so suddenly that Alice had not a moment to think about
            stopping herself before she found herself falling down a very deep
            well. Either the well was very deep, or she fell very slowly, for
            she had plenty of time as she went down to look about her and to
            wonder what was going to happen next. First, she tried to look down
            and make out what she was coming to, but it was too dark to see
            anything; then she looked at the sides of the well, and noticed that
            they were filled with cupboards and book-shelves; here and there she
            saw maps and pictures hung upon pegs. She took down a jar from one
            of the shelves as she passed; it was labelled “ORANGE MARMALADE”,
            but to her great disappointment it was empty: she did not like to
            drop the jar for fear of killing somebody underneath, so managed to
            put it into one of the cupboards as she fell past it.
          </Page>
          <Page number={5}>Lorem ipsum...</Page>
          <Page number={6}>
            “Well!” thought Alice to herself, “after such a fall as this, I
            shall think nothing of tumbling down stairs! How brave they’ll all
            think me at home! Why, I wouldn’t say anything about it, even if I
            fell off the top of the house!” (Which was very likely true.) Down,
            down, down. Would the fall _never_ come to an end? “I wonder how
            many miles I’ve fallen by this time?” she said aloud. “I must be
            getting somewhere near the centre of the earth. Let me see: that
            would be four thousand miles down, I think—” (for, you see, Alice
            had learnt several things of this sort in her lessons in the
            schoolroom, and though this was not a _very_ good opportunity for
            showing off her knowledge, as there was no one to listen to her,
            still it was good practice to say it over) “—yes, that’s about the
            right distance—but then I wonder what Latitude or Longitude I’ve got
            to?” (Alice had no idea what Latitude was, or Longitude either, but
            thought they were nice grand words to say.)
          </Page>
          <Page number={7}>Lorem ipsum...</Page>
          <Page number={8}>
            Presently she began again. “I wonder if I shall fall right _through_
            the earth! How funny it’ll seem to come out among the people that
            walk with their heads downward! The Antipathies, I think—” (she was
            rather glad there _was_ no one listening, this time, as it didn’t
            sound at all the right word) “—but I shall have to ask them what the
            name of the country is, you know. Please, Ma’am, is this New Zealand
            or Australia?” (and she tried to curtsey as she spoke—fancy
            _curtseying_ as you’re falling through the air! Do you think you
            could manage it?) “And what an ignorant little girl she’ll think me
            for asking! No, it’ll never do to ask: perhaps I shall see it
            written up somewhere.” Down, down, down. There was nothing else to
            do, so Alice soon began talking again. “Dinah’ll miss me very much
            to-night, I should think!” (Dinah was the cat.) “I hope they’ll
            remember her saucer of milk at tea-time. Dinah my dear! I wish you
            were down here with me! There are no mice in the air, I’m afraid,
            but you might catch a bat, and that’s very like a mouse, you know.
            But do cats eat bats, I wonder?” And here Alice began to get rather
            sleepy, and went on saying to herself, in a dreamy sort of way, “Do
            cats eat bats? Do cats eat bats?” and sometimes, “Do bats eat cats?”
            for, you see, as she couldn’t answer either question, it didn’t much
            matter which way she put it. She felt that she was dozing off, and
            had just begun to dream that she was walking hand in hand with
            Dinah, and saying to her very earnestly, “Now, Dinah, tell me the
            truth: did you ever eat a bat?” when suddenly, thump! thump! down
            she came upon a heap of sticks and dry leaves, and the fall was
            over.
          </Page>
          <Page number={9}>Lorem ipsum...</Page>
          <Page number={10}>Lorem ipsum...</Page>
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
        <div>
          <button type='button' onClick={prevButtonClick}>
            Previous page
          </button>
          [<span>{pages}</span> of
          <span>{totalPages}</span>]
          <button type='button' onClick={nextButtonClick}>
            Next page
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;