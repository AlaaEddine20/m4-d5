import React from "react"
import {
	Navbar,
	Nav,
	NavDropdown,
	Button,
	Form,
	FormControl,
	Image,
	Modal,
} from "react-bootstrap"

import Gallery from "./GalleryS"

class MyNavBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			query: "",
			show: false,
		}
	}

	handleEvent = (e) => {
		this.setState({ query: e.target.value })
	}

	handleToggle = () => {
		this.setState({ show: !this.state.show })
	}

	getData = async () => {
		const key = "&apikey=c4555b36"

		try {
			let response = await fetch(
				`http://www.omdbapi.com/?s=${this.state.query}${key}`,
				{
					method: "GET",
				}
			)

			response = await response.json()
			this.setState({ movies: response.Search })
			this.handleToggle()
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<>
				<Navbar variant="dark">
					<Navbar.Brand href="#home">
						<Image
							src="/assets/Netflix-Logo.wine.png"
							style={{ height: "50px" }}
							rounded
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
								onChange={this.handleEvent}
							/>
							<Button variant="outline-success" onClick={this.getData}>
								Search
							</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<Modal show={this.state.show} onHide={this.handleToggle}>
					<Modal.Header closeButton>
						<Modal.Title>Search reuslt for : {this.state.query}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Gallery movies={this.state.movies} />
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default MyNavBar
