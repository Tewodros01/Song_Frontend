import React, { useState } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  color: rgb(205, 205, 205);
  padding: 0px 0px 10px;
`;

const StyledTitle = styled.h1`
  margin: 0px;
`;

const StyledSubTitle = styled.h3`
  color: rgba(249, 255, 255, 0.81);
  font-family: Bitter, serif;
`;

const StyledParagraph = styled.p`
  padding: 0px 5px;
`;

const StyledInput = styled.input`
  margin: 0px;
  color: var(--gray-dark);
  max-width: 100%;
  width: 75%;
`;

const StyledButton = styled.button`
  text-align: center;
`;

const StyledFooter = styled.footer`
  text-align: center;
  padding: 20px;
  background: #333;
  color: #fff;
`;

const StyledFloatButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 10px #000;
  cursor: pointer;
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 9999;
`;

const StyledModal = styled.div`
  position: fixed;
  overflow: auto;
  overflow-x: hidden;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  width: auto;
  height: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: none;
`;

const StyledModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

const StyledClose = styled.span`
  float: right;
  cursor: pointer;
`;

const StyledDownloadList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Test: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your search logic here
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <StyledHeader className="header-dark">
        <nav className="navbar navbar-dark navbar-expand-lg navigation-clean-search">
          <div className="container">
            <a className="navbar-brand" href="#">
              Saavn
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="btn btn-primary"
                    role="button"
                    href="https://github.com/wiz64/saavn-web-ui"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <StyledTitle className="text-center">Saavn</StyledTitle>
              <StyledSubTitle>Music Player &amp; Downloader</StyledSubTitle>
              <StyledParagraph>
                Ad-Free, Metadata, &amp; Modern Design
              </StyledParagraph>
            </div>
          </div>
        </div>
      </StyledHeader>
      <div>
        <div className="tab-content">
          <div className="tab-pane active" role="tabpanel" id="tab-1">
            <section className="highlight-clean">
              <div className="text-center">
                <select id="saavn-bitrate">
                  <option value="4">320kbps</option>
                  <option value="3" selected={true}>
                    160kbps
                  </option>
                  <option value="2">96kbps</option>
                  <option value="1">48kbps</option>
                </select>
              </div>
              <StyledParagraph></StyledParagraph>
              <div className="container" style={{ padding: "0px" }}>
                <div className="intro">
                  <form className="text-center" onSubmit={handleSearchSubmit}>
                    <div
                      style={{ width: "95%", margin: "auto", padding: "3px" }}
                    >
                      <StyledInput
                        type="text"
                        id="saavn-search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter Name, Year, Artist"
                      />
                      <StyledButton
                        className="btn btn-primary"
                        id="saavn-search-trigger"
                        type="submit"
                        style={{ textAlign: "center" }}
                      >
                        Search
                      </StyledButton>
                    </div>
                    <h5
                      className="text-uppercase text-center"
                      style={{ color: "rgb(165, 255, 184)" }}
                    >
                      Results
                    </h5>
                  </form>
                </div>
                <div id="saavn-results" style={{ marginBottom: "20px" }}>
                  <h5>Featured</h5>
                </div>
                <div className="text-center" style={{ width: "100%" }}>
                  <button id="loadmore" style={{ width: "100%" }}>
                    Load More
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <StyledFloatButton>
        <a
          href="javascript:void(0);"
          className="btn btn-primary"
          id="mpopupLink"
        >
          <img
            src="https://img.icons8.com/ios/50/000000/download.png"
            alt="Download Icon"
          />
        </a>
      </StyledFloatButton>
      <StyledModal
        id="mpopupBox"
        style={{ display: showModal ? "block" : "none" }}
      >
        <StyledModalContent className="modal-content">
          <StyledClose className="close" onClick={toggleModal}>
            &times;
          </StyledClose>
          <h2>Downloads</h2>
          <StyledDownloadList id="download-list"></StyledDownloadList>
          <div style={{ textAlign: "center" }}>
            <p>Don't flood the Media Server, Have patience...</p>
          </div>
        </StyledModalContent>
      </StyledModal>
      <StyledFooter>
        <p>
          This content is not affiliated with, endorsed, sponsored, or
          specifically approved by any third-party music provider like Gaana,
          Saavn, Spotify, and is not responsible for any copyright material.
          <br />
          We don't serve any music on our servers.
          <br />
          <br />
          Originally by wiz64.
          <br />
          Re-Designed by gaganmalvi
        </p>
      </StyledFooter>
    </>
  );
};

export default Test;
