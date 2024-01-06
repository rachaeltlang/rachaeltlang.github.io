import { useState } from "react"
import { Card, Button, Carousel } from "react-bootstrap"

// Step 2: separate component to display cat data
function BadgerBudsSummary({ cat, showMore, onToggleShowMore, onSave }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleSlide = (selectedIndex) => {
    setCurrentIndex(selectedIndex)
  }

  return (
    <Card className="mb-3">
      {/* Step 10: carousel */}
      {showMore ? (
        <Carousel activeIndex={currentIndex} onSelect={handleSlide}>
          {cat.imgIds.map((imgId, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${cat.imgIds[index]}`}
                alt={`a picture of ${cat.name}`}
                style={{ width: "100%", height: "100%" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>) : (
        // default view of one image when show more isn't clicked
        <Card.Img
          src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${cat.imgIds[0]}`}
          alt={`a picture of ${cat.name}`}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <Card.Body>
        <Card.Title>{cat.name}</Card.Title>
        {/* display when show more is clicked */}
        {showMore && (
          <div>
            <p>{cat.gender}</p>
            <p>{cat.breed}</p>
            <p>
              {Math.floor(cat.age / 12) == 0 ? "" : Math.floor(cat.age / 12) + " year(s)"}
              {Math.floor(cat.age / 12) != 0 && cat.age % 12 != 0 ? " and " : ""}
              {cat.age % 12 == 0 ? "" : cat.age % 12 + " month(s)"}
              old
            </p>
            <p>{cat.description}</p>
          </div>
        )}
        <Button
          variant="primary"
          style={{ marginRight: "10px" }}
          onClick={onToggleShowMore}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
        <Button
          variant="secondary"
          onClick={onSave}
        >
          Save
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BadgerBudsSummary;