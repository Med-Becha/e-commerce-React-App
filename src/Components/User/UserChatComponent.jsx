const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            {Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>you wrote:</b> Hello, world! this is a toast message
                </p>
                <p className="bg-warning p-2 ms-4 text-light rounded-pill">
                  <b>support wrote:</b> Hello, world! this is a toast message
                </p>
              </div>
            ))}
          </div>

          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>

          <button className="btn btn-outline-warning btn-block">Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
