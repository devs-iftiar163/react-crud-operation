import { Accordion, Carousel, Col, Container, Row } from "react-bootstrap";

const ReactBootstrap = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Header>Iftiar</Accordion.Header>
              <Accordion.Body>Hossain</Accordion.Body>
            </Accordion>

            <Carousel>
              <Carousel.Item>
                <h1>Iftiar Hossain</h1>
              </Carousel.Item>
              <Carousel.Item>
                <h1>Johurul Islamn</h1>
              </Carousel.Item>
              <Carousel.Item>
                <h1>kader Molla</h1>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReactBootstrap;
