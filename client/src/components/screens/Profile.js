import React from "react";

const Profile = () => {
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div>
          <h4>Rahul Jaat</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1504438878808-ee48579f0f5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw2MTk2Mjl8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
};

export default Profile;
