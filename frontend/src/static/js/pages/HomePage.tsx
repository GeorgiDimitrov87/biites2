import React, { useState } from 'react';
import { ApiUrlConsumer, LinksConsumer } from '../utils/contexts/';
import { PageStore } from '../utils/stores/';
import { MediaListRow } from '../components/MediaListRow';
import { MediaMultiListWrapper } from '../components/MediaMultiListWrapper';
import { ItemListAsync } from '../components/item-list/ItemListAsync.jsx';
import { InlineSliderItemListAsync } from '../components/item-list/InlineSliderItemListAsync.jsx';
import { Page } from './Page';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, Slide } from "../components/swiper";
// import HomeSlider from "../components/slider/Slider.jsx";
// import Slider from 'react-animated-slider';
// import horizontalCss from 'react-animated-slider/build/horizontal.css';

const images = Array.from({ length: 20 }, (_, index) => {
  return "https://picsum.photos/seed/" + index + 1 + "/1200/600";
});

interface SlideExampleProps {
  url: string;
  index: number;
}
const SlideExample: React.FC<SlideExampleProps> = (props) => {
  const { url, index } = props;
  return (
    <div
      style={{
        position: "relative",
        maxHeight: 600,
        maxWidth:700,
        overflow:'hidden'
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
        alt=""
        src={url}
      />
      <div
        style={{
          top: "10%",
          left: "10%",
          position: "absolute",
          color: "#fff"
        }}
      >
        <h1>image {index + 1}</h1>
        <a
          href={url}
          style={{
            display: "block",
            width: 70,
            height: 70,
            backgroundColor: "pink",
            borderRadius: "50%"
          }}
        >
          {""}
        </a>
      </div>
    </div>
  );
};

const EmptyMedia: React.FC = ({}) => {
  return (
    <LinksConsumer>
      {(links) => (
        <div className="empty-media">
          <div className="welcome-title">Welcome to Biites!</div>
          <div className="start-uploading">Start uploading media and sharing your work!</div>
          <a href={links.user.addMedia} title="Upload media" className="button-link">
            <i className="material-icons" data-icon="video_call"></i>UPLOAD MEDIA
          </a>
        </div>
      )}
    </LinksConsumer>
  );
};

interface HomePageProps {
  id?: string;
  latest_title: string;
  featured_title: string;
  recommended_title: string;
  latest_view_all_link: boolean;
  featured_view_all_link: boolean;
  recommended_view_all_link: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  id = 'home',
  featured_title = PageStore.get('config-options').pages.home.sections.featured.title,
  recommended_title = PageStore.get('config-options').pages.home.sections.recommended.title,
  latest_title = PageStore.get('config-options').pages.home.sections.latest.title,
  latest_view_all_link = false,
  featured_view_all_link = true,
  recommended_view_all_link = true,
}) => {
  const [zeroMedia, setZeroMedia] = useState(false);
  const [visibleLatest, setVisibleLatest] = useState(false);
  const [visibleFeatured, setVisibleFeatured] = useState(false);
  const [visibleRecommended, setVisibleRecommended] = useState(false);

  const onLoadLatest = (length: number) => {
    setVisibleLatest(0 < length);
    setZeroMedia(0 === length);
  };

  const onLoadFeatured = (length: number) => {
    setVisibleFeatured(0 < length);
  };

  const onLoadRecommended = (length: number) => {
    setVisibleRecommended(0 < length);
  };

  // const content = [
  //   {
  //     title: 'Vulputate Mollis Ultricies Fermentum Parturient',
  //     description:
  //     'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
  //     button: 'Read More',
  //     image: 'https://i.imgur.com/ZXBtVw7.jpg',
  //     user: 'Luan Gjokaj',
  //     userProfile: 'https://i.imgur.com/JSW6mEk.png'
  //   },
  //   {
  //     title: 'Tortor Dapibus Commodo Aenean Quam',
  //     description:
  //     'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
  //     button: 'Discover',
  //     image: 'https://i.imgur.com/DCdBXcq.jpg',
  //     user: 'Erich Behrens',
  //     userProfile: 'https://i.imgur.com/0Clfnu7.png'
  //   },
  //   {
  //     title: 'Phasellus volutpat metus',
  //     description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
  //     button: 'Buy now',
  //     image: 'https://i.imgur.com/DvmN8Hx.jpg',
  //     user: 'Bruno Vizovskyy',
  //     userProfile: 'https://i.imgur.com/4KeKvtH.png'
  //   }
  // ];
  

  return (
    <Page id={id}>
      {/* <h2>Hello</h2> */}
      <Swiper slidesPerView={1}>
      {images.map((image, index) => {
        return (
          <Slide key={image}>
            <SlideExample index={index} url={image} />
          </Slide>
        );
      })}
    </Swiper>
      <div><img src="/static/images/testpic.jpg" style={{"width":"100%", "height": "85%"}} ></img></div>
      <LinksConsumer>
        {(links) => (
          <ApiUrlConsumer>
            {(apiUrl) => (
              <MediaMultiListWrapper className="items-list-ver">
                {PageStore.get('config-enabled').pages.featured &&
                  PageStore.get('config-enabled').pages.featured.enabled && (
                    <MediaListRow
                      title={featured_title}
                      style={!visibleFeatured ? { display: 'none' } : undefined}
                      viewAllLink={featured_view_all_link ? links.featured : null}
                    >
                      <InlineSliderItemListAsync
                        requestUrl={apiUrl.featured}
                        itemsCountCallback={onLoadFeatured}
                        hideViews={!PageStore.get('config-media-item').displayViews}
                        hideAuthor={!PageStore.get('config-media-item').displayAuthor}
                        hideDate={!PageStore.get('config-media-item').displayPublishDate}
                      />
                    </MediaListRow>
                  )}

                {PageStore.get('config-enabled').pages.recommended &&
                  PageStore.get('config-enabled').pages.recommended.enabled && (
                    <MediaListRow
                      title={recommended_title}
                      style={!visibleRecommended ? { display: 'none' } : undefined}
                      viewAllLink={recommended_view_all_link ? links.recommended : null}
                    >
                      <InlineSliderItemListAsync
                        requestUrl={apiUrl.recommended}
                        itemsCountCallback={onLoadRecommended}
                        hideViews={!PageStore.get('config-media-item').displayViews}
                        hideAuthor={!PageStore.get('config-media-item').displayAuthor}
                        hideDate={!PageStore.get('config-media-item').displayPublishDate}
                      />
                    </MediaListRow>
                  )}

                <MediaListRow
                  title={latest_title}
                  style={!visibleLatest ? { display: 'none' } : undefined}
                  viewAllLink={latest_view_all_link ? links.latest : null}
                >
                  <ItemListAsync
                    pageItems={30}
                    requestUrl={apiUrl.media}
                    itemsCountCallback={onLoadLatest}
                    hideViews={!PageStore.get('config-media-item').displayViews}
                    hideAuthor={!PageStore.get('config-media-item').displayAuthor}
                    hideDate={!PageStore.get('config-media-item').displayPublishDate}
                  />
                </MediaListRow>

                {zeroMedia && <EmptyMedia />}
              </MediaMultiListWrapper>
            )}
          </ApiUrlConsumer>
        )}
      </LinksConsumer>
    </Page>
  );
};
