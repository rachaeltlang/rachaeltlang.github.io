import croissant from '../files/croissant.jpg';

// Home page / landing page
function Home() {

    return (
        <div className="container">
          <div className="content-container centered-content">
            <div className="text-container">
              <h1 className="h1-style">Rachael Lang</h1>
              <p className="p-style">Hi! I'm Rachael</p>
            </div>
            <div className="image-container">
              <img
                style={{ width: '200px', height: '200px' }}
                src={croissant}
                alt="a croissant plush, from Jellycat"
              />
            </div>
          </div>
        </div>
      );      
}

export default Home;
