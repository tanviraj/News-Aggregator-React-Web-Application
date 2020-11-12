import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MdShare } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";



function ShareModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => { setShow(true);e.preventDefault(); }
  const hashtag = ["CSCI_571_NewsApp"];

  return (
    <div className="article-share" onClick={(e) => {e.stopPropagation(); }}>
      <MdShare onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <div>
          {
            props.source !== null ?
              <Modal.Title>{(props.source === 'GA' ? 'GUARDIAN' : 'NYTIMES')}</Modal.Title> :
              <div/>
          }
          <Modal.Title>{props.title}</Modal.Title>
          </div>
          {/* <Modal.Title>{props.source != null?(props.source==='GA'? 'GUARDIAN': 'NYTIMES'):<div></div>}<br></br>{props.title}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="sharevia">Share via</div>
          <FacebookShareButton url={props.url} hashtag="#CSCI_571_NewsApp">
            <FacebookIcon size={32} round={true} className="share-icons"/>
          </FacebookShareButton>
          <TwitterShareButton url={props.url} hashtags={hashtag}>
            <TwitterIcon size={32} round={true} className="share-icons"/>
          </TwitterShareButton>
          <EmailShareButton url={props.url} subject="#CSCI_571_NewsApp">
            <EmailIcon size={32} round={true} className="share-icons" />
            </EmailShareButton>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShareModal;
