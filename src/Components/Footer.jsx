export default function Footer() {
  return (
    <footer className="bg-main-light mt-5 py-5">
      <div className="container">
        <h4>Get the FreshCart App</h4>
        <p>We will send you a link, open it on your phone to download the app.</p>
        <div className="row g-2">
          <div className="col-sm-10">
            <input type="email" className="form-control py-2" placeholder="Email..." />
          </div>
          <div className="col-sm-2">
            <button className="btn w-100 bg-main text-white">Share App Link</button>
          </div>
        </div>
        <div className="border-bottom border-2 my-4">
          <p>Created by Mohamed Gamal</p>
        </div>
      </div>
    </footer>
  );
}
