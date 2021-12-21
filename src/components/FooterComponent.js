import React, { useState, useEffect } from "react";

import { Navbar, Container, Col } from "react-bootstrap";
import { FaRegCopyright } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";

const FooterComponent = () => {
  const [year, setYear] = useState();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, [year]);

  return (
    <Navbar fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div>
            {year}, <FaRegCopyright /> Anh Dung Pham, from{" "}
            <a href="https://anhdungpham.com">stanleypham.com</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              className="social-icons"
              href="https://www.google.com/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineLanguage size={27} />
            </a>
            <a
              className="social-icons"
              href="https://www.google.com/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={27} />
            </a>
            <a
              className="social-icons"
              href="https://www.google.com/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin size={27} />
            </a>
            <a
              className="social-icons"
              href="mailto:phamanhdung1813@gmail.com/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutgoingMail size={27} />
            </a>
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default FooterComponent;
