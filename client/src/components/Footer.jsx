import React from 'react';
import axios from 'axios';
import { Navbar, Container, NavbarBrand, Collapse } from 'react-bootstrap';
import Auth from '../Auth';

// Import fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";



class Footer extends React.Component {
    // console.log("Loading <Footer>");
    
    state = {
        showReport: false,
        problem: '',
        description: ''
    }
    // const [showReport, setShowReport] 
    // const [problem, setProblem] = useState('');
    // const [description, setDescription] = useState('');

    // const year = new Date().getFullYear()
    

    handleChange = (event) => {
        if (event.target.name==="problem") {
            this.setState({problem:event.target.value})
        } else if (event.target.name==="description") {
            this.setState({description:event.target.value})
        }
    }
    clearForm = () => {
        this.setState({problem: '', description: ''})
    }
    saveBug = () => {
        const report = {reportedBy: Auth.getUserId, problem: this.state.problem, description: this.state.description}
        console.log('Saving the following bug report: ', report )

        axios({
            url: '/api/report-bug',
            method: 'POST',
            data: report
        })
        .then((resp) => {
            console.log("Data sent to server");
            this.clearForm();
            this.setState({showReport: false})
        })
        .catch((err) => {
            console.log("Err details: ",err.name," // ", err.response)
        })
    }

    render (){
        return(
        <div className="fixed-bottom">
            <Navbar className="footbar">
                <Container>
                        <footer>Copyright © {new Date().getFullYear()} - Mark Harley</footer>
                        <FontAwesomeIcon icon={faBug} className="bug" onClick={()=>{this.setState({showReport: !this.state.showReport})}}/>
                </Container>
                <Collapse in={this.state.showReport}>
                    <form className="bug-report" id="bug-report">
                        <input name="problem" className="bug-field" onChange={this.handleChange} placeholder="the problem is..." value={this.state.problem}/>
                        <textarea name="description" className="bug-field" onChange={this.handleChange} placeholder="give details..." value={this.state.description}/>
                        <button type="button" onClick={this.saveBug}>report</button>
                    </form>
                </Collapse>
            </Navbar>
        </div>)
    }
}

export default Footer;