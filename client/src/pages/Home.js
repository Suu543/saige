import { Carousel } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item style={{ maxHeight: "700px" }} interval={1000}>
          <img
            className="d-block w-100"
            src="car1.jpg"
            alt="First slide"
            style={{ maxHeight: "700px" }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "700px" }} interval={500}>
          <img
            className="d-block w-100"
            src="motocycle.jpg"
            alt="Second slide"
            style={{ maxHeight: "700px" }}
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "700px" }}>
          <img
            className="d-block w-100"
            src="car1.jpg"
            alt="Third slide"
            style={{ maxHeight: "700px" }}
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Home;
