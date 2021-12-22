import React from "react";
import diagramImage from "../images/diagram.png"

const HomeComponent = () => {
  return (
    <div style={{"paddingBottom":"150px"}}>
      <br />
      <h2>1. Back-End</h2>
      <ul>
        <li>
          <p>
            Java Spring Framework with core Spring Boot built in Maven project.
          </p>
        </li>
        <li>
          <p>Spring Data JPA with with persisent layer and JPA Auditing.</p>
        </li>
        <li>
          <p>MySQL database in-memory Data Structure.</p>
        </li>
        <li>
          <p>
            RESTful API security with Spring Security, JWT Token, Symmetric Key,
            CSRF.
          </p>
        </li>
        <li>
          <p>DevOPS technology with Git, Docker and Jenkins.</p>
        </li>
      </ul>

      <h2>2. Front-End</h2>
      <ul>
        <li>
          <p>React Js</p>
        </li>
        <li>
          <p>Postman</p>
        </li>
        <li>
          <p>Boostrap</p>
        </li>
      </ul>

      <h2>3. Security Diagram</h2>
      <img
        style={{ width: "950px", height: "580px" }}
        className="img-fluid"
        alt="diagram"
        src={diagramImage}
      />
    </div>
  );
};

export default HomeComponent;
