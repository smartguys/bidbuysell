import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        }
    }

    handleInput = (e) => {
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

    render() {
        return (
            <div>
                <input type={'file'} onChange={this.handleInput} />
                <img id={'blah'} src={this.state.src} alt={'alt'}/>
            </div>
        )
    }
}

export default Test;
