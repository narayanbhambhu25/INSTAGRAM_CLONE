import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(""); // will get image url in data

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        //for network req to node js server from react app
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red daeken-3" });
            return;
          } else {
            M.toast({
              html: "Created Post Successfully",
              classes: "#43a047 green daeken-1",
            });
            navigate("/"); // after succesfully signedIn user will be on login screen
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]); // thiis useFfect will change when url is change so when network req with cloudniry finifh then url will change and then useffect also kick

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image); // use for save image to cloudnary
    data.append("upload_preset", "Insta-Clone");
    data.append("cloud_name", "diconntkh");
    fetch("https://api.cloudinary.com/v1_1/diconntkh/image/upload", {
      // makin req to cloudinary
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url); // here our url state will change and then useeefect will be kicking
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => postDetails()}
      >
        CREATE POST
      </button>
    </div>
  );
};

export default CreatePost;
