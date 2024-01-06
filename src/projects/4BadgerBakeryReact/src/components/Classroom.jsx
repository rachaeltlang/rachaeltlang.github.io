import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap"
import Student from "./Student"

function Classroom() {
    const [students, setStudents] = useState([]) // Step 1
    const [searchName, setSearchName] = useState("") // Step 6
    const [searchMajor, setSearchMajor] = useState("") // Step 6
    const [searchInterest, setSearchInterest] = useState("") // Step 6
    const [activePage, setActivePage] = useState(1) // Step 8
    const studentsPerPage = 24 // Step 8

    // Step 1: fetch student data (from hw2)
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => {
                if (res.status === 200 || res.status === 304) {
                    return res.json()
                } else {
                    throw new Error()
                }
            })
            .then(data => {
                setStudents(data)
                console.log(data)
            })
    }, [])

    // Step 6: search functionality - name field
    const handleNameChange = (event) => {
        setSearchName(event.target.value)
        setActivePage(1)
    }

    // Step 6: search functionality - major field
    const handleMajorChange = (event) => {
        setSearchMajor(event.target.value)
        setActivePage(1)
    }

    // Step 6: search functionality - interest field
    const handleInterestChange = (event) => {
        setSearchInterest(event.target.value)
        setActivePage(1)
    }

    // Step 6: search functionality
    const filterStudents = () => {
        return students.filter(stud => {
            const fullName = `${stud.name.first} ${stud.name.last}`.trim().toLowerCase()
            const nameMatches = !searchName || fullName.includes(searchName.trim().toLowerCase())

            const majorMatches = !searchMajor || stud.major.trim().toLowerCase().includes(searchMajor.trim().toLowerCase())

            const interestMatches = !searchInterest ||
                stud.interests.some(interest =>
                    interest.trim().toLowerCase().includes(searchInterest.trim().toLowerCase()))

            return nameMatches && majorMatches && interestMatches
        })
    }

    const filteredStudents = filterStudents()
    const numPages = Math.ceil(filteredStudents.length / studentsPerPage)

    // Step 7: reset search
    const handleReset = (event) => {
        setSearchName("")
        setSearchMajor("")
        setSearchInterest("")
        setActivePage(1)
    }

    // Step 8: basic pagination
    // code modified from week05-r2-example in-class example
    const buildPaginator = () => {
        // initialize pages array
        let pages = []
        // get number of pages needed
        // iterate through all pages
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages
    }

    // Step 9: previous and next buttons
    const handlePrevPage = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1)
        }
    }

    // Step 9: previous and next buttons
    const handleNextPage = () => {
        if (activePage < numPages) {
            setActivePage(activePage + 1);
        }
    }

    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        {/* Step 6: search functionality */}
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control
                id="searchName"
                value={searchName}
                onChange={handleNameChange} />

            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control
                id="searchMajor"
                value={searchMajor}
                onChange={handleMajorChange} />

            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control
                id="searchInterest"
                value={searchInterest}
                onChange={handleInterestChange} />

            <br />
            {/* Step 7: reset search */}
            <Button variant="neutral" onClick={handleReset}>Reset Search</Button>
        </Form>

        {/* Step 2: display number of students */}
        <p>There are {filteredStudents.length} student(s) matching your search.</p>

        <Container fluid>
            <Row>
                {/* Step 3: display student names */}
                {/* Step 4: format student data (dynamic columns) */}
                {/* Step 8: implement pagination */}
                {filteredStudents.slice(24 * (activePage - 1), 24 * activePage).map(student => (
                    <Col key={student.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Student
                            // Step 5: add other student data
                            name={student.name}
                            major={student.major}
                            numCredits={student.numCredits}
                            fromWisconsin={student.fromWisconsin}
                            id={student.id}
                            interests={student.interests}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
        <br />

        <Pagination>
            {buildPaginator()}
        </Pagination>

        <div>
            <Button variant="neutral" onClick={handlePrevPage} disabled={activePage === 1}>
                Previous
            </Button>
            <Button variant="neutral" onClick={handleNextPage} disabled={activePage === numPages}>
                Next
            </Button>
        </div>
    </div>

}
export default Classroom