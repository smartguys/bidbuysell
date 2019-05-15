import React, { Component } from 'react';

import { uploadImage } from '../app/helpers/api'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        }
    }

    inputHandler = (e) => {
        console.log('handle input')
        console.log(e)
        console.log(e.target.files)
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target.result)
                this.setState({
                    src: e.target.result
                })
                // $('#blah')
                //     .attr('src', e.target.result);
            }.bind(this);

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    submitHandler = (e) => {
        console.log('submit')
        uploadImage('filename', this.state.src, res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                <input type={'file'} onChange={this.inputHandler} />
                <img id={'blah'} src={this.state.src} alt={'alt'}/>
                <button onClick={this.submitHandler}>submit</button>
            </div>
        )
    }
}

export default Test;
