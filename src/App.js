import "./app.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { RiMessengerLine, RiShoppingBag3Line } from "react-icons/ri";
import { CgAddR, CgProfile } from "react-icons/cg";
import { BsChat, BsThreeDotsVertical, BsCollectionPlay } from "react-icons/bs";
import { FiSend, FiBookmark, FiSearch } from "react-icons/fi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import random from "random-name";

const App = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [photos, setPhotos] = useState([]);

  const accessKey = process.env.REACT_APP_UNSPLASH_KEY;
  const count = 5;
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

  const addItem = async () => {
    try {
      const res = await axios.get(apiUrl);

      setPhotos([...photos].concat(res.data));
    } catch (error) {
      console.log(error);
    }

    setIsBottom(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isBottom) {
      addItem();
    }
  }, [isBottom]);

  useEffect(() => {
    const setImages = async () => {
      try {
        const res = await axios.get(apiUrl);
        setPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    setImages();
  }, [apiUrl]);

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    //check if user is at the bottom (or near it ) set the new state
    if (scrollTop + window.innerHeight >= scrollHeight) {
      setIsBottom(true);
    }
  }

  return (
    <div className="App">
      {/* {photos &&
        photos.map((item, index) => (
          <img key={index} src={item.urls.regular} alt={item.alt_description} />
        ))} */}
      <div className="nav">
        <p id="header">Unstergram</p>
        <div className="nav-icons">
          <div className="icon">
            <CgAddR />
          </div>
          <div className="icon">
            <FaRegHeart />
          </div>
          <div>
            <RiMessengerLine />
          </div>
        </div>
      </div>
      <div className="space"></div>

      {photos &&
        photos.map((item, index) => {
          let randomFirst = random.first();
          let randomPlace = random.place();

          return (
            <div className="image-wrapper" key={index}>
              <div className="image-header">
                <div className="image-header-l">
                  <div className="image-header-l-img">
                    <img
                      src="https://source.unsplash.com/featured/?people"
                      alt="profile dimage"
                    />
                  </div>
                  <div className="image-header-l-text">
                    <p id="image-name">{randomFirst}</p>
                    <p id="image-local">{randomPlace}</p>
                  </div>
                </div>
                <div className="image-header-r">
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className="image-img">
                <div className="img">
                  <img src={item.urls.regular} alt={item.alt_description} />
                </div>
              </div>

              <div className="image-footer">
                <div className="image-footer-top">
                  <div className="image-footer-l">
                    <div>
                      {" "}
                      <FaRegHeart />
                    </div>
                    <div>
                      <BsChat />
                    </div>
                    <div>
                      <FiSend />
                    </div>
                  </div>

                  <div className="image-footer-c">
                    <div>
                      <BiDotsHorizontalRounded />
                    </div>
                  </div>

                  <div className="image-footer-r">
                    <div>
                      <FiBookmark />
                    </div>
                  </div>
                </div>

                <div class="image-footer-bottom">
                  <div class="top">
                    <p>
                      {Math.floor(
                        Math.random() * (250000 - 1 + 1) + 1
                      ).toLocaleString()}{" "}
                      likes
                    </p>
                  </div>
                  <div class="center">
                    <p>
                      <b>{randomFirst}</b>
                    </p>
                    <p id="caption">{item.alt_description}</p>
                  </div>
                  <div class="bottom">
                    <p>
                      View all{" "}
                      {Math.floor(
                        Math.random() * (783 - 2 + 1) + 2
                      ).toLocaleString()}{" "}
                      comments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="footer">
        <div>
          <HiHome />
        </div>
        <div>
          <FiSearch />
        </div>
        <div>
          <BsCollectionPlay />
        </div>
        <div>
          <RiShoppingBag3Line />
        </div>
        <div>
          <CgProfile />
        </div>
      </div>
    </div>
  );
};

export default App;
