import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../App.css';


function Bottom() {
    return (
        <Navbar fixed="bottom" className="bottom" >
            <Button variant="success" size="lg" block className="button">
                CONFIRM PICKING
        </Button>
        </Navbar>

    );
}

export default Bottom;
